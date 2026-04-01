import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  CheckCircle,
  X,
  GripVertical,
  ImagePlus,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ImageToPdfWorkspace = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [stage, setStage] = useState<"upload" | "processing" | "done">("upload");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const newItems = accepted.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setImages((prev) => [...prev, ...newItems]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  // Simple drag reorder
  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(dragIdx, 1);
      next.splice(idx, 0, item);
      return next;
    });
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as ArrayBuffer);
      r.onerror = rej;
      r.readAsArrayBuffer(file);
    });

  const convertToJpgBytes = (file: File): Promise<Uint8Array> =>
    new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          async (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) return rej(new Error("Canvas failed"));
            res(new Uint8Array(await blob.arrayBuffer()));
          },
          "image/jpeg",
          0.92
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        rej(new Error("Image load failed"));
      };
      img.src = url;
    });

  const handleConvert = async () => {
    setStage("processing");
    try {
      const doc = await PDFDocument.create();

      for (const item of images) {
        const bytes = new Uint8Array(await readAsArrayBuffer(item.file));
        let image;
        if (item.file.type === "image/png") {
          image = await doc.embedPng(bytes);
        } else if (item.file.type === "image/jpeg") {
          image = await doc.embedJpg(bytes);
        } else {
          const jpgBytes = await convertToJpgBytes(item.file);
          image = await doc.embedJpg(jpgBytes);
        }
        const page = doc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }

      const out = await doc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
      setResultBlob(blob);
      setResultSize(blob.size);
      setStage("done");
    } catch (err) {
      console.error(err);
      setStage("upload");
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "images.pdf";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleReset = () => {
    images.forEach((i) => URL.revokeObjectURL(i.preview));
    setImages([]);
    setResultBlob(null);
    setStage("upload");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Image to PDF</h1>
          <p className="text-muted-foreground text-center mb-10">Convert images into a single PDF. Drag to reorder.</p>

          <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
            <AnimatePresence mode="wait">
              {stage === "upload" && (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Drop images here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP and more</p>
                  </div>

                  {images.length > 0 && (
                    <>
                      {/* Image preview grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((item, idx) => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={(e) => handleDragOver(e, idx)}
                            onDragEnd={handleDragEnd}
                            className={`group relative rounded-xl border border-border bg-card overflow-hidden cursor-grab active:cursor-grabbing ${
                              dragIdx === idx ? "opacity-50" : ""
                            }`}
                          >
                            <div className="aspect-[3/4] flex items-center justify-center bg-muted/20 p-2">
                              <img
                                src={item.preview}
                                alt={item.file.name}
                                className="max-w-full max-h-full object-contain rounded-lg"
                              />
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1.5">
                              <GripVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="text-xs text-foreground truncate flex-1">{idx + 1}. {item.file.name}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeImage(item.id); }}
                                className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Add more button */}
                        <div
                          {...getRootProps()}
                          className="flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-border hover:border-muted-foreground/30 cursor-pointer transition-colors"
                        >
                          <ImagePlus className="w-6 h-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Add more</span>
                        </div>
                      </div>

                      <button
                        onClick={handleConvert}
                        className="w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Convert {images.length} {images.length === 1 ? "image" : "images"} to PDF
                      </button>
                    </>
                  )}
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">Creating your PDF…</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
                  <p className="font-bold text-lg text-foreground">PDF ready!</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">
                    {images.length} {images.length === 1 ? "page" : "pages"} · {formatSize(resultSize)}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                      Convert more
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

export default ImageToPdfWorkspace;
