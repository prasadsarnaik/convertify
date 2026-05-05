interface AdSlotProps {
  label?: string;
  className?: string;
  /** AdSense slot id, when configured */
  slot?: string;
}

/**
 * Reserved ad container. Renders a neutral placeholder until AdSense
 * approval is granted; once approved, swap inner content for the real
 * <ins class="adsbygoogle" /> markup using the provided slot id.
 */
const AdSlot = ({ label = "Advertisement", className = "", slot }: AdSlotProps) => (
  <aside
    aria-label={label}
    data-ad-slot={slot}
    className={`w-full max-w-3xl mx-auto my-10 min-h-[100px] rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center text-xs uppercase tracking-wider text-muted-foreground ${className}`}
  >
    {label}
  </aside>
);

export default AdSlot;
