import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  ImageIcon,
  Trash2,
  Archive,
} from "lucide-react";
import JSZip from "jszip";

// ─── Types ───────────────────────────────────────────────────────────────────

type OutputFormat = "auto" | "jpeg" | "png" | "webp" | "avif";

interface SourceItem {
  id: string;
  file: File;
  previewUrl: string;
  width?: number;
  height?: number;
  isSvg: boolean;
}

interface ResultItem {
  id: string;
  name: string;
  blob: Blob;
  originalSize: number;
  previewUrl: string;
  error?: string;
}

const ACCEPTED: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/svg+xml": [".svg"],
  "image/gif": [".gif"],
  "image/bmp": [".bmp"],
  "image/avif": [".avif"],
  "image/tiff": [".tif", ".tiff"],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatBytes = (b: number) =>
  b < 1024
    ? `${b} B`
    : b < 1024 * 1024
    ? `${(b / 1024).toFixed(1)} KB`
    : `${(b / (1024 * 1024)).toFixed(2)} MB`;

const extFromMime = (mime: string) =>
  mime === "image/jpeg" ? "jpg" : mime.split("/")[1] || "img";

const replaceExt = (name: string, ext: string) =>
  name.replace(/\.[^./\\]+$/, "") + "." + ext;

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1000);
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error(`Encoder failed for ${type}`)),
      type,
      quality,
    );
  });

// Lightweight, safe SVG minifier — no external deps
const minifySvg = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*([=:;,{}])\s*/g, "$1")
    .trim();

const supportsEncode = async (mime: string) => {
  try {
    const c = document.createElement("canvas");
    c.width = 2;
    c.height = 2;
    const b = await new Promise<Blob | null>((r) => c.toBlob(r, mime, 0.8));
    return !!b && b.type === mime;
  } catch {
    return false;
  }
};

