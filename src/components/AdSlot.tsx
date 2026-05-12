import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  label?: string;
  className?: string;
  /** AdSense slot id, when configured */
  slot?: string;
  /**
   * AdSense-safe gating. The slot only renders when:
   *  - the page reports `ready` (no loading/error/404 states),
   *  - and `minWords` of publisher content exist on the page.
   * This prevents Google's "ads on screens without publisher content"
   * and "low-value content" violations.
   */
  ready?: boolean;
  minWords?: number;
}

const isLowValueRoute = () => {
  if (typeof window === "undefined") return false;
  const p = window.location.pathname;
  return p === "/404" || p.startsWith("/tool-status") || p === "/_loading";
};

const getPageWordCount = () => {
  if (typeof document === "undefined") return 0;
  const main = document.querySelector("main") ?? document.body;
  const text = (main?.innerText ?? "").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(" ").length;
};

/**
 * Reserved ad container. Only renders the placeholder/ad when the page
 * has enough publisher content. AdSense ad markup (<ins class="adsbygoogle">)
 * should be injected here once approval is granted.
 */
const AdSlot = ({
  label = "Advertisement",
  className = "",
  slot,
  ready = true,
  minWords = 700,
}: AdSlotProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!ready || isLowValueRoute()) {
      setAllowed(false);
      return;
    }
    // Defer to next frame so the surrounding content has rendered
    // before counting words.
    const id = window.requestAnimationFrame(() => {
      setAllowed(getPageWordCount() >= minWords);
    });
    return () => window.cancelAnimationFrame(id);
  }, [ready, minWords]);

  if (!allowed) return null;

  return (
    <aside
      ref={ref}
      aria-label={label}
      data-ad-slot={slot}
      className={`w-full max-w-3xl mx-auto my-10 min-h-[100px] rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center text-xs uppercase tracking-wider text-muted-foreground ${className}`}
    >
      {label}
    </aside>
  );
};

export default AdSlot;
