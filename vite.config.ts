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
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // 2. Fix the "Invalid Type" error. 
        // Ensure the function handles the default case correctly.
        manualChunks(id: string) {
          if (id.includes("pdfjs-dist")) return "pdf";
          if (id.includes("heic2any")) return "heic";
          
          // 3. To fix the "Large Chunk" warning from earlier, 
          // we should also split out core React vendor code.
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-core";
            }
            return "vendor"; 
          }
        },
      },
    },
  },
}));