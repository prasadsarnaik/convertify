import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";

// ─── Helpers ────────────────────────────────────────────────

const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as ArrayBuffer);
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });

const readAsDataURL = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality = 0.92): Promise<Blob> =>
  new Promise((res, rej) => {
    canvas.toBlob(
      (blob) => (blob ? res(blob) : rej(new Error("Canvas toBlob failed"))),
      type,
      quality
    );
  });

const pdfBlob = (bytes: Uint8Array) => new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });

// ─── Image conversion via Canvas ────────────────────────────

async function convertImageFormat(
  file: File,
  outputFormat: "image/jpeg" | "image/png" | "image/webp",
  ext: string,
  quality = 0.92
): Promise<{ blob: Blob; name: string }> {
  const url = await readAsDataURL(file);
  const img = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  if (outputFormat === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  const blob = await canvasToBlob(canvas, outputFormat, quality);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob, name: `${baseName}.${ext}` };
}

async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number
): Promise<{ blob: Blob; name: string }> {
  const url = await readAsDataURL(file);
  const img = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  const ext = file.type.includes("png") ? "png" : "jpg";
  const mime = file.type.includes("png") ? "image/png" : "image/jpeg";
  const blob = await canvasToBlob(canvas, mime, 0.92);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob, name: `${baseName}-${targetWidth}x${targetHeight}.${ext}` };
}

async function compressImage(
  file: File,
  quality: number
): Promise<{ blob: Blob; name: string }> {
  const url = await readAsDataURL(file);
  const img = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const blob = await canvasToBlob(canvas, "image/jpeg", quality);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob, name: `${baseName}-compressed.jpg` };
}

// ─── HEIC conversion ────────────────────────────────────────

async function convertHeicToJpg(file: File): Promise<{ blob: Blob; name: string }> {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  const blob = Array.isArray(result) ? result[0] : result;
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob, name: `${baseName}.jpg` };
}

// ─── PDF tools ──────────────────────────────────────────────

async function mergePdf(files: File[]): Promise<{ blob: Blob; name: string }> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await readAsArrayBuffer(file);
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  const out = await merged.save();
  return { blob: pdfBlob(out), name: "merged.pdf" };
}

async function splitPdf(
  file: File,
  ranges: string
): Promise<{ blob: Blob; name: string }> {
  const bytes = await readAsArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const totalPages = src.getPageCount();
  const zip = new JSZip();

  // Parse ranges like "1-3,5,7-9"
  const pageIndices: number[] = [];
  for (const part of ranges.split(",").map((s) => s.trim())) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      for (let i = Math.max(1, a); i <= Math.min(totalPages, b); i++) {
        pageIndices.push(i - 1);
      }
    } else {
      const n = parseInt(part);
      if (n >= 1 && n <= totalPages) pageIndices.push(n - 1);
    }
  }

  if (pageIndices.length === 0) throw new Error("No valid pages in range");

  // Create individual PDFs per page
  for (const idx of pageIndices) {
    const newDoc = await PDFDocument.create();
    const [page] = await newDoc.copyPages(src, [idx]);
    newDoc.addPage(page);
    const pdfBytes = await newDoc.save();
    zip.file(`page-${idx + 1}.pdf`, pdfBytes);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return { blob: zipBlob, name: "split-pages.zip" };
}

async function compressPdf(file: File): Promise<{ blob: Blob; name: string }> {
  const bytes = await readAsArrayBuffer(file);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  // Basic compression: re-save (strips unused objects)
  const out = await doc.save();
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob: pdfBlob(out), name: `${baseName}-compressed.pdf` };
}

async function rotatePdf(
  file: File,
  angle: number
): Promise<{ blob: Blob; name: string }> {
  const bytes = await readAsArrayBuffer(file);
  const doc = await PDFDocument.load(bytes);
  doc.getPages().forEach((page) => {
    page.setRotation(degrees((page.getRotation().angle + angle) % 360));
  });
  const out = await doc.save();
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { blob: pdfBlob(out), name: `${baseName}-rotated.pdf` };
}

async function pdfToJpg(file: File): Promise<{ blob: Blob; name: string }> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const bytes = await readAsArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const zip = new JSZip();

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    zip.file(`page-${i}.jpg`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return { blob: zipBlob, name: "pdf-pages.zip" };
}

async function imageToPdf(files: File[]): Promise<{ blob: Blob; name: string }> {
  const doc = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await readAsArrayBuffer(file));
    let image;
    if (file.type === "image/png") {
      image = await doc.embedPng(bytes);
    } else {
      // Convert to jpg via canvas if needed
      if (file.type !== "image/jpeg") {
        const result = await convertImageFormat(file, "image/jpeg", "jpg");
        const jpgBytes = new Uint8Array(await result.blob.arrayBuffer());
        image = await doc.embedJpg(jpgBytes);
      } else {
        image = await doc.embedJpg(bytes);
      }
    }

    const page = doc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  const out = await doc.save();
  return { blob: new Blob([out], { type: "application/pdf" }), name: "images.pdf" };
}

