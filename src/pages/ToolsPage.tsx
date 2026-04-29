import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Layers,
  Scissors,
  Archive,
  FileImage,
  ImagePlus,
  RotateCw,
  Edit,
  FileUp,
  ArrowRightLeft,
  Shrink,
  Image,
  ZoomIn,
  Lock,
  Unlock,
  Pen,
  FileText,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const pdfTools = [
  { name: "Word to PDF", desc: "Convert DOC & DOCX to PDF", icon: FileText, color: "from-blue-500 to-indigo-600", slug: "word-to-pdf" },
  { name: "PDF to Word", desc: "Convert PDF files into editable Word documents quickly and accurately.", icon: FileText, color: "from-indigo-500 to-purple-600", slug: "pdf-to-word" },
  { name: "Merge PDF", desc: "Combine multiple PDFs into one", icon: Layers, color: "from-accent-blue to-accent-purple", slug: "merge-pdf" },
  { name: "Split PDF", desc: "Extract pages from a PDF", icon: Scissors, color: "from-accent-purple to-accent-pink", slug: "split-pdf" },
  { name: "Compress PDF", desc: "Reduce PDF file size", icon: Archive, color: "from-accent-pink to-accent-orange", slug: "compress-pdf" },
  { name: "PDF to JPG", desc: "Convert PDF pages to images", icon: FileImage, color: "from-accent-orange to-accent-green", slug: "pdf-to-jpg" },
  { name: "JPG to PDF", desc: "Turn images into a PDF", icon: ImagePlus, color: "from-accent-green to-accent-blue", slug: "jpg-to-pdf" },
  { name: "Rotate PDF", desc: "Rotate pages in a PDF", icon: RotateCw, color: "from-accent-blue to-accent-purple", slug: "rotate-pdf" },
  { name: "Edit PDF", desc: "Annotate and edit PDFs", icon: Edit, color: "from-accent-purple to-accent-pink", slug: "edit-pdf" },
  { name: "Protect PDF", desc: "Secure your PDF with a password", icon: Lock, color: "from-accent-orange to-accent-pink", slug: "protect-pdf" },
  { name: "Unlock PDF", desc: "Remove password from your PDF", icon: Unlock, color: "from-accent-green to-accent-purple", slug: "unlock-pdf" },
  { name: "Sign PDF", desc: "Add your signature to a PDF", icon: Pen, color: "from-accent-blue to-accent-orange", slug: "sign-pdf" },
];

const imageTools = [
  { name: "Image to PDF", desc: "Convert any image to PDF", icon: FileUp, color: "from-accent-pink to-accent-orange", slug: "image-to-pdf" },
  { name: "JPG to PNG", desc: "Convert JPG to PNG format", icon: ArrowRightLeft, color: "from-accent-blue to-accent-green", slug: "jpg-to-png" },
  { name: "PNG to JPG", desc: "Convert PNG to JPG format", icon: ArrowRightLeft, color: "from-accent-orange to-accent-pink", slug: "png-to-jpg" },
  { name: "WebP to JPG", desc: "Convert WebP to JPG", icon: Image, color: "from-accent-green to-accent-blue", slug: "webp-to-jpg" },
  { name: "AVIF to JPG", desc: "Convert AVIF to JPG", icon: Image, color: "from-accent-purple to-accent-blue", slug: "avif-to-jpg" },
  { name: "HEIC to JPG", desc: "Convert HEIC to JPG", icon: Image, color: "from-accent-pink to-accent-purple", slug: "heic-to-jpg" },
  { name: "Resize Image", desc: "Resize images to any size", icon: Shrink, color: "from-accent-orange to-accent-green", slug: "resize-image" },
  { name: "Compress Image", desc: "Reduce image file size", icon: Archive, color: "from-accent-blue to-accent-orange", slug: "compress-image" },
  { name: "Image Upscaler", desc: "Upscale images to HD/4K", icon: ZoomIn, color: "from-accent-purple to-accent-pink", slug: "image-upscaler" },
  { name: "Rotate Image", desc: "Rotate images to any angle", icon: RotateCw, color: "from-accent-green to-accent-purple", slug: "rotate-image" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ToolCard = ({ tool, i }: { tool: typeof pdfTools[0]; i: number }) => (
  <motion.div
    variants={fade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: i * 0.03 }}
    whileHover={{ y: -4 }}
  >
    <Link
      to={`/tool/${tool.slug}`}
      className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-background p-5 text-left transition-shadow hover:shadow-card-hover"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0`}>
        <tool.icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground">{tool.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tool.desc}</p>
      </div>
    </Link>
  </motion.div>
);

const ToolsPage = () => (
  <>
    <SEO
      title="All File Tools"
      description="Browse Convertify tools for PDF merge, split, compress, signing, image conversion, resizing, and document workflows."
      path="/tools"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">All Tools</h1>
          <p className="text-lg text-muted-foreground">{siteConfig.tagline}</p>
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-6">PDF Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
          {pdfTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} i={i} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Image Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} i={i} />
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ToolsPage;
