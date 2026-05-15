// 100% client-side Excel (XLSX/XLS/CSV) -> PDF using SheetJS + jsPDF + autoTable.
// Renders REAL selectable/searchable tables (no rasterization).

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ConversionResult {
  blob: Blob;
  filename: string;
}

const MAX_SIZE = 25 * 1024 * 1024;
const ACCEPTED_EXT = [".xlsx", ".xls", ".csv", ".ods"];

export function validateExcelFile(file: File): { valid: boolean; error?: string } {
  const lower = file.name.toLowerCase();
  if (!ACCEPTED_EXT.some((ext) => lower.endsWith(ext))) {
    return { valid: false, error: "Only .xlsx, .xls, .csv and .ods files are supported" };
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

const stringifyCell = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v.toLocaleDateString();
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "";
  return String(v);
};

export async function convertExcelToPdf(file: File): Promise<ConversionResult> {
  const validation = validateExcelFile(file);
  if (!validation.valid) throw new Error(validation.error);

  let workbook: XLSX.WorkBook;
  try {
    const buffer = await file.arrayBuffer();
    workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  } catch {
    throw new Error("Could not read this spreadsheet. It may be corrupt or password-protected.");
  }

  if (!workbook.SheetNames.length) {
    throw new Error("This file does not contain any sheets.");
  }

  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  let firstSheet = true;

  for (const sheetName of workbook.SheetNames) {
    const ws = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(ws, {
      header: 1,
      defval: "",
      blankrows: false,
    }) as unknown[][];

    if (!firstSheet) pdf.addPage();
    firstSheet = false;

    // Sheet name heading
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(30, 30, 30);
    pdf.text(sheetName, 40, 40);

    if (rows.length === 0) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(120, 120, 120);
      pdf.text("(empty sheet)", 40, 70);
      continue;
    }

    const head = [rows[0].map(stringifyCell)];
    const body = rows.slice(1).map((r) => r.map(stringifyCell));

    autoTable(pdf, {
      head,
      body,
      startY: 60,
      margin: { left: 30, right: 30, bottom: 30 },
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 4,
        overflow: "linebreak",
        valign: "middle",
        textColor: [40, 40, 40],
        lineColor: [220, 220, 220],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      didDrawPage: () => {
        const pageSize = pdf.internal.pageSize;
        const pageNumber = pdf.getNumberOfPages();
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `${sheetName} — Page ${pageNumber}`,
          pageSize.getWidth() - 30,
          pageSize.getHeight() - 12,
          { align: "right" },
        );
      },
    });
  }

  const blob = pdf.output("blob");
  const baseName = file.name.replace(/\.(xlsx|xls|csv|ods)$/i, "");
  return { blob, filename: `${baseName}.pdf` };
}
