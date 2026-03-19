import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Type,
  ImagePlus,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Undo2,
} from "lucide-react";

const EditPdfWorkspace = () => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [stage, setStage] = useState<"upload" | "editing">("upload");
  const [isDownloading, setIsDownloading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const fileDataRef = useRef<ArrayBuffer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize fabric canvas
  useEffect(() => {
    if (stage !== "editing" || !canvasRef.current || fabricRef.current) return;

    const { fabric } = require("fabric") as any;
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#fff",
      selection: true,
    });
    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [stage]);

  // Render current page
  useEffect(() => {
    if (!pdfDoc || !fabricRef.current) return;
    renderPage(currentPage);
  }, [currentPage, pdfDoc]);

  // Responsive resize
  useEffect(() => {
    if (stage !== "editing") return;
    const handleResize = () => {
      if (pdfDoc && fabricRef.current) renderPage(currentPage);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [stage, pdfDoc, currentPage]);

  const renderPage = async (pageNum: number) => {
    const canvas = fabricRef.current;
    if (!canvas || !pdfDoc) return;

    const page = await pdfDoc.getPage(pageNum);

    // Calculate scale to fit container
    const containerWidth = containerRef.current?.clientWidth || 600;
    const maxWidth = Math.min(containerWidth - 48, 800);
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    // Render PDF page to temp canvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;
    const ctx = tempCanvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const bgUrl = tempCanvas.toDataURL();

    canvas.clear();
    canvas.setWidth(viewport.width);
    canvas.setHeight(viewport.height);

    const { fabric } = require("fabric") as any;
    fabric.Image.fromURL(bgUrl, (img: any) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: 1,
        scaleY: 1,
      });
    });
  };

  const loadPDF = async (file: File) => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    fileDataRef.current = arrayBuffer.slice(0);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    setStage("editing");
  };

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) loadPDF(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const addText = () => {
    if (!fabricRef.current) return;
    const { fabric } = require("fabric") as any;
    const text = new fabric.IText("Edit me", {
      left: 100,
      top: 100,
      fill: "#000000",
      fontSize: 24,
      fontFamily: "Inter, system-ui, sans-serif",
      editable: true,
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const { fabric } = require("fabric") as any;
        fabric.Image.fromURL(reader.result as string, (img: any) => {
          const canvas = fabricRef.current;
          if (!canvas) return;
          // Scale image to fit within canvas
          const maxDim = Math.min(canvas.width!, canvas.height!) * 0.4;
          const scaleFactor = Math.min(
            maxDim / (img.width || 1),
            maxDim / (img.height || 1),
            1
          );
          img.scale(scaleFactor);
          img.set({ left: 50, top: 50 });
          canvas.add(img);
          canvas.setActiveObject(img);
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const deleteSelected = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    if (active.length) {
      active.forEach((obj: any) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const clearAnnotations = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const objects = canvas.getObjects().slice();
    objects.forEach((obj: any) => canvas.remove(obj));
    canvas.renderAll();
  };

  const downloadPDF = async () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDocLib = await PDFDocument.create();
      const imgData = canvas.toDataURL({ format: "png", multiplier: 2 });
      const pngBytes = await fetch(imgData).then((r) => r.arrayBuffer());
      const img = await pdfDocLib.embedPng(pngBytes);

      const page = pdfDocLib.addPage([canvas.width!, canvas.height!]);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: canvas.width!,
        height: canvas.height!,
      });

      const pdfBytes = await pdfDocLib.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited.pdf";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } finally {
      setIsDownloading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
            Edit PDF
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Add text, images, and annotations to your PDF.
          </p>

          <AnimatePresence mode="wait">
            {stage === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">
                      Drop your PDF here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      .pdf files supported
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === "editing" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl border border-border bg-background shadow-card">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={addText}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Type className="w-4 h-4" />
                      <span className="hidden sm:inline">Text</span>
                    </button>
                    <button
                      onClick={addImage}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <ImagePlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Image</span>
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                    <button
                      onClick={clearAnnotations}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Undo2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  </div>

                  <button
                    onClick={downloadPDF}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Saving…" : "Download"}
                  </button>
                </div>

                {/* Canvas area */}
                <div className="rounded-2xl border border-border bg-card shadow-stage p-4 sm:p-6 overflow-x-auto">
                  <div className="flex justify-center">
                    <canvas
                      ref={canvasRef}
                      className="rounded-xl shadow-card-hover"
                    />
                  </div>
                </div>

                {/* Page navigation */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 py-3">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="p-2 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium text-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="p-2 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default EditPdfWorkspace;
