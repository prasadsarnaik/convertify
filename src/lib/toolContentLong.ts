import type { ToolMeta } from "./toolContent";

/**
 * Long-form, per-tool content used to push every tool page over 700+
 * unique words and satisfy AdSense "thin content" requirements.
 *
 * These sections are rendered by `ToolContent` below the workspace.
 */
export interface ToolLongForm {
  /** Two opening paragraphs that go beyond the short `intro` blurb. */
  body: [string, string];
  /** Concrete product features (8 items recommended). */
  features: string[];
  /** Real-world scenarios where the tool helps (5 items). */
  useCases: string[];
  /** Reasons the workflow is private and safe (4 items). */
  privacy: string[];
  /** Extra long-tail FAQs appended to the common ones. */
  extraFaqs: { q: string; a: string }[];
}

const generic = (name: string, verb: string): ToolLongForm => ({
  body: [
    `${name} on Convertify is a free online utility built to make working with your documents fast, private and friction-free. Instead of installing desktop software or signing up for an account, you simply open the page, drop in your file and ${verb} it directly inside your browser. The processing happens locally on your device, which means your documents never travel across the internet, are never written to a server, and are never visible to us or to anyone else.`,
    `We built Convertify because the web is full of file converters that bury the actual tool under ads, paywalls, e-mail capture forms and watermarks. ${name} avoids all of that. There is no daily quota, no "premium" upgrade, no account wall. You can use it as many times as you like on as many devices as you like, including phones, tablets, Chromebooks and older laptops. Everything you need to ${verb} a file is right on this page.`,
  ],
  features: [
    "Runs entirely in your browser — nothing is uploaded to a server",
    "Works on Windows, macOS, Linux, Android, iOS and ChromeOS",
    "No registration, no email, no credit card, no watermark",
    "Drag-and-drop interface with mobile-friendly tap-to-upload",
    "Handles small documents and large files with equal ease",
    "Instant download — no waiting in a processing queue",
    "Clean output that opens in any modern reader or editor",
    "Free forever, with no daily or monthly usage limits",
  ],
  useCases: [
    `Students preparing assignments who need to ${verb} their work before submission`,
    "Freelancers and consultants sending finished deliverables to clients",
    "Small business owners who handle invoices, contracts and receipts",
    "Office workers cleaning up scanned paperwork and shared files",
    "Anyone who needs a quick fix without installing extra software",
  ],
  privacy: [
    "Your file is opened, processed and saved entirely on your device",
    "Convertify does not log, store or share the content of your documents",
    "The site is served over HTTPS to keep the connection encrypted",
    "Closing the tab clears the file from memory immediately",
  ],
  extraFaqs: [
    {
      q: `How long does ${name} take?`,
      a: `Most files finish in a few seconds. Larger documents may take a little longer because all of the work is done by your device's processor — but you never wait for an upload or a server queue.`,
    },
    {
      q: `Is there a file size limit on ${name}?`,
      a: `There is no hard server-side limit. The practical limit is the amount of free memory on your device. On modern phones and laptops you can comfortably ${verb} files of several hundred megabytes.`,
    },
    {
      q: `Can I use ${name} offline?`,
      a: `You need an internet connection to load the page once, but the actual processing does not require the network. If your connection drops mid-task, ${name} will still finish.`,
    },
  ],
});

// Tool-specific overrides where the generic copy needs sharpening.
const overrides: Partial<Record<string, Partial<ToolLongForm>>> = {
  "merge-pdf": {
    features: [
      "Combine an unlimited number of PDF files into one document",
      "Drag and drop pages to control the final order before export",
      "Preserve original quality, fonts and embedded images",
      "Mix scanned PDFs with born-digital PDFs without re-rendering",
      "Process locally — your contracts and reports never leave the browser",
      "Works on phones, tablets and desktops with the same interface",
      "Output a single, clean PDF that opens in any reader",
      "No watermarks, no compression, no surprise page limits",
    ],
    useCases: [
      "Joining a cover letter, CV and portfolio into one application file",
      "Merging signed contract pages back together after e-signing",
      "Combining bank statements or invoices for tax filing",
      "Stitching scanned chapters of a book or report into one PDF",
      "Bundling slide handouts and notes into a single deliverable",
    ],
  },
  "compress-pdf": {
    features: [
      "Smart image down-sampling that keeps text sharp",
      "Removes redundant metadata and embedded thumbnails",
      "Multiple compression levels — from light to aggressive",
      "Side-by-side before/after size comparison",
      "Local processing keeps confidential PDFs private",
      "Handles scans, vector PDFs and mixed-content documents",
      "Outputs standard PDF 1.7 files that open everywhere",
      "Free with no daily limit on file size or count",
    ],
  },
  "split-pdf": {
    features: [
      "Pull single pages, page ranges or a custom selection",
      "Split into fixed-size chunks (e.g. every 10 pages)",
      "Visual page thumbnails so you can pick exactly what you need",
      "Reorder selected pages before exporting",
      "Original quality preserved — no re-rendering or recompression",
      "Bulk download as a ZIP when splitting into many files",
      "Runs locally so private documents stay on your device",
      "No upload, no queue, no watermark on the output",
    ],
  },
  "pdf-to-word": {
    features: [
      "Extracts real text — not images of text",
      "Preserves paragraph order and basic heading structure",
      "Outputs a standard .docx that opens in Word, Google Docs or Pages",
      "Detects headings on the first page and applies Heading 1 styling",
      "Skips OCR fees — works on born-digital PDFs instantly",
      "Local conversion keeps sensitive contracts off our servers",
      "Free with no daily quota or watermark",
      "Works on mobile so you can convert on the go",
    ],
  },
  "word-to-pdf": {
    features: [
      "Renders DOCX with fonts, images and layout intact",
      "Outputs A4 pages that print and share predictably",
      "No Microsoft Word installation required",
      "Handles tables, lists, bold/italic and embedded pictures",
      "Refuses legacy .doc files instead of producing a broken PDF",
      "Files are processed locally — no cloud upload",
      "Works on any modern browser, including mobile Safari and Chrome",
      "Free, unlimited and watermark-free",
    ],
  },
};

export const getToolLongForm = (meta: ToolMeta): ToolLongForm => {
  const base = generic(meta.name, inferVerb(meta));
  const override = overrides[meta.slug];
  return override ? { ...base, ...override } : base;
};

const inferVerb = (meta: ToolMeta) => {
  if (meta.slug.includes("merge")) return "merge";
  if (meta.slug.includes("split")) return "split";
  if (meta.slug.includes("compress")) return "compress";
  if (meta.slug.includes("rotate")) return "rotate";
  if (meta.slug.includes("protect")) return "protect";
  if (meta.slug.includes("unlock")) return "unlock";
  if (meta.slug.includes("sign")) return "sign";
  if (meta.slug.includes("edit")) return "edit";
  if (meta.slug.includes("upscale")) return "upscale";
  if (meta.slug.includes("resize")) return "resize";
  return "convert";
};
