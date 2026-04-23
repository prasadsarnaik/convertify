import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Download,
  FileCheck2,
  FileText,
  FileType,
  Loader2,
  Shield,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import {
  convertPdfToWord,
  formatFileSize,
  type ConversionResult,
  validatePdfFile,
} from "@/lib/pdfToWord";

interface FileItem {
  id: string;
  file: File;
}

const highlights = [
  {
    icon: Zap,
    title: "Fast conversion",
    description: "Upload a PDF and get an editable Word document in seconds.",
  },
  {
    icon: Shield,
    title: "Secure processing",
    description: "Files are handled only for conversion and removed after processing.",
  },
  {
    icon: FileCheck2,
    title: "Editable output",
    description: "Get a DOCX file you can edit, format, and share easily.",
  },
];

export function PdfToWordTool() {
  const [file, setFile] = useState<FileItem | null>(null);
  const [stage, setStage] = useState<"upload" | "processing" | "done" | "error">("upload");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length === 0) return;

    const selectedFile = accepted[0];
    const validation = validatePdfFile(selectedFile);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFile({
      id: crypto.randomUUID(),
      file: selectedFile,
    });
    setStage("upload");
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: 25 * 1024 * 1024,
  });

  const removeFile = () => {
    setFile(null);
    setStage("upload");
    setResult(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) return;

    setStage("processing");
    setError("");

    try {
      const conversionResult = await convertPdfToWord(file.file);
      setResult(conversionResult);
      setStage("done");
      toast.success("Conversion completed successfully!");
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "Conversion failed";
      setError(errorMessage);
      setStage("error");
      toast.error(errorMessage);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 1000);

    toast.success("Download started!");
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setStage("upload");
    setError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Hero */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              PDF to Word Converter
            </h1>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Convert PDF files into editable Word documents online. Fast, secure, and free.
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <h.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{h.title}</h3>
                <p className="text-xs text-muted-foreground">{h.description}</p>
              </div>
            ))}
          </div>

          {/* Upload / Conversion Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
              {(stage === "upload" || stage === "error") && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Drag & Drop Area */}
                  {!file && (
                    <div
                      {...getRootProps()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                        isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <p className="mb-1 text-base font-semibold text-foreground">
                        Drag & drop PDF file here
                      </p>
                      <p className="text-sm text-muted-foreground">or click to upload</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Supports PDF files (max 25MB)
                      </p>
                    </div>
                  )}

                  {/* File Preview */}
                  {file && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                          <FileType className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-medium text-foreground">
                            {file.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.file.size)}
                          </p>
                        </div>
                        <button
                          onClick={removeFile}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Remove file"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <button
                        onClick={handleConvert}
                        className="w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                      >
                        Convert to Word
                      </button>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {stage === "error" && error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-left"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                      <div>
                        <p className="text-sm font-semibold text-destructive">
                          Invalid file type or conversion failed
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Your files are secure and automatically deleted</span>
                  </div>
                </motion.div>
              )}

              {/* Processing State */}
              {stage === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">Converting your PDF...</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please wait while we process your document
                  </p>
                </motion.div>
              )}

              {/* Success State */}
              {stage === "done" && result && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="mb-1 text-xl font-bold text-foreground">Conversion completed</p>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {result.filename} · {formatFileSize(result.blob.size)}
                  </p>

                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      onClick={handleDownload}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto"
                    >
                      <Download className="h-4 w-4" /> Download Word Document
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
                    >
                      Convert another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PdfToWordTool;
