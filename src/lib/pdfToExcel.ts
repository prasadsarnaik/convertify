// 100% client-side PDF -> Excel (XLSX) using pdfjs-dist + SheetJS.
// Extracts text per page, groups items into rows by y position, and splits
// rows into columns using x-gap clustering. Each PDF page becomes one sheet.

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
import * as XLSX from "xlsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface ConversionResult {
  blob: Blob;
  filename: string;
}

const MAX_SIZE = 25 * 1024 * 1024;

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return { valid: false, error: "Only PDF files are supported" };
  }
  if (file.size > MAX_SIZE) {
    return { valid: false, error: "File size exceeds 25MB limit" };
  }
  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface TextItemPos {
  text: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const Y_TOLERANCE = 3; // px — items within this y-distance share a row
const COL_GAP_RATIO = 0.6; // a gap > avgCharWidth * ratio splits columns

function coerceCell(value: string): string | number {
  const t = value.trim();
  if (!t) return "";
  // pure number (int/float, optional sign, commas as thousands)
  const numLike = t.replace(/,/g, "");
  if (/^-?\d+(\.\d+)?$/.test(numLike)) {
    const n = Number(numLike);
    if (Number.isFinite(n)) return n;
  }
  return t;
}

function groupRows(items: TextItemPos[]): TextItemPos[][] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const rows: TextItemPos[][] = [];
  for (const it of sorted) {
    const row = rows[rows.length - 1];
    if (row && Math.abs(row[0].y - it.y) <= Y_TOLERANCE) {
      row.push(it);
    } else {
      rows.push([it]);
    }
  }
  // sort each row left->right
  return rows.map((r) => r.sort((a, b) => a.x - b.x));
}

function splitRowIntoColumns(row: TextItemPos[]): string[] {
  if (row.length === 0) return [];
  const avgChar =
    row.reduce((acc, it) => acc + (it.text.length > 0 ? it.w / it.text.length : 0), 0) /
      row.length || 4;
  const threshold = avgChar * COL_GAP_RATIO * 2; // a meaningful gap
  const cells: string[] = [];
  let current = row[0].text;
  let prevEnd = row[0].x + row[0].w;
  for (let i = 1; i < row.length; i++) {
    const it = row[i];
    const gap = it.x - prevEnd;
    if (gap > threshold) {
      cells.push(current.trim());
      current = it.text;
    } else {
      // same cell — preserve a space if there isn't one
      current += current.endsWith(" ") || it.text.startsWith(" ") ? it.text : ` ${it.text}`;
    }
    prevEnd = it.x + it.w;
  }
  cells.push(current.trim());
  return cells;
}

export async function convertPdfToExcel(file: File): Promise<ConversionResult> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

  const workbook = XLSX.utils.book_new();
  let hadContent = false;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const items: TextItemPos[] = [];
    for (const item of content.items as Array<{
      str: string;
      transform: number[];
      width: number;
      height: number;
    }>) {
      const str = item.str;
      if (!str) continue;
      const x = item.transform[4];
      const y = item.transform[5];
      items.push({
        text: str,
        x,
        y,
        w: item.width || str.length * 4,
        h: item.height || 10,
      });
    }

    const rows = groupRows(items);
    const aoa: (string | number)[][] = rows
      .map((r) => splitRowIntoColumns(r).map(coerceCell))
      .filter((r) => r.some((c) => c !== "" && c !== undefined));

    const sheet = XLSX.utils.aoa_to_sheet(
      aoa.length > 0 ? aoa : [["(No extractable text on this page)"]],
    );

    // Auto-size columns based on max content length in each column.
    const colCount = aoa.reduce((m, r) => Math.max(m, r.length), 1);
    sheet["!cols"] = Array.from({ length: colCount }, (_, c) => {
      const maxLen = aoa.reduce((m, r) => {
        const cell = r[c];
        const s = cell === undefined || cell === null ? "" : String(cell);
        return Math.max(m, s.length);
      }, 8);
      return { wch: Math.min(Math.max(maxLen + 2, 10), 60) };
    });

    XLSX.utils.book_append_sheet(workbook, sheet, `Page ${pageNum}`);
    if (aoa.length > 0) hadContent = true;
  }

  if (!hadContent && pdf.numPages === 0) {
    throw new Error("This PDF has no pages.");
  }

  const arrayBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const filename = file.name.replace(/\.pdf$/i, "") + ".xlsx";

  return { blob, filename };
}
