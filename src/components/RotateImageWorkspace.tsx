import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  RotateCcw,
  RotateCw,
  Undo2,
  Download,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const RotateImageWorkspace = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [angle, setAngle] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    setFileName(file.name);
    setAngle(0);
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const rotate = (deg: number) => setAngle((prev) => prev + deg);
  const reset = () => setAngle(0);

  const handleDownload = () => {
    if (!imageSrc) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      const rad = (angle * Math.PI) / 180;
      const absSin = Math.abs(Math.sin(rad));
      const absCos = Math.abs(Math.cos(rad));
      const w = image.naturalWidth * absCos + image.naturalHeight * absSin;
      const h = image.naturalWidth * absSin + image.naturalHeight * absCos;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w);
      canvas.height = Math.round(h);
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

      const baseName = fileName.replace(/\.[^.]+$/, "");
      const link = document.createElement("a");
      link.download = `${baseName}-rotated.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  const normalizedAngle = ((angle % 360) + 360) % 360;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
            Rotate Image
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Upload an image and rotate it to any angle.
          </p>

          <div className="rounded-2xl border border-border bg-background shadow-stage p-8">
            <AnimatePresence mode="wait">
              {!imageSrc ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-semibold text-foreground">
                      Drop an image here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG, WebP, AVIF supported
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Preview */}
                  <div className="w-full flex justify-center overflow-hidden rounded-xl bg-muted/30 p-4">
                    <img
                      ref={imgRef}
                      src={imageSrc}
                      alt="Preview"
                      className="max-w-[420px] max-h-[420px] rounded-xl shadow-lg object-contain"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => rotate(-90)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-card transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Left 90°
                    </button>
                    <button
                      onClick={() => rotate(90)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-card transition-colors"
                    >
                      <RotateCw className="w-4 h-4" /> Right 90°
                    </button>
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-card transition-colors"
                    >
                      <Undo2 className="w-4 h-4" /> Reset
                    </button>
                  </div>

                  {/* Slider */}
                  <div className="w-full max-w-xs space-y-2">
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[normalizedAngle]}
                      onValueChange={([v]) => setAngle(v)}
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      {Math.round(normalizedAngle)}°
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button
                      onClick={() => {
                        setImageSrc(null);
                        setAngle(0);
                      }}
                      className="flex-1 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors text-center"
                    >
                      Upload another
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

export default RotateImageWorkspace;
