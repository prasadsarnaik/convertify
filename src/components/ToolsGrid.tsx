import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Layers, Scissors, Archive, FileImage, ImagePlus, RotateCw,
  Edit, FileUp, ArrowRightLeft, Shrink, Image, ZoomIn,
  Lock, Unlock, Pen, FileText,
} from "lucide-react";

const tools = [
  { name: "Word to PDF", desc: "Convert DOC & DOCX to PDF", icon: FileText, color: "from-blue-500 to-indigo-600", slug: "word-to-pdf" },
  { name: "PDF to Word", desc: "Convert PDF to editable Word", icon: FileText, color: "from-indigo-500 to-purple-600", slug: "pdf-to-word" },
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
  { name: "Image to PDF", desc: "Convert any image to PDF", icon: FileUp, color: "from-accent-pink to-accent-orange", slug: "image-to-pdf" },
  { name: "JPG to PNG", desc: "Convert JPG to PNG format", icon: ArrowRightLeft, color: "from-accent-blue to-accent-green", slug: "jpg-to-png" },
  { name: "PNG to JPG", desc: "Convert PNG to JPG format", icon: ArrowRightLeft, color: "from-accent-orange to-accent-pink", slug: "png-to-jpg" },
  { name: "WebP to JPG", desc: "Convert WebP to JPG", icon: Image, color: "from-accent-green to-accent-blue", slug: "webp-to-jpg" },
  { name: "AVIF to JPG", desc: "Convert AVIF to JPG", icon: Image, color: "from-accent-purple to-accent-blue", slug: "avif-to-jpg" },
  { name: "HEIC to JPG", desc: "Convert HEIC to JPG", icon: Image, color: "from-accent-pink to-accent-purple", slug: "heic-to-jpg" },
  { name: "Resize Image", desc: "Resize images to any size", icon: Shrink, color: "from-accent-orange to-accent-green", slug: "resize-image" },
  { name: "Compress Image", desc: "Reduce image file size", icon: Archive, color: "from-accent-blue to-accent-orange", slug: "compress-image" },
  { name: "Rotate Image", desc: "Rotate images to any angle", icon: RotateCw, color: "from-accent-green to-accent-purple", slug: "rotate-image" },
  { name: "Image Upscaler", desc: "Upscale images to HD/4K", icon: ZoomIn, color: "from-accent-purple to-accent-pink", slug: "image-upscaler" },
];

const ToolsGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="tools" className="py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Every tool you need</h2>
          <p className="mt-4 text-muted-foreground text-lg">PDF &amp; image tools, all in one place.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tools.map((tool, i) => (
            <motion.button
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/tool/${tool.slug}`)}
              className="group flex flex-col items-start gap-3 p-5 rounded-2xl border border-border bg-background hover:shadow-card-hover transition-shadow text-left cursor-pointer"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0`}>
                <tool.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tool.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