// Compress to roughly meet a target bytes by binary-searching quality
async function compressToTarget(
  source: CanvasImageSource,
  width: number,
  height: number,
  mime: "image/jpeg" | "image/webp" | "image/avif",
  targetBytes: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d")!;
  if (mime === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  let lo = 0.2;
  let hi = 0.95;
  let best = await canvasToBlob(canvas, mime, hi);
  if (best.size <= targetBytes) return best;
  for (let i = 0; i < 7; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    if (blob.size > targetBytes) {
      hi = mid;
    } else {
      best = blob;
      lo = mid;
    }
  }
  return best;
}

// ─── Component ───────────────────────────────────────────────────────────────

type Stage = "upload" | "processing" | "done" | "error";

const CompressImageWorkspace = () => {
  const [items, setItems] = useState<SourceItem[]>([]);
  const [stage, setStage] = useState<Stage>("upload");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const [quality, setQuality] = useState(70);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("auto");
  const [resizeMode, setResizeMode] = useState<"none" | "percent" | "pixels">(
    "none",
  );
  const [resizePercent, setResizePercent] = useState(100);
  const [resizeWidth, setResizeWidth] = useState<number | "">("");
  const [resizeHeight, setResizeHeight] = useState<number | "">("");
  const [targetKB, setTargetKB] = useState<number | "">("");
  const [avifSupported, setAvifSupported] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    supportsEncode("image/avif").then(setAvifSupported);
  }, []);

  useEffect(() => {
    return () => {
      items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      results.forEach((r) => URL.revokeObjectURL(r.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback(async (accepted: File[]) => {
    const newItems: SourceItem[] = await Promise.all(
      accepted.map(async (file) => {
        const isSvg =
          file.type === "image/svg+xml" || /\.svg$/i.test(file.name);
        const previewUrl = URL.createObjectURL(file);
        let width: number | undefined;
        let height: number | undefined;
        try {
          const img = await loadImage(previewUrl);
          width = img.naturalWidth;
          height = img.naturalHeight;
        } catch {
          /* TIFF/AVIF may not decode in some browsers */
        }
        return {
          id: crypto.randomUUID(),
          file,
          previewUrl,
          width,
          height,
          isSvg,
        };
      }),
    );
    setItems((prev) => [...prev, ...newItems]);
    setStage("upload");
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    multiple: true,
  });

  const removeItem = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      const gone = prev.find((i) => i.id === id);
      if (gone) URL.revokeObjectURL(gone.previewUrl);
      return next;
    });
  };

  const clearAll = () => {
    items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    results.forEach((r) => URL.revokeObjectURL(r.previewUrl));
    setItems([]);
    setResults([]);
    setStage("upload");
    setError("");
    setProgress(0);
  };

  const totals = useMemo(() => {
    const original = results.reduce((a, r) => a + r.originalSize, 0);
    const compressed = results.reduce((a, r) => a + r.blob.size, 0);
    const saved = original > 0 ? Math.max(0, 1 - compressed / original) : 0;
    return { original, compressed, saved };
  }, [results]);

  const compressOne = async (item: SourceItem): Promise<ResultItem> => {
    const { file, isSvg } = item;

    // SVG: minify text, don't rasterize unless explicit raster output requested
    if (isSvg && (outputFormat === "auto" || outputFormat === "png")) {
      const text = await file.text();
      const minified = minifySvg(text);
      const blob = new Blob([minified], { type: "image/svg+xml" });
      const name = replaceExt(file.name, "svg");
      return {
        id: item.id,
        name,
        blob,
        originalSize: file.size,
        previewUrl: URL.createObjectURL(blob),
      };
    }

    // Determine output mime
    let outMime: "image/jpeg" | "image/png" | "image/webp" | "image/avif";
    if (outputFormat === "auto") {
      // Keep transparency for PNG/WebP/GIF/SVG → webp; else jpeg
      const transparent = /png|webp|gif|svg/.test(file.type);
      outMime = transparent ? "image/webp" : "image/jpeg";
    } else {
      outMime = `image/${outputFormat}` as typeof outMime;
    }
    if (outMime === "image/avif" && !avifSupported) outMime = "image/webp";

    // Load source
    const img = await loadImage(item.previewUrl);
    let w = img.naturalWidth;
    let h = img.naturalHeight;

    if (resizeMode === "percent") {
      const p = Math.max(1, Math.min(100, resizePercent)) / 100;
      w = Math.max(1, Math.round(w * p));
      h = Math.max(1, Math.round(h * p));
    } else if (resizeMode === "pixels") {
      const targetW = typeof resizeWidth === "number" ? resizeWidth : 0;
      const targetH = typeof resizeHeight === "number" ? resizeHeight : 0;
      if (targetW && targetH) {
        w = targetW;
        h = targetH;
      } else if (targetW) {
        const r = targetW / img.naturalWidth;
        w = targetW;
        h = Math.round(img.naturalHeight * r);
      } else if (targetH) {
        const r = targetH / img.naturalHeight;
        h = targetH;
        w = Math.round(img.naturalWidth * r);
      }
    }

    // Target file size path
    const targetBytes =
      typeof targetKB === "number" && targetKB > 0 ? targetKB * 1024 : 0;
    if (targetBytes && outMime !== "image/png") {
      const blob = await compressToTarget(img, w, h, outMime, targetBytes);
      const name = replaceExt(file.name, extFromMime(outMime));
      return {
        id: item.id,
        name,
        blob,
        originalSize: file.size,
        previewUrl: URL.createObjectURL(blob),
      };
    }

    // Standard quality path
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, w);
    canvas.height = Math.max(1, h);
    const ctx = canvas.getContext("2d")!;
    if (outMime === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const q = Math.max(0.05, Math.min(1, quality / 100));
    const blob = await canvasToBlob(canvas, outMime, q);
    const name = replaceExt(file.name, extFromMime(outMime));
    return {
      id: item.id,
      name,
      blob,
      originalSize: file.size,
      previewUrl: URL.createObjectURL(blob),
    };
  };

  const handleCompress = async () => {
    if (!items.length) return;
    cancelRef.current = false;
    setStage("processing");
    setError("");
    setProgress(0);
    const out: ResultItem[] = [];
    try {
      for (let i = 0; i < items.length; i++) {
        if (cancelRef.current) break;
        try {
          out.push(await compressOne(items[i]));
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Compression failed";
          out.push({
            id: items[i].id,
            name: items[i].file.name,
            blob: items[i].file,
            originalSize: items[i].file.size,
            previewUrl: URL.createObjectURL(items[i].file),
            error: msg,
          });
        }
        setProgress(Math.round(((i + 1) / items.length) * 100));
      }
      setResults(out);
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compression failed");
      setStage("error");
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    results
      .filter((r) => !r.error)
      .forEach((r) => zip.file(r.name, r.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "convertify-compressed-images.zip");
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
            Compress Image
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            Reduce JPG, PNG, WebP, AVIF, GIF, BMP, TIFF and SVG file sizes in
            your browser. Bulk upload, preview, resize, choose output format,
            or set a target file size — 100% private, no uploads to a server.
          </p>

          <div className="rounded-2xl border border-border bg-background shadow-stage p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {(stage === "upload" || stage === "error") && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">
                      Drop images here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG · PNG · WebP · AVIF · GIF · BMP · TIFF · SVG
                    </p>
                  </div>

                  {items.length > 0 && (
                    <>
                      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">
                            {items.length}{" "}
                            {items.length === 1 ? "image" : "images"} ready
                          </p>
                          <button
                            onClick={clearAll}
                            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Clear all
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {items.map((it) => (
                            <div
                              key={it.id}
                              className="relative rounded-lg border border-border bg-background overflow-hidden group"
                            >
                              <div className="aspect-square bg-card flex items-center justify-center">
                                {it.width ? (
                                  <img
                                    src={it.previewUrl}
                                    alt={it.file.name}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                  />
                                ) : (
                                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                )}
                              </div>
                              <div className="p-2 text-[11px] leading-tight">
                                <p className="truncate text-foreground font-medium">
                                  {it.file.name}
                                </p>
                                <p className="text-muted-foreground">
                                  {formatBytes(it.file.size)}
                                  {it.width
                                    ? ` · ${it.width}×${it.height}`
                                    : ""}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(it.id)}
                                aria-label="Remove"
                                className="absolute top-1.5 right-1.5 rounded-full bg-background/90 border border-border p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Compression options
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">
                              Quality
                            </label>
                            <span className="text-sm tabular-nums text-muted-foreground">
                              {quality}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full accent-foreground"
                          />
                          <p className="text-xs text-muted-foreground">
                            Higher quality = larger file. Ignored when a target
                            size is set.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-1.5">
                              Output format
                            </label>
                            <select
                              value={outputFormat}
                              onChange={(e) =>
                                setOutputFormat(e.target.value as OutputFormat)
                              }
                              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
                            >
                              <option value="auto">Auto (recommended)</option>
                              <option value="jpeg">JPG</option>
                              <option value="png">PNG</option>
                              <option value="webp">WebP</option>
                              <option value="avif" disabled={!avifSupported}>
                                AVIF{avifSupported ? "" : " (unsupported)"}
                              </option>
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-foreground block mb-1.5">
                              Target file size (KB, optional)
                            </label>
                            <input
                              type="number"
                              min={1}
                              placeholder="e.g. 200"
                              value={targetKB}
                              onChange={(e) =>
                                setTargetKB(
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value),
                                )
                              }
                              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {(["none", "percent", "pixels"] as const).map(
                              (m) => (
                                <button
                                  key={m}
                                  onClick={() => setResizeMode(m)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                    resizeMode === m
                                      ? "bg-foreground text-background border-foreground"
                                      : "bg-background text-foreground border-border hover:bg-card"
                                  }`}
                                >
                                  {m === "none"
                                    ? "Keep size"
                                    : m === "percent"
                                    ? "Resize %"
                                    : "Resize px"}
                                </button>
                              ),
                            )}
                          </div>
                          {resizeMode === "percent" && (
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={10}
                                max={100}
                                value={resizePercent}
                                onChange={(e) =>
                                  setResizePercent(Number(e.target.value))
                                }
                                className="flex-1 accent-foreground"
                              />
                              <span className="text-sm tabular-nums text-muted-foreground w-12 text-right">
                                {resizePercent}%
                              </span>
                            </div>
                          )}
                          {resizeMode === "pixels" && (
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="number"
                                placeholder="Width"
                                min={1}
                                value={resizeWidth}
                                onChange={(e) =>
                                  setResizeWidth(
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                  )
                                }
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
                              />
                              <input
                                type="number"
                                placeholder="Height"
                                min={1}
                                value={resizeHeight}
                                onChange={(e) =>
                                  setResizeHeight(
                                    e.target.value === ""
                                      ? ""
                                      : Number(e.target.value),
                                  )
                                }
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleCompress}
                        className="w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Compress {items.length}{" "}
                        {items.length === 1 ? "image" : "images"}
                      </button>
                    </>
                  )}

                  {stage === "error" && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          Compression failed
                        </p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <Loader2 className="w-10 h-10 text-accent-blue mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">
                    Compressing your images…
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {progress}% complete · processed fully in your browser
                  </p>
                  <div className="mx-auto mt-6 h-1.5 max-w-sm overflow-hidden rounded-full bg-card">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-3" />
                    <p className="font-bold text-lg text-foreground">
                      Compression complete
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Original {formatBytes(totals.original)} → Compressed{" "}
                      {formatBytes(totals.compressed)} ·{" "}
                      <span className="text-accent-green font-semibold">
                        {(totals.saved * 100).toFixed(1)}% smaller
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {results.map((r) => {
                      const saved =
                        r.originalSize > 0
                          ? 1 - r.blob.size / r.originalSize
                          : 0;
                      return (
                        <div
                          key={r.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
                        >
                          <div className="w-12 h-12 rounded-lg bg-background border border-border overflow-hidden shrink-0 flex items-center justify-center">
                            {r.previewUrl ? (
                              <img
                                src={r.previewUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {r.name}
                            </p>
                            {r.error ? (
                              <p className="text-xs text-destructive">
                                {r.error}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {formatBytes(r.originalSize)} →{" "}
                                {formatBytes(r.blob.size)}{" "}
                                <span
                                  className={
                                    saved > 0
                                      ? "text-accent-green"
                                      : "text-muted-foreground"
                                  }
                                >
                                  ({saved > 0 ? "-" : "+"}
                                  {Math.abs(saved * 100).toFixed(1)}%)
                                </span>
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => downloadBlob(r.blob, r.name)}
                            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-background/70 inline-flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {results.length > 1 && (
                      <button
                        onClick={downloadZip}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90"
                      >
                        <Archive className="w-4 h-4" /> Download all as ZIP
                      </button>
                    )}
                    <button
                      onClick={clearAll}
                      className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card"
                    >
                      Compress more
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompressImageWorkspace;
