import SEO from "@/components/SEO";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  AlertCircle,
  Layers,
  Scissors,
  Archive,
  FileImage,
  ImagePlus,
  RotateCw,
  Edit,
  Lock,
  Unlock,
  Pen,
  FileUp,
  ArrowRightLeft,
  Shrink,
  Image,
  ZoomIn,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface ToolStatus {
  name: string;
  slug: string;
  icon: any;
  category: "PDF" | "Image";
  status: "working" | "limited" | "info";
  notes: string;
}

const tools: ToolStatus[] = [
  { name: "Merge PDF", slug: "merge-pdf", icon: Layers, category: "PDF", status: "working", notes: "Combines multiple PDFs into one using pdf-lib." },
  { name: "Split PDF", slug: "split-pdf", icon: Scissors, category: "PDF", status: "working", notes: "Splits PDF by page ranges. Outputs ZIP with individual pages." },
  { name: "Compress PDF", slug: "compress-pdf", icon: Archive, category: "PDF", status: "limited", notes: "Re-saves PDF to strip unused objects. Savings depend on input file." },
  { name: "PDF to JPG", slug: "pdf-to-jpg", icon: FileImage, category: "PDF", status: "working", notes: "Renders each page at 2x scale to JPG. Outputs ZIP." },
  { name: "JPG to PDF", slug: "jpg-to-pdf", icon: ImagePlus, category: "PDF", status: "working", notes: "Converts images to PDF with drag-to-reorder support." },
  { name: "Rotate PDF", slug: "rotate-pdf", icon: RotateCw, category: "PDF", status: "working", notes: "Per-page rotation with live thumbnails. Uses pdf-lib." },
  { name: "Edit PDF", slug: "edit-pdf", icon: Edit, category: "PDF", status: "working", notes: "Canvas-based editor with text and image overlays." },
  { name: "Protect PDF", slug: "protect-pdf", icon: Lock, category: "PDF", status: "working", notes: "AES-256-GCM encryption via the Web Crypto API." },
  { name: "Unlock PDF", slug: "unlock-pdf", icon: Unlock, category: "PDF", status: "working", notes: "Decrypts Convertify-protected PDFs and attempts compatible standard PDFs." },
  { name: "Sign PDF", slug: "sign-pdf", icon: Pen, category: "PDF", status: "working", notes: "Draw, upload, or type signatures before export." },
  { name: "Image to PDF", slug: "image-to-pdf", icon: FileUp, category: "PDF", status: "working", notes: "Multiple image upload with reorder support." },
  { name: "JPG to PNG", slug: "jpg-to-png", icon: ArrowRightLeft, category: "Image", status: "working", notes: "Canvas-based format conversion." },
  { name: "PNG to JPG", slug: "png-to-jpg", icon: ArrowRightLeft, category: "Image", status: "working", notes: "Canvas-based format conversion with white background fill." },
  { name: "WebP to JPG", slug: "webp-to-jpg", icon: Image, category: "Image", status: "working", notes: "Canvas-based format conversion." },
  { name: "AVIF to JPG", slug: "avif-to-jpg", icon: Image, category: "Image", status: "limited", notes: "Depends on browser AVIF support. Works best in Chromium browsers." },
  { name: "HEIC to JPG", slug: "heic-to-jpg", icon: Image, category: "Image", status: "limited", notes: "Uses heic2any. Processing may be slow for large files." },
  { name: "Resize Image", slug: "resize-image", icon: Shrink, category: "Image", status: "working", notes: "Custom width and height resizing via Canvas API." },
  { name: "Compress Image", slug: "compress-image", icon: Archive, category: "Image", status: "working", notes: "Quality-based JPEG compression." },
  { name: "Rotate Image", slug: "rotate-image", icon: RotateCw, category: "Image", status: "working", notes: "Live preview with slider and proper download rotation." },
  { name: "Image Upscaler", slug: "image-upscaler", icon: ZoomIn, category: "Image", status: "working", notes: "Client-side upscaling with sharpening and noise reduction." },
];

const statusConfig = {
  working: { label: "Working", color: "text-accent-green", bg: "bg-accent-green/10", icon: CheckCircle },
  limited: { label: "Limited", color: "text-accent-orange", bg: "bg-accent-orange/10", icon: AlertCircle },
  info: { label: "Info", color: "text-accent-blue", bg: "bg-accent-blue/10", icon: AlertCircle },
};

const ToolStatusPage = () => {
  const [filter, setFilter] = useState<"all" | "PDF" | "Image">("all");

  const filtered = filter === "all" ? tools : tools.filter((t) => t.category === filter);
  const workingCount = tools.filter((t) => t.status === "working").length;
  const limitedCount = tools.filter((t) => t.status === "limited").length;

  return (
    <>
      <SEO
        title="Tool Status"
        description="Check the current implementation status of Convertify PDF and image tools."
        path="/tool-status"
      />
      <Navbar />
      <div className="min-h-screen pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Tool Status Dashboard</h1>
            <p className="text-muted-foreground text-center mb-8">Current implementation notes for the available Convertify tools.</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-border bg-background text-center">
                <p className="text-3xl font-bold text-foreground">{tools.length}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Total Tools</p>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-accent-green/5 text-center">
                <p className="text-3xl font-bold text-accent-green">{workingCount}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Working</p>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-accent-orange/5 text-center">
                <p className="text-3xl font-bold text-accent-orange">{limitedCount}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Limited</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {(["all", "PDF", "Image"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    filter === f ? "bg-foreground text-background" : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {f === "all" ? "All" : f} {f === "all" ? `(${tools.length})` : `(${tools.filter((t) => t.category === f).length})`}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map((tool, i) => {
                const cfg = statusConfig[tool.status];
                const StatusIcon = cfg.icon;
                return (
                  <motion.div
                    key={tool.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:shadow-card-hover transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <tool.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{tool.notes}</p>
                    </div>
                    <Link
                      to={`/tool/${tool.slug}`}
                      className="shrink-0 p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
              <RefreshCw className="w-3.5 h-3.5" />
              Last verified: April 29, 2026
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ToolStatusPage;
