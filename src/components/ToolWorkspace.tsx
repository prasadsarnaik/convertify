import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Download, Loader2, CheckCircle } from "lucide-react";

interface FileItem {
  file: File;
  id: string;
}

type Stage = "upload" | "processing" | "done";

const ToolWorkspace = ({ toolName }: { toolName: string }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [stage, setStage] = useState<Stage>("upload");

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = accepted.map((f) => ({ file: f, id: crypto.randomUUID() }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleConvert = () => {
    setStage("processing");
    setTimeout(() => setStage("done"), 2000);
  };

  const handleReset = () => {
    setFiles([]);
    setStage("upload");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">{toolName}</h1>
          <p className="text-muted-foreground text-center mb-10">Upload your files to get started.</p>

          <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
            <AnimatePresence mode="wait">
              {stage === "upload" && (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">Supports PDF, JPG, PNG, WebP, AVIF, HEIC</p>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {files.map((f) => (
                        <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                          <FileText className="w-5 h-5 text-accent-blue shrink-0" />
                          <span className="text-sm text-foreground truncate flex-1">{f.file.name}</span>
                          <span className="text-xs text-muted-foreground">{(f.file.size / 1024).toFixed(0)} KB</span>
                          <button onClick={() => removeFile(f.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={handleConvert}
                        className="w-full mt-4 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Convert {files.length} {files.length === 1 ? "file" : "files"}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <Loader2 className="w-10 h-10 text-accent-blue mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">Processing your files…</p>
                  <p className="text-sm text-muted-foreground mt-1">This will only take a moment.</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
                  <p className="font-bold text-lg text-foreground">Done!</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">Your files are ready to download.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                      Convert more
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolWorkspace;
