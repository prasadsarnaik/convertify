import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  size?: "sm" | "lg";
}

const ThemeToggle = ({ size = "lg" }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const isLg = size === "lg";
  const W = isLg ? 76 : 52;
  const H = isLg ? 36 : 28;
  const THUMB = isLg ? 28 : 22;
  const PAD = (H - THUMB) / 2;
  const TRAVEL = W - THUMB - PAD * 2;

  return (
    <motion.button
      onClick={() => setIsDark((p) => !p)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.94 }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        boxShadow: isDark
          ? isHovered
            ? "0 0 24px hsl(258 100% 65% / 0.55), 0 0 48px hsl(211 100% 50% / 0.35), inset 0 1px 1px hsl(0 0% 100% / 0.06)"
            : "0 0 14px hsl(258 100% 65% / 0.35), 0 0 28px hsl(211 100% 50% / 0.2), inset 0 1px 1px hsl(0 0% 100% / 0.06)"
          : isHovered
            ? "0 6px 20px hsl(37 100% 52% / 0.25), 0 0 30px hsl(37 100% 52% / 0.18), inset 0 1px 1px hsl(0 0% 100% / 0.8)"
            : "0 2px 12px hsl(0 0% 0% / 0.06), inset 0 1px 1px hsl(0 0% 100% / 0.8)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative cursor-pointer rounded-full overflow-hidden backdrop-blur-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        width: W,
        height: H,
        background: isDark
          ? "linear-gradient(135deg, hsl(240 6% 8%) 0%, hsl(240 8% 12%) 100%)"
          : "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(240 10% 96%) 100%)",
        borderColor: isDark ? "hsl(258 50% 30% / 0.4)" : "hsl(240 6% 88%)",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {/* Ambient breathing glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: isDark
            ? "radial-gradient(circle at 70% 50%, hsl(258 100% 65% / 0.18), transparent 70%)"
            : "radial-gradient(circle at 30% 50%, hsl(37 100% 52% / 0.18), transparent 70%)",
        }}
      />

      {/* Floating stars (dark mode only) */}
      <AnimatePresence>
        {isDark &&
          [
            { x: 14, y: 8, d: 0 },
            { x: 26, y: 22, d: 0.6 },
            { x: 38, y: 12, d: 1.2 },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: s.x,
                top: s.y,
                width: 2,
                height: 2,
                background: "hsl(258 100% 80%)",
                boxShadow: "0 0 4px hsl(258 100% 75%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0, 1, 0.7, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Light beam during transition */}
      <motion.div
        key={`beam-${isDark}`}
        className="absolute top-0 bottom-0 w-8 pointer-events-none"
        initial={{ x: isDark ? -20 : W, opacity: 0.9 }}
        animate={{ x: isDark ? W : -20, opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, hsl(258 100% 75% / 0.5), transparent)"
            : "linear-gradient(90deg, transparent, hsl(37 100% 65% / 0.55), transparent)",
          filter: "blur(4px)",
        }}
      />

      {/* Thumb */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        animate={{ x: isDark ? TRAVEL : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.8 }}
        style={{
          width: THUMB,
          height: THUMB,
          top: PAD,
          left: PAD,
          background: isDark
            ? "linear-gradient(135deg, hsl(240 6% 18%), hsl(240 6% 10%))"
            : "linear-gradient(135deg, hsl(0 0% 100%), hsl(45 80% 96%))",
          boxShadow: isDark
            ? "0 2px 8px hsl(0 0% 0% / 0.5), 0 0 12px hsl(258 100% 65% / 0.4), inset 0 1px 1px hsl(0 0% 100% / 0.1)"
            : "0 2px 8px hsl(37 100% 50% / 0.3), 0 0 14px hsl(37 100% 60% / 0.4), inset 0 1px 1px hsl(0 0% 100% / 0.9)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <Moon
                className="text-foreground"
                size={isLg ? 15 : 12}
                style={{ filter: "drop-shadow(0 0 3px hsl(258 100% 75% / 0.8))" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <Sun
                size={isLg ? 16 : 13}
                style={{
                  color: "hsl(37 100% 50%)",
                  filter: "drop-shadow(0 0 4px hsl(37 100% 60% / 0.9))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
