import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // PDF processing libraries
          if (id.includes("pdfjs-dist")) return "pdf-worker";
          if (id.includes("pdf-lib")) return "pdf-lib";
          if (id.includes("jspdf")) return "jspdf";
          
          // Image processing
          if (id.includes("heic2any")) return "heic";
          if (id.includes("html2canvas")) return "html2canvas";
          if (id.includes("fabric")) return "fabric";
          
          // Document processing (merge docx and mammoth to avoid circular dependency)
          if (id.includes("docx") || id.includes("mammoth")) return "document";
          if (id.includes("xlsx")) return "xlsx";
          
          // Animation libraries
          if (id.includes("framer-motion")) return "framer-motion";
          if (id.includes("gsap")) return "gsap";
          
          // React ecosystem
          if (id.includes("react-hook-form")) return "react-hook-form";
          if (id.includes("@tanstack/react-query")) return "react-query";
          
          // Radix UI components
          if (id.includes("@radix-ui")) return "radix-ui";
          
          // Vendor chunk for other node_modules
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
}));
