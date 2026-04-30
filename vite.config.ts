import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024,
      }),
    mode === "production" &&
      compression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    cssMinify: "esbuild",
    minify: "esbuild",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id: string) {
          if (id.includes("pdfjs-dist")) return "pdf-viewer";
          if (id.includes("pdf-lib")) return "pdf-lib";
          if (id.includes("mammoth")) return "word-parser";
          if (id.includes("heic2any")) return "heic-converter";
          if (id.includes("fabric")) return "image-editor";
          if (id.includes("gsap")) return "animation";
          if (id.includes("framer-motion")) return "animation";
          if (id.includes("recharts")) return "charts";
          if (id.includes("node_modules")) {
            if (id.includes("react-dom")) return "vendor-dom";
            if (id.includes("react")) return "vendor-react";
            if (id.includes("react-router") || id.includes("@tanstack")) return "vendor-router";
            if (id.includes("@radix-ui") || id.includes("lucide")) return "vendor-ui";
            if (id.includes("react-hook-form") || id.includes("zod")) return "vendor-forms";
            if (id.includes("tailwind") || id.includes("clsx")) return "vendor-styles";
            return "vendor";
          }
        },
      },
    },
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));