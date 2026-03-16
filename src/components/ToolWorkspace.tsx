import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";

import { getToolConfig, runConversion, type ConvertResult, type ToolOption } from "@/lib/converters";

const MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".heic": "image/heic",
  ".heif": "image/heif",
};

function buildAcceptMap(accept: string): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const part of accept.split(",").map((s) => s.trim())) {
    if (part.includes("/")) {
      // Already a MIME type like "image/*"
      map[part] = [];
    } else if (MIME_MAP[part]) {
      const mime = MIME_MAP[part];
      if (!map[mime]) map[mime] = [];
      map[mime].push(part);
    } else {
      // Unknown extension — use wildcard
      map["application/octet-stream"] = [...(map["application/octet-stream"] || []), part];
    }
  }
  return map;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  // Clean up after a short delay to ensure mobile browsers complete the download
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1000);
}

interface FileItem {
  file: File;
  id: string;
}

type Stage = "upload" | "processing" | "done" | "error";

const ToolWorkspace = ({ toolName, toolSlug }: { toolName: string; toolSlug: string }) => {
  const config = getToolConfig(toolSlug);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [stage, setStage] = useState<Stage>("upload");
  const [results, setResults] = useState<ConvertResult[]>([]);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<Record<string, string | number>>(() => {
    const defaults: Record<string, string | number> = {};
    config.options?.forEach((o) => (defaults[o.key] = o.defaultValue));
    return defaults;
  });

  const onDrop = useCallback(
    (accepted: File[]) => {
      const newFiles = accepted.map((f) => ({ file: f, id: crypto.randomUUID() }));
      if (config.multiple === false) {
        setFiles(newFiles.slice(0, 1));
      } else {
        setFiles((prev) => [...prev, ...newFiles]);
      }
    },
    [config.multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: config.accept
      ? buildAcceptMap(config.accept)
      : undefined,
    multiple: config.multiple !== false,
  });

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleConvert = async () => {
    setStage("processing");
    setError("");
    try {
      const output = await runConversion(
        toolSlug,
        files.map((f) => f.file),
        options
      );
      setResults(output);
      setStage("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Conversion failed");
      setStage("error");
    }
  };

  const handleDownload = () => {
    results.forEach((r) => downloadBlob(r.blob, r.name));
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setStage("upload");
    setError("");
  };

  const updateOption = (key: string, value: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
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
                    <p className="font-semibold text-foreground">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {config.accept || "All files"} supported
                    </p>
                  </div>

                  {stage === "error" && (
                    <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-foreground">Conversion failed</p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                      </div>
                    </div>
                  )}

                  {files.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {files.map((f) => (
                        <div key={f.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                          <FileText className="w-5 h-5 text-accent-blue shrink-0" />
                          <span className="text-sm text-foreground truncate flex-1">{f.file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {f.file.size < 1024 * 1024
                              ? `${(f.file.size / 1024).toFixed(0)} KB`
                              : `${(f.file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </span>
                          <button onClick={() => removeFile(f.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {config.options && config.options.length > 0 && (
                        <ToolOptions options={config.options} values={options} onChange={updateOption} />
                      )}

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
                  <p className="text-sm text-muted-foreground mt-1">This may take a moment.</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
                  <p className="font-bold text-lg text-foreground">Done!</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    {results.length} {results.length === 1 ? "file" : "files"} ready to download.
                  </p>
                  <div className="space-y-2 mb-6 max-w-sm mx-auto">
                    {results.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-card border border-border text-sm">
                        <span className="truncate text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {r.blob.size < 1024 * 1024
                            ? `${(r.blob.size / 1024).toFixed(0)} KB`
                            : `${(r.blob.size / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download {results.length > 1 ? "All" : ""}
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

// ─── Tool Options UI ────────────────────────────────────────

function ToolOptions({
  options,
  values,
  onChange,
}: {
  options: ToolOption[];
  values: Record<string, string | number>;
  onChange: (key: string, value: string | number) => void;
}) {
  return (
    <div className="mt-4 p-4 rounded-xl bg-card border border-border space-y-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Options</p>
      {options.map((opt) => (
        <div key={opt.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm font-medium text-foreground min-w-[120px]">{opt.label}</label>
          {opt.type === "select" && opt.choices && (
            <select
              value={String(values[opt.key])}
              onChange={(e) => onChange(opt.key, e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {opt.choices.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          )}
          {opt.type === "number" && (
            <input
              type="number"
              value={Number(values[opt.key])}
              onChange={(e) => onChange(opt.key, Number(e.target.value))}
              min={opt.min}
              max={opt.max}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
          {opt.type === "text" && (
            <input
              type="text"
              value={String(values[opt.key])}
              onChange={(e) => onChange(opt.key, e.target.value)}
              placeholder={opt.placeholder}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ToolWorkspace;
