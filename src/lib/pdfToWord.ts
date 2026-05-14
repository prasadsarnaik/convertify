// src/lib/pdfToWord.ts
// 100% client-side PDF -> Word (DOCX) using pdfjs-dist + docx.
// Preserves bold, italic, font sizes, headings, and paragraph grouping.

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  PageBreak,
  HeadingLevel,
  AlignmentType,
} from "docx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface ConversionResult {
  blob: Blob;
  filename: string;
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 25 * 1024 * 1024;
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return { valid: false, error: "Only PDF files are supported" };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File size exceeds 25MB limit" };
  }
  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Run {
  text: string;
  bold: boolean;
  italic: boolean;
  size: number; // points
}

interface Line {
  y: number;
  height: number;
  runs: Run[];
}

function detectStyle(fontName: string | undefined): { bold: boolean; italic: boolean } {
  const f = (fontName || "").toLowerCase();
  return {
    bold: /bold|black|heavy|semibold|demibold/.test(f),
    italic: /italic|oblique/.test(f),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildLines(items: any[], styles: Record<string, { fontFamily?: string }>): Line[] {
  const tolerance = 2;
  const lines: Line[] = [];

  for (const item of items) {
    if (!item.str) continue;
    const transform = item.transform as number[];
    const y = transform[5];
    const size = Math.abs(transform[0]) || item.height || 12;
    const fontName = (styles[item.fontName]?.fontFamily as string) || item.fontName;
    const { bold, italic } = detectStyle(fontName);

    let line = lines.find((l) => Math.abs(l.y - y) <= tolerance);
    if (!line) {
      line = { y, height: size, runs: [] };
      lines.push(line);
    }
    line.height = Math.max(line.height, size);

    // Merge into previous run if styles match
    const last = line.runs[line.runs.length - 1];
    if (last && last.bold === bold && last.italic === italic && Math.abs(last.size - size) < 0.5) {
      const sep = last.text.endsWith(" ") || item.str.startsWith(" ") ? "" : " ";
      last.text += sep + item.str;
    } else {
      line.runs.push({ text: item.str, bold, italic, size });
    }
  }

  // PDF Y origin is bottom-left
  lines.sort((a, b) => b.y - a.y);
  return lines;
}

function ptToHalfPt(pt: number): number {
  // docx size is in half-points; clamp to a sensible range
  return Math.max(8, Math.min(96, Math.round(pt * 2)));
}

export async function convertPdfToWord(file: File): Promise<ConversionResult> {
  const validation = validatePdfFile(file);
  if (!validation.valid) throw new Error(validation.error);

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const children: Paragraph[] = [];
  let totalTextChars = 0;

  // First pass: collect every line + size to compute median
  const allSizes: number[] = [];
  const pageLines: Line[][] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styles = (textContent as any).styles || {};
    const lines = buildLines(textContent.items, styles);
    pageLines.push(lines);
    for (const ln of lines) {
      allSizes.push(ln.height);
      for (const r of ln.runs) totalTextChars += r.text.length;
    }
  }

  if (totalTextChars === 0) {
    throw new Error(
      "This PDF appears to be scanned or image-based. Text extraction requires OCR (not yet supported).",
    );
  }

  allSizes.sort((a, b) => a - b);
  const medianSize = allSizes[Math.floor(allSizes.length / 2)] || 12;
  const h1Threshold = medianSize * 1.6;
  const h2Threshold = medianSize * 1.3;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const lines = pageLines[pageNum - 1];

    if (lines.length === 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[Page ${pageNum} contains no extractable text]`,
              italics: true,
              color: "888888",
            }),
          ],
        }),
      );
    } else {
      let prevY: number | null = null;
      let prevHeight = medianSize;

      lines.forEach((line) => {
        const text = line.runs.map((r) => r.text).join("").trim();
        if (!text) return;

        // Detect paragraph break: large gap above this line
        const gap = prevY === null ? 0 : prevY - line.y - prevHeight;
        const isNewParagraph = prevY === null || gap > prevHeight * 0.6;

        // Detect heading by font size relative to median
        let heading: typeof HeadingLevel.HEADING_1 | typeof HeadingLevel.HEADING_2 | undefined;
        if (line.height >= h1Threshold) heading = HeadingLevel.HEADING_1;
        else if (line.height >= h2Threshold) heading = HeadingLevel.HEADING_2;

        if (isNewParagraph) {
          children.push(
            new Paragraph({
              heading,
              alignment: AlignmentType.LEFT,
              spacing: { after: 120 },
              children: line.runs
                .filter((r) => r.text.trim().length > 0 || r.text === " ")
                .map(
                  (r) =>
                    new TextRun({
                      text: r.text,
                      bold: r.bold || !!heading,
                      italics: r.italic,
                      size: ptToHalfPt(r.size),
                    }),
                ),
            }),
          );
        } else {
          // Append to previous paragraph as a soft line break
          const last = children[children.length - 1];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lastChildren = (last as any).options?.children as TextRun[] | undefined;
          if (lastChildren) {
            lastChildren.push(new TextRun({ text: " ", break: 0 }));
            for (const r of line.runs) {
              lastChildren.push(
                new TextRun({
                  text: r.text,
                  bold: r.bold,
                  italics: r.italic,
                  size: ptToHalfPt(r.size),
                }),
              );
            }
          }
        }

        prevY = line.y;
        prevHeight = line.height;
      });
    }

    if (pageNum < pdf.numPages) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
  }

  const doc = new Document({
    creator: "Convertify",
    title: file.name.replace(/\.pdf$/i, ""),
    styles: {
      default: {
        document: { run: { font: "Calibri", size: 22 } },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const baseName = file.name.replace(/\.pdf$/i, "");
  return { blob, filename: `${baseName}.docx` };
}
