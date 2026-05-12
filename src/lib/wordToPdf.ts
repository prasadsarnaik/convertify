// src/lib/wordToPdf.ts
// 100% client-side Word (DOCX) -> PDF using mammoth + html2canvas + jsPDF.

import mammoth from "mammoth";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface ConversionResult {
  blob: Blob;
  filename: string;
}

export function validateWordFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 25 * 1024 * 1024;
  const lower = file.name.toLowerCase();
  if (!lower.endsWith(".doc") && !lower.endsWith(".docx")) {
    return { valid: false, error: "Only .doc and .docx files are supported" };
  }
  if (lower.endsWith(".doc")) {
    return {
      valid: false,
      error: "Legacy .doc files are not supported in-browser. Please save as .docx and try again.",
    };
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

const PAGE_WIDTH_PT = 595.28; // A4 portrait
const PAGE_HEIGHT_PT = 841.89;
const MARGIN_PT = 40;

export async function convertWordToPdf(file: File): Promise<ConversionResult> {
  const validation = validateWordFile(file);
  if (!validation.valid) throw new Error(validation.error);

  const arrayBuffer = await file.arrayBuffer();

  // 1) DOCX -> HTML (text, headings, lists, tables, images preserved)
  const { value: html } = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      includeDefaultStyleMap: true,
    },
  );

  // 2) Render the HTML in an offscreen container we can rasterize.
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "794px"; // ~A4 width @ 96dpi
  container.style.padding = "48px";
  container.style.background = "#ffffff";
  container.style.color = "#000000";
  container.style.fontFamily =
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  container.style.fontSize = "14px";
  container.style.lineHeight = "1.55";
  container.style.boxSizing = "border-box";
  container.innerHTML = `
    <style>
      h1{font-size:26px;margin:18px 0 10px;font-weight:700}
      h2{font-size:22px;margin:16px 0 8px;font-weight:700}
      h3{font-size:18px;margin:14px 0 6px;font-weight:600}
      p{margin:0 0 10px}
      ul,ol{margin:0 0 10px 24px}
      table{border-collapse:collapse;width:100%;margin:10px 0}
      td,th{border:1px solid #ddd;padding:6px 8px;vertical-align:top}
      img{max-width:100%;height:auto}
      a{color:#0a66c2;text-decoration:underline}
    </style>
    ${html || "<p><em>(empty document)</em></p>"}
  `;
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    const usableWidth = PAGE_WIDTH_PT - MARGIN_PT * 2;
    const usableHeight = PAGE_HEIGHT_PT - MARGIN_PT * 2;
    const pxPerPt = canvas.width / usableWidth;
    const pageHeightPx = Math.floor(usableHeight * pxPerPt);

    let renderedPx = 0;
    let pageIndex = 0;

    while (renderedPx < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedPx);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeight;
      const ctx = sliceCanvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        renderedPx,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight,
      );

      const imgData = sliceCanvas.toDataURL("image/jpeg", 0.92);
      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        MARGIN_PT,
        MARGIN_PT,
        usableWidth,
        sliceHeight / pxPerPt,
      );

      renderedPx += sliceHeight;
      pageIndex += 1;
    }

    const blob = pdf.output("blob");
    const baseName = file.name.replace(/\.[^.]+$/, "");
    return { blob, filename: `${baseName}.pdf` };
  } finally {
    document.body.removeChild(container);
  }
}
