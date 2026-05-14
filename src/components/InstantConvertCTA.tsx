import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

interface Props {
  to: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

/**
 * Apple Dynamic Island inspired CTA.
 * - Black capsule, breathing glow, animated live dot
 * - Magnetic hover, expand-on-hover reveals format list
 * - Animated gradient border beam, premium glass shadow
 */
const InstantConvertCTA = ({ to, onClick, fullWidth = false }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Magnetic effect (desktop only — disabled when fullWidth/mobile)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(x, (v) => `${v}px`);
  const ty = useTransform(y, (v) => `${v}px`);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (fullWidth) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * 0.18);
    my.set((e.clientY - cy) * 0.22);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      style={{ x: tx, y: ty }}
      className={fullWidth ? "w-full" : "relative"}
    >
      {/* Breathing purple glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, hsl(270 90% 65% / 0.55), hsl(265 90% 55% / 0.25) 60%, transparent 75%)",
        }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <Link
        ref={ref}
        to={to}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className={`group relative z-[1] flex items-center justify-center overflow-hidden rounded-full bg-black text-white shadow-[0_8px_28px_-6px_rgba(124,58,237,0.55),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 ${
          fullWidth ? "w-full px-5 py-3 text-base" : "px-4 py-2 text-sm"
        }`}
        style={{
          transition: "width 0.45s cubic-bezier(0.32,0.72,0,1), padding 0.45s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Animated gradient border beam */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full p-px opacity-90"
          style={{
            background:
              "conic-gradient(from var(--beam-angle,0deg), transparent 0deg, hsl(270 100% 75%) 60deg, hsl(280 100% 70%) 120deg, transparent 180deg, transparent 360deg)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: "beam-spin 4s linear infinite",
          }}
        />

        {/* Subtle inner highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/15 to-transparent"
        />

        {/* Live breathing dot */}
        <span className="relative mr-2 flex h-2 w-2 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-purple-300 to-fuchsia-500 shadow-[0_0_8px_2px_rgba(192,132,252,0.85)]" />
        </span>

        {/* Default label */}
        <motion.span
          className="relative whitespace-nowrap font-bold tracking-tight"
          animate={{ opacity: hovered && !fullWidth ? 0 : 1, y: hovered && !fullWidth ? -2 : 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        >
          ⚡ Instant Convert
        </motion.span>

        {/* Hover-revealed expanded label (desktop) */}
        <AnimatePresence>
          {hovered && !fullWidth && (
            <motion.span
              key="expanded"
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 10 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="relative overflow-hidden whitespace-nowrap text-xs font-medium text-white/85"
            >
              PDF • Word • JPG • PNG
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      <style>{`
        @property --beam-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes beam-spin {
          to { --beam-angle: 360deg; }
        }
      `}</style>
    </motion.div>
  );
};

export default InstantConvertCTA;
