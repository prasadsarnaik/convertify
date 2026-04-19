import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  Pen,
  ImagePlus,
  Type,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

type SignatureMode = "draw" | "upload" | "type";

const FONTS = [
  { name: "Cursive", family: "'Dancing Script', cursive" },
  { name: "Serif", family: "'Georgia', serif" },
  { name: "Handwriting", family: "'Caveat', cursive" },
];

const SignPdfWorkspace = () => {
  const [stage, setStage] = useState<"upload" | "sign" | "downloading">("upload");
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState(0);
  const [signatureImg, setSignatureImg] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const fileRef = useRef<File | null>(null);
  const fileDataRef = useRef<ArrayBuffer | null>(null);
  // Store per-page annotation snapshots
  const annotationsRef = useRef<Record<number, any>>({});

  useEffect(() => {
    if (!document.getElementById("sig-fonts")) {
      const link = document.createElement("link");
      link.id = "sig-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Caveat:wght@700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (stage !== "sign" || !canvasRef.current || fabricRef.current) return;
    const { fabric } = require("fabric") as any;
    const canvas = new fabric.Canvas(canvasRef.current, { backgroundColor: "#fff", selection: true });
    fabricRef.current = canvas;
    return () => { canvas.dispose(); fabricRef.current = null; };
  }, [stage]);

  const renderPage = useCallback(async (pageNum: number) => {
    const canvas = fabricRef.current;
    if (!canvas || !pdfDoc) return;
    const page = await pdfDoc.getPage(pageNum);
    const containerWidth = containerRef.current?.clientWidth || 600;
    const maxWidth = Math.min(containerWidth - 48, 800);
    const unscaled = page.getViewport({ scale: 1 });
    const scale = maxWidth / unscaled.width;
    const viewport = page.getViewport({ scale });

    const tmp = document.createElement("canvas");
    tmp.width = viewport.width;
    tmp.height = viewport.height;
    const ctx = tmp.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const bgUrl = tmp.toDataURL();
    canvas.clear();
    canvas.setWidth(viewport.width);
    canvas.setHeight(viewport.height);

    const { fabric } = require("fabric") as any;
    fabric.Image.fromURL(bgUrl, (img: any) => {
      canvas.setBackgroundImage(img, () => {
        const saved = annotationsRef.current[pageNum];
        if (saved) {
          canvas.loadFromJSON(saved, () => {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          });
        } else {
          canvas.renderAll();
        }
      });
    });
  }, [pdfDoc]);

  useEffect(() => {
    if (pdfDoc && fabricRef.current) {
      renderPage(currentPage);
    }
  }, [currentPage, pdfDoc, renderPage]);

  const saveCurrentAnnotations = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const objects = canvas.getObjects();
    if (objects.length > 0) {
      annotationsRef.current[currentPage] = canvas.toJSON();
    } else {
      delete annotationsRef.current[currentPage];
    }
  };

  const loadPDF = async (file: File) => {
    fileRef.current = file;
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const ab = await file.arrayBuffer();
    fileDataRef.current = ab.slice(0);
    const pdf = await pdfjs.getDocument({ data: ab }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    setStage("sign");
  };

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) loadPDF(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const startDraw = (e: React.PointerEvent) => {
    const cvs = drawCanvasRef.current;
    if (!cvs) return;
    isDrawing.current = true;
    const ctx = cvs.getContext("2d")!;
    const rect = cvs.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const draw = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    const cvs = drawCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    const rect = cvs.getBoundingClientRect();
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };
  const endDraw = () => { isDrawing.current = false; };
  const clearDraw = () => {
    const cvs = drawCanvasRef.current;
    if (!cvs) return;
    cvs.getContext("2d")!.clearRect(0, 0, cvs.width, cvs.height);
  };

  const placeSignature = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const { fabric } = require("fabric") as any;

    if (signatureMode === "draw") {
      const cvs = drawCanvasRef.current;
      if (!cvs) return;
      const dataUrl = cvs.toDataURL();
      fabric.Image.fromURL(dataUrl, (img: any) => {
        const maxW = canvas.width! * 0.3;
        const s = Math.min(maxW / (img.width || 1), 1);
        img.scale(s);
        img.set({ left: canvas.width! * 0.5, top: canvas.height! * 0.7 });
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    } else if (signatureMode === "upload" && signatureImg) {
      fabric.Image.fromURL(signatureImg, (img: any) => {
        const maxW = canvas.width! * 0.3;
        const s = Math.min(maxW / (img.width || 1), 1);
        img.scale(s);
        img.set({ left: canvas.width! * 0.5, top: canvas.height! * 0.7 });
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    } else if (signatureMode === "type" && typedName) {
      const text = new fabric.Text(typedName, {
        left: canvas.width! * 0.3,
        top: canvas.height! * 0.75,
        fontSize: 36,
        fontFamily: FONTS[selectedFont].family,
        fill: "#000",
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    }
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

  const downloadPDF = async () => {
    const canvas = fabricRef.current;
    if (!canvas || !fileDataRef.current || !pdfDoc) return;
    setIsDownloading(true);
    try {
      saveCurrentAnnotations();

      const srcDoc = await PDFDocument.load(fileDataRef.current);
      const outputDoc = await PDFDocument.create();
      const copiedPages = await outputDoc.copyPages(srcDoc, srcDoc.getPageIndices());

      for (let i = 0; i < copiedPages.length; i++) {
        const pageNum = i + 1;
        const page = copiedPages[i];
        outputDoc.addPage(page);

        if (annotationsRef.current[pageNum]) {
          const { width, height } = page.getSize();
          const pdfPage = await pdfDoc.getPage(pageNum);
          const unscaled = pdfPage.getViewport({ scale: 1 });

          const tempHtmlCanvas = document.createElement("canvas");
          tempHtmlCanvas.width = width;
          tempHtmlCanvas.height = height;

          const { fabric } = require("fabric") as any;
          const tempFabric = new fabric.StaticCanvas(tempHtmlCanvas, { width, height });

          await new Promise<void>((resolve) => {
            tempFabric.loadFromJSON(annotationsRef.current[pageNum], () => {
              const savedW = annotationsRef.current[pageNum].width || canvas.width!;
              const scaleFactor = width / savedW;
              tempFabric.getObjects().forEach((obj: any) => {
                obj.scaleX = (obj.scaleX || 1) * scaleFactor;
                obj.scaleY = (obj.scaleY || 1) * scaleFactor;
                obj.left = (obj.left || 0) * scaleFactor;
                obj.top = (obj.top || 0) * scaleFactor;
                obj.setCoords();
              });
              tempFabric.setBackgroundImage(null as any, () => {});
              tempFabric.backgroundColor = "transparent";
              tempFabric.renderAll();
              resolve();
            });
          });

          const dataUrl = tempFabric.toDataURL({ format: "png" });
          const pngBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
          const overlayImg = await outputDoc.embedPng(pngBytes);
          page.drawImage(overlayImg, { x: 0, y: 0, width, height });
          tempFabric.dispose();
        }
      }

      const pdfBytes = await outputDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileRef.current?.name.replace(/\.[^.]+$/, "") || "document"}-signed.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSigUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => setSignatureImg(reader.result as string);
      reader.readAsDataURL(f);
    };
    input.click();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      saveCurrentAnnotations();
      setCurrentPage(page);
    }
  };

  const modes: { key: SignatureMode; icon: typeof Pen; label: string }[] = [
    { key: "draw", icon: Pen, label: "Draw" },
    { key: "upload", icon: ImagePlus, label: "Upload" },
    { key: "type", icon: Type, label: "Type" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Sign PDF</h1>
          <p className="text-muted-foreground text-center mb-8">Add your signature to a PDF easily.</p>

          <AnimatePresence mode="wait">
            {stage === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Pen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Drop your PDF here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">.pdf files supported</p>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === "sign" && (
              <motion.div key="sign" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl border border-border bg-background shadow-card">
                  <div className="flex items-center gap-2">
                    <button onClick={deleteSelected} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                  <button onClick={downloadPDF} disabled={isDownloading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                    {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {isDownloading ? "Saving…" : "Download"}
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
                  {/* PDF Canvas */}
                  <div className="rounded-2xl border border-border bg-card shadow-stage p-4 sm:p-6 overflow-x-auto">
                    <div className="flex justify-center">
                      <canvas ref={canvasRef} className="rounded-xl shadow-card-hover" />
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 pt-4">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} className="p-2 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-foreground">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages} className="p-2 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Signature Panel */}
                  <div className="rounded-2xl border border-border bg-background shadow-stage p-5 space-y-4">
                    <p className="font-semibold text-foreground text-sm">Create Signature</p>

                    <div className="flex rounded-xl border border-border overflow-hidden">
                      {modes.map((m) => (
                        <button
                          key={m.key}
                          onClick={() => setSignatureMode(m.key)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
                            signatureMode === m.key ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:bg-card"
                          }`}
                        >
                          <m.icon className="w-3.5 h-3.5" /> {m.label}
                        </button>
                      ))}
                    </div>

                    {signatureMode === "draw" && (
                      <div className="space-y-3">
                        <div className="border border-border rounded-xl overflow-hidden bg-card">
                          <canvas
                            ref={drawCanvasRef}
                            width={270}
                            height={120}
                            className="w-full touch-none cursor-crosshair"
                            onPointerDown={startDraw}
                            onPointerMove={draw}
                            onPointerUp={endDraw}
                            onPointerLeave={endDraw}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={clearDraw} className="flex-1 text-xs py-2 rounded-xl border border-border text-muted-foreground hover:bg-card transition-colors">Clear</button>
                          <button onClick={placeSignature} className="flex-1 text-xs py-2 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity">Place on PDF</button>
                        </div>
                      </div>
                    )}

                    {signatureMode === "upload" && (
                      <div className="space-y-3">
                        {signatureImg ? (
                          <div className="border border-border rounded-xl p-3 bg-card">
                            <img src={signatureImg} alt="Signature" className="max-h-24 mx-auto" />
                          </div>
                        ) : (
                          <button onClick={handleSigUpload} className="w-full border-2 border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground hover:border-muted-foreground/30 transition-colors">
                            <ImagePlus className="w-6 h-6 mx-auto mb-2" />
                            Upload signature image
                          </button>
                        )}
                        <div className="flex gap-2">
                          {signatureImg && <button onClick={() => setSignatureImg(null)} className="flex-1 text-xs py-2 rounded-xl border border-border text-muted-foreground hover:bg-card transition-colors">Change</button>}
                          <button onClick={placeSignature} disabled={!signatureImg} className="flex-1 text-xs py-2 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-40">Place on PDF</button>
                        </div>
                      </div>
                    )}

                    {signatureMode === "type" && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={typedName}
                          onChange={(e) => setTypedName(e.target.value)}
                          placeholder="Type your name"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <div className="flex gap-2">
                          {FONTS.map((f, i) => (
                            <button
                              key={f.name}
                              onClick={() => setSelectedFont(i)}
                              className={`flex-1 py-2.5 rounded-xl border text-sm transition-colors ${
                                selectedFont === i ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:bg-card"
                              }`}
                              style={{ fontFamily: f.family }}
                            >
                              {typedName || f.name}
                            </button>
                          ))}
                        </div>
                        <button onClick={placeSignature} disabled={!typedName} className="w-full text-xs py-2 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-40">Place on PDF</button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SignPdfWorkspace;
