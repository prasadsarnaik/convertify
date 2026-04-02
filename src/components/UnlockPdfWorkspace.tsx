import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Loader2,
  CheckCircle,
  Unlock,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";

const UnlockPdfWorkspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<"upload" | "password" | "processing" | "done">("upload");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setStage("password");
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleUnlock = async () => {
    if (!password) { setError("Please enter the password."); return; }
    if (!file) return;

    setError("");
    setStage("processing");

    try {
      const bytes = await file.arrayBuffer();
      // Try loading with the provided password
      const doc = await PDFDocument.load(bytes, { password });
      // Save without encryption
      const unlocked = await doc.save();
      const blob = new Blob([unlocked.buffer as ArrayBuffer], { type: "application/pdf" });
      setResultBlob(blob);
      setStage("done");
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("password") || msg.includes("encrypt") || msg.includes("decrypt")) {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to unlock PDF. The file may be corrupted or not password-protected.");
      }
      setStage("password");
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-unlocked.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleReset = () => {
    setFile(null);
    setResultBlob(null);
    setPassword("");
    setError("");
    setStage("upload");
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Unlock PDF</h1>
          <p className="text-muted-foreground text-center mb-10">Remove password from your PDF file.</p>

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
                    <Unlock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Drop your locked PDF here or click to upload</p>
                    <p className="text-sm text-muted-foreground mt-1">.pdf files supported</p>
                  </div>
                </motion.div>
              )}

              {stage === "password" && (
                <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                    <Unlock className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">{file ? `${(file.size / 1024).toFixed(0)} KB` : ""}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">Enter PDF Password</label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                        onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                      />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleUnlock}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <Unlock className="w-4 h-4" /> Unlock PDF
                  </button>
                </motion.div>
              )}

              {stage === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center">
                  <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-foreground">Unlocking your PDF…</p>
                  <p className="text-sm text-muted-foreground mt-1">This may take a moment.</p>
                </motion.div>
              )}

              {stage === "done" && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-8 text-center space-y-6">
                  <CheckCircle className="w-12 h-12 text-accent-green mx-auto" />
                  <p className="font-bold text-lg text-foreground">PDF unlocked successfully!</p>
                  <p className="text-sm text-muted-foreground">Your PDF is now password-free.</p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors">
                      Unlock another
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

export default UnlockPdfWorkspace;
