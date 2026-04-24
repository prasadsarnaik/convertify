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
  convertWordToPdf,
  formatFileSize,
  type ConversionResult,
  validateWordFile,
} from "@/lib/wordToPdf";

interface FileItem {
  id: string;
  file: File;
}

const highlights = [
  {
    icon: Zap,
    title: "Fast conversion",
    description: "Upload a DOC or DOCX file and get a PDF in a clean, minimal flow.",
  },
  {
    icon: Shield,
    title: "Secure processing",
    description: "Files are handled only for conversion and removed after processing.",
  },
  {
    icon: FileCheck2,
    title: "Ready to share",
    description: "Generate a PDF output that works for review, sending, and storage.",
  },
];

const steps = [
  "Upload your Word document",
  "Start the conversion",
  "Download the generated PDF",
];

const WordToPDFTool = () => {
  const [file, setFile] = useState<FileItem | null>(null);
  const [stage, setStage] = useState<"upload" | "processing" | "done" | "error">("upload");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length === 0) return;

    const selectedFile = accepted[0];
    const validation = validateWordFile(selectedFile);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFile({
      id: crypto.randomUUID(),
      file: selectedFile,
    });
    setStage("upload");
    setResult(null);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
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
      const conversionResult = await convertWordToPdf(file.file);
      setResult(conversionResult);
      setStage("done");
      toast.success("Conversion completed successfully.");
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Conversion failed";
      setError(errorMessage);
      setStage("error");
      toast.error(errorMessage);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const url = URL.createObjectURL(result.blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = result.filename;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    }, 1000);

    toast.success("Download started.");
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setStage("upload");
    setError("");
  };

  return (
    <div className="relative overflow-hidden bg-background pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-[130%] rounded-full bg-accent-blue/12 blur-3xl" />
        <div className="absolute left-1/2 top-16 h-80 w-80 translate-x-[10%] rounded-full bg-accent-purple/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-card/70 via-background/30 to-transparent" />
      </div>

      <section className="pb-16 pt-8 md:pb-20">
        <div className="container max-w-6xl px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium text-muted-foreground shadow-card backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent-blue" />
                Clean Word to PDF conversion
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">
                Turn Word documents into polished PDFs in one screen.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Convert Word files into shareable PDFs with a clearer, more
                polished workspace that keeps upload, processing, and download
                in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-card">
                  Supports `.doc` and `.docx`
                </div>
                <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-card">
                  Up to 25MB per file
                </div>
                <div className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-card">
                  No sign-up wall
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 * index }}
                    className="rounded-3xl border border-border bg-background/90 p-5 shadow-card backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10 blur-2xl" />
              <div className="rounded-[2rem] border border-border bg-background/95 p-5 shadow-stage backdrop-blur sm:p-7">
                <div className="flex items-start justify-between gap-4 border-b border-border/80 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-blue">
                      Workspace
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-foreground">
                      Convert Word to PDF
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Upload one file, convert it, and download the final PDF
                      from the same panel.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-card p-3 text-accent-blue">
                    <FileType className="h-6 w-6" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {(stage === "upload" || stage === "error") && (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="space-y-6 pt-6"
                    >
                      <div
                        {...getRootProps()}
                        className={`rounded-[1.5rem] border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
                          isDragActive
                            ? "border-primary bg-primary/5 shadow-card"
                            : "border-border bg-card/60 hover:border-primary/35 hover:bg-card"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-card">
                          <Upload className="h-7 w-7 text-accent-blue" />
                        </div>
                        <p className="mt-5 text-lg font-semibold text-foreground">
                          Drop your Word file here
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Click to browse or drag a file into the upload zone.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full border border-border bg-background px-3 py-1.5">
                            DOC
                          </span>
                          <span className="rounded-full border border-border bg-background px-3 py-1.5">
                            DOCX
                          </span>
                          <span className="rounded-full border border-border bg-background px-3 py-1.5">
                            Max 25MB
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {steps.map((step, index) => (
                          <div
                            key={step}
                            className="rounded-2xl border border-border bg-card/70 p-4"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground shadow-card">
                              {index + 1}
                            </div>
                            <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 shrink-0 text-accent-green" />
                        Your file is used only for processing and download.
                      </div>

                      {stage === "error" && error && (
                        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
                          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Conversion failed
                            </p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {error}
                            </p>
                          </div>
                        </div>
                      )}

                      {file && (
                        <div className="space-y-4 rounded-[1.5rem] border border-border bg-card/80 p-4 sm:p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-card">
                              <FileText className="h-5 w-5 text-accent-blue" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {file.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.file.size)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                              aria-label="Remove file"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleConvert}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                          >
                            Convert to PDF
                            <ArrowRight className="h-4 w-4" />
                          </button>
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
                      className="py-14 text-center"
                    >
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-card">
                        <Loader2 className="h-10 w-10 animate-spin text-accent-blue" />
                      </div>
                      <p className="mt-6 text-lg font-semibold text-foreground">
                        Converting your document...
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        This can take a moment depending on file size and network
                        speed.
                      </p>
                    </motion.div>
                  )}

                  {stage === "done" && result && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-10 text-center"
                    >
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-green/10 shadow-card">
                        <CheckCircle className="h-10 w-10 text-accent-green" />
                      </div>
                      <p className="mt-6 text-2xl font-bold text-foreground">
                        PDF ready
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {result.filename} • {formatFileSize(result.blob.size)}
                      </p>

                      <div className="mx-auto mt-6 max-w-md rounded-[1.5rem] border border-border bg-card/80 p-4 text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background shadow-card">
                            <FileText className="h-5 w-5 text-accent-blue" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {result.filename}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Converted and ready for download
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        >
                          <Download className="h-4 w-4" />
                          Download PDF
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="rounded-2xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
                        >
                          Convert another
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50 py-16">
        <div className="container max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-blue">
                Better workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                A clearer path from document upload to final PDF.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                The page surfaces the important details early, keeps the main
                action visible, and gives the conversion area enough structure
                to feel deliberate on both desktop and mobile.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-border bg-background p-5 shadow-card">
                <p className="text-3xl font-bold text-foreground">1</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Focused task
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  One clear action path from upload to download.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5 shadow-card">
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Visible steps
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The process is explained before users interact.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5 shadow-card">
                <p className="text-3xl font-bold text-foreground">25MB</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  File limit
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Important constraints are surfaced in the UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordToPDFTool;
