import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_SLOTS, type AdPlacement } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  placement: AdPlacement;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: CSSProperties;
  label?: string;
  variant?: "banner" | "compact" | "sidebar";
}

/**
 * Google AdSense responsive ad slot.
 * The publisher ID is loaded via the script in index.html.
 * Use `src/lib/adsense.ts` to wire real AdSense slot IDs.
 */
const AdSlot = ({
  placement,
  format = "auto",
  responsive = true,
  className = "",
  style,
  label = "Advertisement",
  variant = "banner",
}: AdSlotProps) => {
  const pushed = useRef(false);
  const slot = ADSENSE_SLOTS[placement];
  const hasSlot = Boolean(slot);

  const wrapperClassName =
    variant === "sidebar"
      ? "w-full"
      : variant === "compact"
        ? "w-full my-6"
        : "w-full my-8";

  const containerClassName =
    variant === "sidebar"
      ? "w-full"
      : "mx-auto w-full max-w-5xl px-4";

  const minHeight =
    style?.minHeight ??
    (variant === "sidebar" ? "250px" : variant === "compact" ? "90px" : "90px");

  useEffect(() => {
    if (pushed.current || !hasSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Silently ignore — AdSense may be blocked or not yet loaded
    }
  }, [hasSlot]);

  if (!hasSlot) {
    return (
      <div className={`${wrapperClassName} ${className}`}>
        <div className={containerClassName}>
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <div
            className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 text-center text-xs text-muted-foreground"
            style={{ minHeight, ...style }}
          >
            Ad placement
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${wrapperClassName} ${className}`}>
      <div className={containerClassName}>
        <p className="text-xs text-muted-foreground text-center mb-2 uppercase tracking-wide">
          {label}
        </p>
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight, ...style }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AdSlot;
