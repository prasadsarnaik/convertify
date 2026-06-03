import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

/**
 * Google AdSense responsive ad slot.
 * Publisher ID is loaded via the script in index.html (ca-pub-2792270543219767).
 * Pass a real `slot` ID (created in your AdSense dashboard) to display ads.
 */
const AdSlot = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
  label = "Advertisement",
}: AdSlotProps) => {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Silently ignore — AdSense may be blocked or not yet loaded
    }
  }, []);

  return (
    <div className={`w-full my-8 ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wide">
          {label}
        </p>
        <ins
          className="adsbygoogle block"
          style={{ display: "block", ...style }}
          data-ad-client="ca-pub-2792270543219767"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AdSlot;
