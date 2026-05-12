// src/lib/pdfToWord.ts
// 100% client-side PDF -> Word (DOCX) using pdfjs-dist + docx.

import * as pdfjsLib from "pdfjs-dist";
// @ts-expect-error - vite ?url import for pdfjs worker
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

interface LineItem {
  text: string;
  y: number;
  height: number;
}

/**
 * Group PDF text items into lines using their Y position, then sort
 * top-to-bottom and join into paragraphs.
 */
function buildLinesFromTextContent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[],
): LineItem[] {
  const lines: LineItem[] = [];
  const tolerance = 2;

  for (const item of items) {
    if (!item.str) continue;
    const transform = item.transform as number[];
    const y = transform[5];
    const height = item.height || 12;

    const existing = lines.find((l) => Math.abs(l.y - y) <= tolerance);
    if (existing) {
      existing.text += (existing.text.endsWith(" ") ? "" : " ") + item.str;
    } else {
      lines.push({ text: item.str, y, height });
    }
  }

  // PDF Y origin is bottom-left, so descending Y = top to bottom.
  lines.sort((a, b) => b.y - a.y);
  return lines.map((l) => ({ ...l, text: l.text.trim() }));
}

export async function convertPdfToWord(file: File): Promise<ConversionResult> {
  const validation = validatePdfFile(file);
  if (!validation.valid) throw new Error(validation.error);

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const children: Paragraph[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const lines = buildLinesFromTextContent(textContent.items);

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
      // Detect a likely title on the first page (first non-empty line, larger font).
      const avgHeight =
        lines.reduce((s, l) => s + l.height, 0) / Math.max(lines.length, 1);

      lines.forEach((line, idx) => {
        if (!line.text) return;
        const isHeading =
          pageNum === 1 && idx === 0 && line.height > avgHeight * 1.25;

        children.push(
          new Paragraph({
            heading: isHeading ? HeadingLevel.HEADING_1 : undefined,
            alignment: AlignmentType.LEFT,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: line.text,
                bold: isHeading,
                size: isHeading ? 32 : 22,
              }),
            ],
          }),
        );
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
