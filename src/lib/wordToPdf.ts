// src/lib/wordToPdf.ts
// 100% client-side Word (DOCX) -> PDF using mammoth + jsPDF.
// Renders REAL selectable/searchable text (no rasterization).

import mammoth from "mammoth";
import jsPDF from "jspdf";

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

// Page geometry (A4 portrait, points)
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const CONTENT_H = PAGE_H - MARGIN * 2;

interface RenderState {
  pdf: jsPDF;
  y: number;
}

interface InlineRun {
  text: string;
  bold: boolean;
  italic: boolean;
}

function ensureSpace(state: RenderState, needed: number) {
  if (state.y + needed > MARGIN + CONTENT_H) {
    state.pdf.addPage();
    state.y = MARGIN;
  }
}

function setRunFont(pdf: jsPDF, bold: boolean, italic: boolean, size: number) {
  let style: "normal" | "bold" | "italic" | "bolditalic" = "normal";
  if (bold && italic) style = "bolditalic";
  else if (bold) style = "bold";
  else if (italic) style = "italic";
  pdf.setFont("helvetica", style);
  pdf.setFontSize(size);
}

function collectInlineRuns(node: Node, bold = false, italic = false): InlineRun[] {
  const runs: InlineRun[] = [];
  if (node.nodeType === Node.TEXT_NODE) {
    const txt = (node.textContent || "").replace(/\s+/g, " ");
    if (txt) runs.push({ text: txt, bold, italic });
    return runs;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return runs;

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const nb = bold || tag === "strong" || tag === "b";
  const ni = italic || tag === "em" || tag === "i";

  if (tag === "br") {
    runs.push({ text: "\n", bold: nb, italic: ni });
    return runs;
  }

  el.childNodes.forEach((c) => runs.push(...collectInlineRuns(c, nb, ni)));
  return runs;
}

/** Render a sequence of inline runs as wrapped, justified-left text with mixed styles. */
function renderRuns(
  state: RenderState,
  runs: InlineRun[],
  opts: { fontSize: number; lineHeight: number; indent?: number; spaceAfter?: number },
) {
  const { pdf } = state;
  const indent = opts.indent ?? 0;
  const x0 = MARGIN + indent;
  const maxW = CONTENT_W - indent;
  let cursorX = x0;

  ensureSpace(state, opts.lineHeight);

  // Tokenize each run into words, preserving leading/trailing spaces
  type Token = { text: string; bold: boolean; italic: boolean; w: number };
  const tokens: Token[] = [];
  for (const run of runs) {
    if (run.text === "\n") {
      tokens.push({ text: "\n", bold: run.bold, italic: run.italic, w: 0 });
      continue;
    }
    const parts = run.text.split(/(\s+)/).filter((p) => p.length > 0);
    for (const p of parts) {
      setRunFont(pdf, run.bold, run.italic, opts.fontSize);
      const w = pdf.getTextWidth(p);
      tokens.push({ text: p, bold: run.bold, italic: run.italic, w });
    }
  }

  for (const tok of tokens) {
    if (tok.text === "\n") {
      state.y += opts.lineHeight;
      ensureSpace(state, opts.lineHeight);
      cursorX = x0;
      continue;
    }
    // Wrap if it doesn't fit on this line (skip leading whitespace at line start)
    if (cursorX + tok.w > x0 + maxW) {
      state.y += opts.lineHeight;
      ensureSpace(state, opts.lineHeight);
      cursorX = x0;
      if (/^\s+$/.test(tok.text)) continue;
    }
    setRunFont(pdf, tok.bold, tok.italic, opts.fontSize);
    pdf.text(tok.text, cursorX, state.y + opts.fontSize * 0.85);
    cursorX += tok.w;
  }

  state.y += opts.lineHeight + (opts.spaceAfter ?? 0);
}

async function renderImage(state: RenderState, img: HTMLImageElement) {
  const src = img.getAttribute("src") || "";
  if (!src.startsWith("data:image/")) return;
  try {
    // Probe dimensions
    const probe = await new Promise<{ w: number; h: number }>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve({ w: i.naturalWidth, h: i.naturalHeight });
      i.onerror = reject;
      i.src = src;
    });
    const ratio = probe.h / probe.w;
    const drawW = Math.min(CONTENT_W, probe.w * 0.75);
    const drawH = drawW * ratio;

    if (drawH > CONTENT_H) {
      // Scale to fit one page
      const fitH = CONTENT_H;
      const fitW = fitH / ratio;
      ensureSpace(state, fitH + 8);
      const fmt = src.includes("image/png") ? "PNG" : "JPEG";
      state.pdf.addImage(src, fmt, MARGIN, state.y, fitW, fitH);
      state.y += fitH + 8;
    } else {
      ensureSpace(state, drawH + 8);
      const fmt = src.includes("image/png") ? "PNG" : "JPEG";
      state.pdf.addImage(src, fmt, MARGIN, state.y, drawW, drawH);
      state.y += drawH + 8;
    }
  } catch (e) {
    console.warn("Image render failed:", e);
  }
}

