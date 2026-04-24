import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  RotateCcw,
  RotateCw,
  Download,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

interface PageThumb {
  index: number;
  dataUrl: string;
  rotation: number;
}

const RotatePdfWorkspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [stage, setStage] = useState<"upload" | "editing" | "processing" | "done">("upload");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setStage("editing");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  // Generate thumbnails when file is set
  useEffect(() => {
    if (!file) return;
    (async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const thumbs: PageThumb[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 0.4 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        thumbs.push({ index: i - 1, dataUrl: canvas.toDataURL(), rotation: 0 });
      }
      setPages(thumbs);
    })();
  }, [file]);

  const rotatePage = (idx: number, deg: number) => {
    setPages((prev) =>
      prev.map((p) =>
        p.index === idx ? { ...p, rotation: (p.rotation + deg + 360) % 360 } : p
      )
    );
  };

  const rotateAll = (deg: number) => {
    setPages((prev) =>
      prev.map((p) => ({ ...p, rotation: (p.rotation + deg + 360) % 360 }))
    );
  };

  const handleExport = async () => {
    if (!file) return;
    setStage("processing");
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pdfPages = doc.getPages();
      pages.forEach((p) => {
        if (p.rotation !== 0) {
          const page = pdfPages[p.index];
          page.setRotation(degrees((page.getRotation().angle + p.rotation) % 360));
        }
      });
      const out = await doc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
      setResultBlob(blob);
      setResultSize(blob.size);
      setStage("done");
    } catch {
      setStage("editing");
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const baseName = (file?.name || "document").replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-rotated.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setResultBlob(null);
    setStage("upload");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Rotate PDF</h1>
          <p className="text-muted-foreground text-center mb-10">Rotate individual pages or the entire document.</p>

          <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
            <AnimatePresence mode="wait">
              {stage === "upload" && (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Drop your PDF here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">.pdf files supported</p>
                  </div>
                </motion.div>
              )}

              {stage === "editing" && (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {/* Global controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rotateAll(-90)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" /> Rotate All Left
                      </button>
                      <button
                        onClick={() => rotateAll(90)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      >
                        <RotateCw className="w-4 h-4" /> Rotate All Right
                      </button>
                    </div>
                    <button
                      onClick={handleExport}
                      disabled={pages.length === 0}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" /> Apply & Download
                    </button>
                  </div>

                  {/* Page thumbnails */}
                  {pages.length === 0 ? (
                    <div className="py-16 text-center">
                      <Loader2 className="w-8 h-8 text-muted-foreground mx-auto animate-spin mb-3" />
                      <p className="text-sm text-muted-foreground">Loading pages…</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {pages.map((p) => (
                        <div
                          key={p.index}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card"
                        >
                          <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-lg bg-muted/30">
                            <img
                              src={p.dataUrl}
                              alt={`Page ${p.index + 1}`}
                              className="max-w-full max-h-full object-contain"
                              style={{
                                transform: `rotate(${p.rotation}deg)`,
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Page {p.index + 1}{p.rotation !== 0 ? ` · ${p.rotation}°` : ""}
                          </p>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => rotatePage(p.index, -90)}
                              className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-foreground" />
                            </button>
                            <button
                              onClick={() => rotatePage(p.index, 90)}
                              className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
                            >
                              <RotateCw className="w-3.5 h-3.5 text-foreground" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">Applying rotations…</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
                  <p className="font-bold text-lg text-foreground">Done!</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">
                    {resultSize < 1024 * 1024
                      ? `${(resultSize / 1024).toFixed(0)} KB`
                      : `${(resultSize / (1024 * 1024)).toFixed(1)} MB`}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                      Rotate another
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

export default RotatePdfWorkspace;
