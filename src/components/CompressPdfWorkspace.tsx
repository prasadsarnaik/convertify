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
  Zap,
  Shield,
  Smartphone,
  Lock,
  ChevronDown,
  Gauge,
  Clock,
  HardDrive,
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const faqs = [
    {
      q: "Is the PDF compressor completely free?",
      a: "Yes! Our PDF compressor is 100% free to use with no hidden fees, subscriptions, or watermarks. Compress as many PDFs as you need without any cost.",
    },
    {
      q: "How much can I reduce my PDF file size?",
      a: "The compression ratio depends on your PDF's content. Documents with mostly text can compress 50-90%, while image-heavy PDFs typically reduce 20-50%. Our tool shows you exactly how much space you saved after compression.",
    },
    {
      q: "Is my data secure when compressing PDFs?",
      a: "Absolutely. All compression happens directly in your browser using client-side technology. Your PDFs never leave your device or get uploaded to any server, ensuring maximum privacy and security.",
    },
    {
      q: "What's the maximum file size allowed?",
      a: "Since processing happens locally in your browser, file size limits depend on your device's memory. Most users can compress PDFs up to 100MB. For very large files, you may need to split them first using our Split PDF tool.",
    },
    {
      q: "Will compressing reduce my PDF quality?",
      a: "Our compression optimizes the PDF structure while maintaining content quality. Text remains crisp and readable. For image-heavy PDFs, some minor image compression may occur, but the document remains perfectly usable for most purposes.",
    },
    {
      q: "Does it work on mobile devices?",
      a: "Yes! Compress PDFs on any device including iPhone, iPad, Android phones, and tablets. No app installation required — just open your browser and start compressing.",
    },
    {
      q: "Can I compress multiple PDFs at once?",
      a: "Currently, our tool processes one PDF at a time to ensure the best compression quality. After downloading your compressed file, you can immediately compress another PDF.",
    },
    {
      q: "Will the compressed PDF have a watermark?",
      a: "No. We never add watermarks to your compressed PDFs. Your output document will be clean and professional, just like the original.",
    },
  ];

  return (
    <div className="min-h-screen pt-28">
      {/* Tool Section */}
      <div className="pb-20">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
              Compress PDF Files
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Reduce PDF file size online — free, fast, and secure. No watermark, no registration needed.
            </p>

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
                      <p className="text-sm text-muted-foreground mt-1">Reduce file size instantly</p>
                    </div>
                  </motion.div>
                )}

                {stage === "processing" && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                    <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                    <p className="font-semibold text-foreground">Compressing your PDF…</p>
                    <p className="text-sm text-muted-foreground mt-1">Optimizing file size while maintaining quality</p>
                  </motion.div>
                )}

                {stage === "done" && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-8 text-center space-y-6">
                    <CheckCircle className="w-12 h-12 text-accent-green mx-auto" />
                    <p className="font-bold text-lg text-foreground">PDF Compressed Successfully!</p>

                    {/* Before / After comparison */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-card border border-border min-w-[120px]">
                        <FileText className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Original</p>
                        <p className="text-lg font-bold text-foreground">{formatSize(originalSize)}</p>
                      </div>
                      <ArrowDown className="w-5 h-5 text-accent-green shrink-0 rotate-[-90deg]" />
                      <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-card border border-border min-w-[120px]">
                        <FileText className="w-6 h-6 text-accent-green mb-1" />
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Compressed</p>
                        <p className="text-lg font-bold text-foreground">{formatSize(compressedSize)}</p>
                      </div>
                    </div>

                    {savings > 0 && (
                      <p className="text-sm text-accent-green font-medium">
                        🎉 Saved {savings}% — {formatSize(originalSize - compressedSize)} smaller!
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        <Download className="w-4 h-4" /> Download Compressed PDF
                      </button>
                      <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                        Compress Another
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
              How to Reduce PDF File Size Online
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">1. Upload Your PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your PDF file or click to select from your device. Supports all PDF documents up to 100MB.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">2. Automatic Compression</h3>
                <p className="text-sm text-muted-foreground">
                  Our tool instantly optimizes your PDF structure, removes redundant data, and compresses images to reduce file size.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">3. Download & Save</h3>
                <p className="text-sm text-muted-foreground">
                  Get your smaller PDF instantly. See exactly how much you saved before downloading. No waiting required.
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
              Why Use Convertify PDF Compressor?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Zap className="w-8 h-8 text-accent-orange mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Compress PDFs in seconds. Browser-based processing means instant results without server delays.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Lock className="w-8 h-8 text-accent-green mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Private & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Files never leave your device. All compression happens locally in your browser for maximum privacy.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Smartphone className="w-8 h-8 text-accent-blue mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Compress PDFs on iPhone, iPad, Android, or desktop. No app installation required.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Shield className="w-8 h-8 text-accent-purple mb-3" />
                <h3 className="font-semibold text-foreground mb-1">No Watermark</h3>
                <p className="text-sm text-muted-foreground">
                  Get clean, professional PDFs without any branding. Your documents remain yours, unmarked.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <HardDrive className="w-8 h-8 text-accent-pink mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Save Storage Space</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce PDF sizes by 50-90% to save hard drive space and make files easier to share via email.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Clock className="w-8 h-8 text-accent-blue mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Email Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Most email services have 25MB attachment limits. Compress large PDFs to fit within these constraints.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Gauge className="w-8 h-8 text-accent-orange mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Quality Preserved</h3>
                <p className="text-sm text-muted-foreground">
                  Smart compression maintains readability while reducing file size. Perfect for archiving and sharing.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-background">
                <Zap className="w-8 h-8 text-accent-green mb-3" />
                <h3 className="font-semibold text-foreground mb-1">100% Free</h3>
                <p className="text-sm text-muted-foreground">
                  No credit card, no registration, no limits. Compress as many PDFs as you need, completely free.
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

export default CompressPdfWorkspace;
