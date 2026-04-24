import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Download, Loader2, CheckCircle, AlertCircle, Layers, Shield, Zap, Smartphone, ChevronDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface FileItem {
  file: File;
  id: string;
}

type Stage = "upload" | "processing" | "done" | "error";

function downloadBlob(blob: Blob, name: string) {
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
}

const MergePdfWorkspace = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [stage, setStage] = useState<Stage>("upload");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = accepted.map((f) => ({ file: f, id: crypto.randomUUID() }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const reorderFiles = (dragIndex: number, hoverIndex: number) => {
    const draggedFile = files[dragIndex];
    const newFiles = [...files];
    newFiles.splice(dragIndex, 1);
    newFiles.splice(hoverIndex, 0, draggedFile);
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files to merge");
      setStage("error");
      return;
    }

    setStage("processing");
    setError("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const fileItem of files) {
        const pdfBytes = await fileItem.file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfFile)], { type: "application/pdf" });

      downloadBlob(blob, "merged-document.pdf");
      setStage("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to merge PDFs");
      setStage("error");
    }
  };

  const handleReset = () => {
    setFiles([]);
    setStage("upload");
    setError("");
  };

  const faqs = [
    {
      q: "Is the PDF merger completely free?",
      a: "Yes! Our PDF merger is 100% free to use. There are no hidden fees, no subscriptions, and no credit card required. You can merge as many PDF files as you need without any cost.",
    },
    {
      q: "Is my data secure when merging PDFs?",
      a: "Absolutely. All file processing happens directly in your browser using client-side technology. Your PDFs never leave your device or get uploaded to any server. This ensures maximum privacy and security for your sensitive documents.",
    },
    {
      q: "How many PDFs can I merge at once?",
      a: "You can merge as many PDF files as you need in a single operation. Whether it's 2 files or 20 files, our tool handles them all efficiently. Just drag and drop your files in the order you want them merged.",
    },
    {
      q: "Can I rearrange the order of PDFs before merging?",
      a: "Yes! After uploading your files, you can see them in a list. Currently, files are merged in the order they were uploaded. For custom ordering, simply upload files in your desired sequence, or re-upload in a different order.",
    },
    {
      q: "Will the merged PDF have a watermark?",
      a: "No. Unlike many other online PDF tools, we never add watermarks to your merged documents. Your output PDF will be clean and professional, just like your original files.",
    },
    {
      q: "Does it work on mobile devices?",
      a: "Yes, our PDF merger works perfectly on smartphones and tablets. Whether you're using an iPhone, iPad, Android phone, or tablet, you can merge PDFs on the go without installing any apps.",
    },
    {
      q: "What is the maximum file size allowed?",
      a: "Since processing happens in your browser, file size limits depend on your device's memory. Most users can comfortably merge PDFs up to 50MB each. For very large files, we recommend compressing them first using our Compress PDF tool.",
    },
    {
      q: "Will bookmarks and metadata be preserved?",
      a: "The merged PDF will contain all pages from your original files. However, document-level metadata and bookmarks from individual PDFs are not preserved in the merged output to ensure a clean, combined document.",
    },
  ];

  return (
    <div className="min-h-screen pt-28">
      {/* Tool Section */}
      <div className="pb-20">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
              Merge PDF Files
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Combine multiple PDFs into one document in seconds — free, secure, no watermark.
            </p>

            <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
              <AnimatePresence mode="wait">
                {(stage === "upload" || stage === "error") && (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-semibold text-foreground">Drop PDF files here or click to upload</p>
                      <p className="text-sm text-muted-foreground mt-1">Upload 2 or more PDFs to merge</p>
                    </div>

                    {stage === "error" && (
                      <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-foreground">Error</p>
                          <p className="text-sm text-muted-foreground">{error}</p>
                        </div>
                      </div>
                    )}

                    {files.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Files to merge (in order)
                        </p>
                        {files.map((f, index) => (
                          <div
                            key={f.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                          >
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                              {index + 1}
                            </span>
                            <FileText className="w-5 h-5 text-accent-blue shrink-0" />
                            <span className="text-sm text-foreground truncate flex-1">{f.file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {f.file.size < 1024 * 1024
                                ? `${(f.file.size / 1024).toFixed(0)} KB`
                                : `${(f.file.size / (1024 * 1024)).toFixed(1)} MB`}
                            </span>
                            <button
                              onClick={() => removeFile(f.id)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={handleMerge}
                          disabled={files.length < 2}
                          className="w-full mt-4 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Merge {files.length} PDF{files.length !== 1 ? "s" : ""}
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
                    className="py-16 text-center"
                  >
                    <Loader2 className="w-10 h-10 text-accent-blue mx-auto mb-4 animate-spin" />
                    <p className="font-semibold text-foreground">Merging your PDFs…</p>
                    <p className="text-sm text-muted-foreground mt-1">Combining {files.length} documents</p>
                  </motion.div>
                )}

                {stage === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
                    <p className="font-bold text-lg text-foreground">PDFs Merged Successfully!</p>
                    <p className="text-sm text-muted-foreground mt-1 mb-6">
                      Your {files.length} PDFs have been combined into one document.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors"
                      >
                        Merge More PDFs
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SEO Content Sections */}
      <div className="border-t border-border bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6 py-16">
          {/* How To Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              How to Merge PDF Files Online
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">1. Upload PDFs</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your PDF files or click to select. Upload 2 or more PDFs in the order you want them merged.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">2. Arrange Order</h3>
                <p className="text-sm text-muted-foreground">
                  Files are merged in the order shown. Re-upload if you need a different sequence for your combined PDF.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">3. Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Merge PDFs" and download your combined document instantly. No waiting, no registration needed.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Why Use Convertify PDF Merger?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Shield className="w-8 h-8 text-accent-green mb-3" />
                <h3 className="font-semibold text-foreground mb-1">No Watermark</h3>
                <p className="text-sm text-muted-foreground">
                  Get clean, professional PDFs without any branding or watermarks added.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Zap className="w-8 h-8 text-accent-orange mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Merge PDFs in seconds with our optimized browser-based processing engine.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Smartphone className="w-8 h-8 text-accent-blue mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Works on Mobile</h3>
                <p className="text-sm text-muted-foreground">
                  Merge PDFs on any device — iPhone, Android, tablet, or desktop. No app installation.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Shield className="w-8 h-8 text-accent-purple mb-3" />
                <h3 className="font-semibold text-foreground mb-1">100% Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your files never leave your device. All processing happens locally in your browser.
                </p>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section with Schema.org structured data */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border rounded-xl bg-background overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 text-muted-foreground leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* JSON-LD Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a,
            },
          })),
        })}
      </script>
    </div>
  );
};

export default MergePdfWorkspace;
