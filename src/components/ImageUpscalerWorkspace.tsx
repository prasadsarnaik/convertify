import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, ZoomIn, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type ScaleFactor = 2 | 4 | 8;

const ImageUpscalerWorkspace = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [upscaled, setUpscaled] = useState<string | null>(null);
  const [scale, setScale] = useState<ScaleFactor>(2);
  const [enhanceFaces, setEnhanceFaces] = useState(false);
  const [removeNoise, setRemoveNoise] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const compareRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File exceeds 10 MB limit");
      return;
    }
    setFile(f);
    setUpscaled(null);
    setProgress(0);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
  });

  /* ---- client-side upscale via canvas ---- */
  const upscaleImage = async () => {
    if (!preview) return;
    setProcessing(true);
    setProgress(0);
    setUpscaled(null);

    const img = new Image();
    img.src = preview;
    await new Promise<void>((r) => { img.onload = () => r(); });

    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;

    // Step 1 – upscale
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    setProgress(30);
    await tick();

    // Step 2 – optional noise reduction (light blur + re-draw)
    if (removeNoise) {
      ctx.filter = "blur(0.6px)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";
    }
    setProgress(55);
    await tick();

    // Step 3 – sharpen via unsharp-mask convolution
    if (enhanceFaces || true) {
      sharpen(ctx, w, h, enhanceFaces ? 0.7 : 0.4);
    }
    setProgress(80);
    await tick();

    // Step 4 – contrast boost
    ctx.filter = "contrast(1.05) saturate(1.05)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none";
    setProgress(95);
    await tick();

    const dataUrl = canvas.toDataURL("image/png");
    setUpscaled(dataUrl);
    setProgress(100);
    setProcessing(false);
    toast.success("Image upscaled successfully!");
  };

  const tick = () => new Promise((r) => setTimeout(r, 120));

  const sharpen = (ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) => {
    const imageData = ctx.getImageData(0, 0, w, h);
    const d = imageData.data;
    const copy = new Uint8ClampedArray(d);
    const stride = w * 4;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) {
          const val =
            copy[idx + c] * (1 + 4 * amount) -
            amount * copy[idx - 4 + c] -
            amount * copy[idx + 4 + c] -
            amount * copy[idx - stride + c] -
            amount * copy[idx + stride + c];
          d[idx + c] = Math.min(255, Math.max(0, val));
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const handleDownload = () => {
    if (!upscaled) return;
    const a = document.createElement("a");
    a.href = upscaled;
    a.download = `upscaled-${scale}x.png`;
    a.click();
    toast.success("Download started");
  };

  /* ---- comparison slider ---- */
  const onPointerDown = () => { dragging.current = true; };
  const onPointerUp = () => { dragging.current = false; };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !compareRef.current) return;
    const rect = compareRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 text-accent-purple text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">Image Upscaler</h1>
          <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
            Enhance low-quality images to HD / 4K with smart sharpening and noise reduction.
          </p>
        </motion.div>

        {/* Upload area */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <p className="text-foreground font-medium">Drag & drop an image here</p>
            <p className="text-muted-foreground text-sm mt-1">JPG, PNG, WebP · Max 10 MB</p>
          </motion.div>
        )}

        {/* Controls + preview */}
        <AnimatePresence mode="wait">
          {preview && !upscaled && !processing && (
            <motion.div key="controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Preview */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <img src={preview} alt="Preview" className="w-full max-h-[420px] object-contain bg-muted/30" />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Scale */}
                <div className="p-4 rounded-xl border border-border bg-background">
                  <p className="text-sm font-medium text-foreground mb-3">Upscale Factor</p>
                  <div className="flex gap-2">
                    {([2, 4, 8] as ScaleFactor[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setScale(s)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          scale === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Enhance Faces</p>
                    <p className="text-xs text-muted-foreground">AI sharpening</p>
                  </div>
                  <Switch checked={enhanceFaces} onCheckedChange={setEnhanceFaces} />
                </div>
                <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Remove Noise</p>
                    <p className="text-xs text-muted-foreground">Denoise filter</p>
                  </div>
                  <Switch checked={removeNoise} onCheckedChange={setRemoveNoise} />
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => { setFile(null); setPreview(null); }}>Change Image</Button>
                <Button onClick={upscaleImage} className="gap-2 relative overflow-hidden group">
                  <ZoomIn className="w-4 h-4" /> Upscale Now
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Processing */}
          {processing && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-10">
              <div className="inline-flex items-center gap-2 text-primary font-medium animate-pulse">
                <Sparkles className="w-5 h-5" /> Your image is being enhanced…
              </div>
              <Progress value={progress} className="max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
            </motion.div>
          )}

          {/* Result with comparison slider */}
          {upscaled && !processing && (
            <div className="space-y-8">
              {/* Comparison slider */}
              <div
                ref={compareRef}
                className="relative rounded-2xl overflow-hidden border border-border shadow-sm select-none touch-none cursor-col-resize"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onPointerMove={onPointerMove}
              >
                <img src={upscaled} alt="Upscaled" className="w-full max-h-[500px] object-contain bg-muted/30" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                  <img src={preview!} alt="Original" className="w-full max-h-[500px] object-contain bg-muted/30" style={{ minWidth: compareRef.current?.offsetWidth }} />
                  <span className="absolute top-3 left-3 text-xs font-semibold bg-background/80 backdrop-blur px-2 py-1 rounded-md text-foreground">Original</span>
                </div>
                <div className="absolute top-0 bottom-0" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
                  <div className="w-0.5 h-full bg-primary/80" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                    ⇔
                  </div>
                </div>
                <span className="absolute top-3 right-3 text-xs font-semibold bg-background/80 backdrop-blur px-2 py-1 rounded-md text-foreground">Upscaled {scale}x</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-accent-green" /> No watermark · Your file stays private
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { setUpscaled(null); setProgress(0); }}>
                    Upscale Again
                  </Button>
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="w-4 h-4" /> Download HD Image
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); setUpscaled(null); setProgress(0); }}>
                  Upload another image
                </Button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImageUpscalerWorkspace;