function renderTable(state: RenderState, table: HTMLTableElement) {
  const rows = Array.from(table.querySelectorAll("tr"));
  if (rows.length === 0) return;
  const colCount = Math.max(...rows.map((r) => r.children.length));
  if (colCount === 0) return;

  const colW = CONTENT_W / colCount;
  const cellPad = 4;
  const fontSize = 10;
  const lineH = fontSize * 1.3;

  for (const row of rows) {
    const cells = Array.from(row.children) as HTMLElement[];
    // Pre-wrap each cell to compute row height
    const wrapped: string[][] = cells.map((cell) => {
      const txt = (cell.textContent || "").replace(/\s+/g, " ").trim();
      setRunFont(state.pdf, cell.tagName.toLowerCase() === "th", false, fontSize);
      return state.pdf.splitTextToSize(txt, colW - cellPad * 2);
    });
    const rowH = Math.max(lineH, ...wrapped.map((w) => w.length * lineH)) + cellPad * 2;

    ensureSpace(state, rowH);

    // Borders + text
    state.pdf.setDrawColor(200);
    state.pdf.setLineWidth(0.5);
    for (let c = 0; c < colCount; c++) {
      const x = MARGIN + c * colW;
      state.pdf.rect(x, state.y, colW, rowH);
      const lines = wrapped[c] || [];
      const isTh = cells[c]?.tagName.toLowerCase() === "th";
      setRunFont(state.pdf, isTh, false, fontSize);
      lines.forEach((ln, i) => {
        state.pdf.text(ln, x + cellPad, state.y + cellPad + (i + 1) * lineH - lineH * 0.25);
      });
    }
    state.y += rowH;
  }
  state.y += 6;
}

async function renderBlock(state: RenderState, el: Element, listCtx?: { type: "ul" | "ol"; index: number }) {
  const tag = el.tagName.toLowerCase();

  if (tag === "h1") {
    renderRuns(state, collectInlineRuns(el, true, false), { fontSize: 22, lineHeight: 28, spaceAfter: 8 });
    return;
  }
  if (tag === "h2") {
    renderRuns(state, collectInlineRuns(el, true, false), { fontSize: 18, lineHeight: 24, spaceAfter: 6 });
    return;
  }
  if (tag === "h3") {
    renderRuns(state, collectInlineRuns(el, true, false), { fontSize: 15, lineHeight: 20, spaceAfter: 5 });
    return;
  }
  if (tag === "h4" || tag === "h5" || tag === "h6") {
    renderRuns(state, collectInlineRuns(el, true, false), { fontSize: 13, lineHeight: 18, spaceAfter: 4 });
    return;
  }
  if (tag === "p") {
    const runs = collectInlineRuns(el);
    if (runs.length === 0) {
      state.y += 8;
      return;
    }
    renderRuns(state, runs, { fontSize: 11, lineHeight: 15, spaceAfter: 6 });
    // Render any block-level children (e.g. images inside p)
    const imgs = el.querySelectorAll("img");
    for (const img of Array.from(imgs)) await renderImage(state, img as HTMLImageElement);
    return;
  }
  if (tag === "ul" || tag === "ol") {
    const items = Array.from(el.children).filter((c) => c.tagName.toLowerCase() === "li");
    let idx = 1;
    for (const li of items) {
      const prefix = tag === "ul" ? "•  " : `${idx}. `;
      const runs = collectInlineRuns(li);
      runs.unshift({ text: prefix, bold: false, italic: false });
      renderRuns(state, runs, { fontSize: 11, lineHeight: 15, indent: 16, spaceAfter: 2 });
      idx++;
    }
    state.y += 4;
    return;
  }
  if (tag === "table") {
    renderTable(state, el as HTMLTableElement);
    return;
  }
  if (tag === "img") {
    await renderImage(state, el as HTMLImageElement);
    return;
  }
  if (tag === "blockquote") {
    renderRuns(state, collectInlineRuns(el, false, true), {
      fontSize: 11,
      lineHeight: 15,
      indent: 16,
      spaceAfter: 6,
    });
    return;
  }
  // Fallback: walk children
  for (const child of Array.from(el.children)) {
    await renderBlock(state, child, listCtx);
  }
}

export async function convertWordToPdf(file: File): Promise<ConversionResult> {
  const validation = validateWordFile(file);
  if (!validation.valid) throw new Error(validation.error);

  const arrayBuffer = await file.arrayBuffer();

  const { value: html } = await mammoth.convertToHtml(
    { arrayBuffer },
    { includeDefaultStyleMap: true },
  );

  // Parse HTML into a DOM we can walk
  const doc = new DOMParser().parseFromString(
    `<!doctype html><html><body>${html || "<p><em>(empty document)</em></p>"}</body></html>`,
    "text/html",
  );
  const body = doc.body;

  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  pdf.setProperties({
    title: file.name.replace(/\.[^.]+$/, ""),
    creator: "Convertify",
  });
  const state: RenderState = { pdf, y: MARGIN };

  for (const child of Array.from(body.children)) {
    try {
      await renderBlock(state, child);
    } catch (e) {
      console.warn("Skipped block:", child.tagName, e);
    }
  }

  const blob = pdf.output("blob");
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob, filename: `${baseName}.pdf` };
}
