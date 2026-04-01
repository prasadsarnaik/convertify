import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  CheckCircle,
  FileText,
  ArrowDown,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const CompressPdfWorkspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<"upload" | "processing" | "done">("upload");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      const f = accepted[0];
      setFile(f);
      setOriginalSize(f.size);
      handleCompress(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleCompress = async (f: File) => {
    setStage("processing");
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const out = await doc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
      setResultBlob(blob);
      setCompressedSize(blob.size);
      setStage("done");
    } catch {
      setStage("upload");
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-compressed.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleReset = () => {
    setFile(null);
    setResultBlob(null);
    setStage("upload");
  };

  const savings = originalSize > 0 ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100)) : 0;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Compress PDF</h1>
          <p className="text-muted-foreground text-center mb-10">Reduce your PDF file size instantly.</p>

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

              {stage === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">Compressing your PDF…</p>
                  <p className="text-sm text-muted-foreground mt-1">This may take a moment.</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-8 text-center space-y-6">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto" />
                  <p className="font-bold text-lg text-foreground">Compression complete!</p>

                  {/* Before / After comparison */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-card border border-border min-w-[120px]">
                      <FileText className="w-6 h-6 text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Before</p>
                      <p className="text-lg font-bold text-foreground">{formatSize(originalSize)}</p>
                    </div>
                    <ArrowDown className="w-5 h-5 text-accent-green shrink-0 rotate-[-90deg]" />
                    <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-card border border-border min-w-[120px]">
                      <FileText className="w-6 h-6 text-accent-green mb-1" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">After</p>
                      <p className="text-lg font-bold text-foreground">{formatSize(compressedSize)}</p>
                    </div>
                  </div>

                  {savings > 0 && (
                    <p className="text-sm text-accent-green font-medium">
                      Saved {savings}% — {formatSize(originalSize - compressedSize)} smaller
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                      Compress another
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

export default CompressPdfWorkspace;