// ─── Tool config & dispatcher ───────────────────────────────

export interface ToolConfig {
  accept?: string;
  multiple?: boolean;
  options?: ToolOption[];
}

export interface ToolOption {
  key: string;
  label: string;
  type: "select" | "number" | "text";
  defaultValue: string | number;
  choices?: { label: string; value: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export function getToolConfig(slug: string): ToolConfig {
  switch (slug) {
    case "merge-pdf":
      return { accept: ".pdf", multiple: true };
    case "split-pdf":
      return {
        accept: ".pdf",
        multiple: false,
        options: [
          { key: "pages", label: "Page range", type: "text", defaultValue: "1-3", placeholder: "e.g. 1-3,5,7" },
        ],
      };
    case "compress-pdf":
      return { accept: ".pdf", multiple: false };
    case "rotate-pdf":
      return {
        accept: ".pdf",
        multiple: false,
        options: [
          {
            key: "angle",
            label: "Rotation",
            type: "select",
            defaultValue: "90",
            choices: [
              { label: "90° clockwise", value: "90" },
              { label: "180°", value: "180" },
              { label: "90° counter-clockwise", value: "270" },
            ],
          },
        ],
      };
    case "pdf-to-jpg":
      return { accept: ".pdf", multiple: false };
    case "jpg-to-pdf":
    case "image-to-pdf":
      return { accept: "image/*", multiple: true };
    case "edit-pdf":
      return { accept: ".pdf", multiple: false };
    case "jpg-to-png":
      return { accept: ".jpg,.jpeg", multiple: true };
    case "png-to-jpg":
      return { accept: ".png", multiple: true };
    case "webp-to-jpg":
      return { accept: ".webp", multiple: true };
    case "avif-to-jpg":
      return { accept: ".avif", multiple: true };
    case "heic-to-jpg":
      return { accept: ".heic,.heif", multiple: true };
    case "resize-image":
      return {
        accept: "image/*",
        multiple: true,
        options: [
          { key: "width", label: "Width (px)", type: "number", defaultValue: 800, min: 1, max: 10000 },
          { key: "height", label: "Height (px)", type: "number", defaultValue: 600, min: 1, max: 10000 },
        ],
      };
    case "compress-image":
      return {
        accept: "image/*",
        multiple: true,
        options: [
          {
            key: "quality",
            label: "Quality",
            type: "select",
            defaultValue: "0.6",
            choices: [
              { label: "High (80%)", value: "0.8" },
              { label: "Medium (60%)", value: "0.6" },
              { label: "Low (40%)", value: "0.4" },
            ],
          },
        ],
      };
    default:
      return {};
  }
}

export interface ConvertResult {
  blob: Blob;
  name: string;
}

export async function runConversion(
  slug: string,
  files: File[],
  options: Record<string, string | number>
): Promise<ConvertResult[]> {
  switch (slug) {
    case "merge-pdf":
      return [await mergePdf(files)];

    case "split-pdf":
      return [await splitPdf(files[0], String(options.pages || "1"))];

    case "compress-pdf":
      return [await compressPdf(files[0])];

    case "rotate-pdf":
      return [await rotatePdf(files[0], Number(options.angle || 90))];

    case "pdf-to-jpg":
      return [await pdfToJpg(files[0])];

    case "jpg-to-pdf":
    case "image-to-pdf":
      return [await imageToPdf(files)];

    case "edit-pdf":
      // Basic pass-through — real editing is out of scope
      return [await compressPdf(files[0])];

    case "jpg-to-png": {
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await convertImageFormat(f, "image/png", "png"));
      return results;
    }
    case "png-to-jpg": {
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await convertImageFormat(f, "image/jpeg", "jpg"));
      return results;
    }
    case "webp-to-jpg": {
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await convertImageFormat(f, "image/jpeg", "jpg"));
      return results;
    }
    case "avif-to-jpg": {
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await convertImageFormat(f, "image/jpeg", "jpg"));
      return results;
    }
    case "heic-to-jpg": {
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await convertHeicToJpg(f));
      return results;
    }
    case "resize-image": {
      const w = Number(options.width || 800);
      const h = Number(options.height || 600);
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await resizeImage(f, w, h));
      return results;
    }
    case "compress-image": {
      const q = Number(options.quality || 0.6);
      const results: ConvertResult[] = [];
      for (const f of files) results.push(await compressImage(f, q));
      return results;
    }
    default:
      throw new Error(`Unknown tool: ${slug}`);
  }
}
