export const ADSENSE_CLIENT_ID =
  import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "ca-pub-2792270543219767";

export const ADSENSE_SLOTS = {
  header: import.meta.env.VITE_ADSENSE_SLOT_HEADER ?? "",
  inContent: import.meta.env.VITE_ADSENSE_SLOT_IN_CONTENT ?? "",
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR ?? "",
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? "",
  mobile: import.meta.env.VITE_ADSENSE_SLOT_MOBILE ?? "",
} as const;

export type AdPlacement = keyof typeof ADSENSE_SLOTS;

