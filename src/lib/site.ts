export interface SiteRoute {
  path: string;
  title: string;
  description: string;
  priority: string;
  changeFrequency: "daily" | "weekly" | "monthly";
}

export interface ToolSeoContent {
  slug: string;
  name: string;
  category: "PDF" | "Image" | "Document";
  metaDescription: string;
  heroDescription: string;
  summary: string;
  howTo: string[];
  benefits: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const DEFAULT_SITE_URL = "https://convertifyall.com";

export const siteConfig = {
  name: "Convertify",
  siteUrl: (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, ""),
  supportEmail: "support@convertifyall.com",
  tagline: "Free PDF, image, and document tools that run in your browser.",
  defaultTitle: "Free PDF, Image & Document Tools Online",
  defaultDescription:
    "Convert, merge, compress, sign, resize, and optimize PDF, image, and document files online with practical browser-based tools.",
  ogImagePath: "/og-image.svg",
  lastUpdated: "April 29, 2026",
};

export function getAbsoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.siteUrl}/`).toString();
}

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    title: "Free PDF, Image & Document Tools Online",
    description: siteConfig.defaultDescription,
    priority: "1.0",
    changeFrequency: "weekly",
  },
  {
    path: "/tools",
    title: "All File Tools",
    description: "Browse all Convertify tools for PDFs, images, and document conversion.",
    priority: "0.9",
    changeFrequency: "weekly",
  },
  {
    path: "/features",
    title: "Features",
    description: "Learn what makes Convertify fast, private, and easy to use across devices.",
    priority: "0.7",
    changeFrequency: "monthly",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description: "See how to upload, process, and download files with Convertify in three steps.",
    priority: "0.7",
    changeFrequency: "monthly",
  },
  {
    path: "/about",
    title: "About",
    description: "Learn about Convertify and its approach to browser-based file tools.",
    priority: "0.6",
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Contact Convertify for questions, support, and feedback.",
    priority: "0.5",
    changeFrequency: "monthly",
  },
  {
    path: "/tool-status",
    title: "Tool Status",
    description: "Check the current implementation status of Convertify PDF and image tools.",
    priority: "0.5",
    changeFrequency: "weekly",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "Read the Convertify privacy policy and file handling details.",
    priority: "0.3",
    changeFrequency: "monthly",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms & Conditions",
    description: "Read the terms and conditions for using Convertify.",
    priority: "0.3",
    changeFrequency: "monthly",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer",
    description: "Review the Convertify disclaimer and service limitations.",
    priority: "0.3",
    changeFrequency: "monthly",
  },
  {
    path: "/sitemap",
    title: "HTML Sitemap",
    description: "Browse the main pages and tool pages available on Convertify.",
    priority: "0.3",
    changeFrequency: "monthly",
  },
];

export const toolSeoContent: ToolSeoContent[] = [
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    category: "Document",
    metaDescription: "Convert Word files to PDF online with a fast browser-based Word to PDF tool.",
    heroDescription: "Convert DOC and DOCX files into PDF online without installing desktop software.",
    summary:
      "Convertify makes it easy to turn Word documents into PDFs for sharing, printing, and archiving. The tool is built for quick one-off conversions and simple document workflows.",
    howTo: [
      "Upload your DOC or DOCX file from your device.",
      "Start the conversion and let the tool generate a PDF version.",
      "Download the finished PDF and review the layout before sharing.",
    ],
    benefits: [
      "Useful for sharing documents in a format that is easier to open consistently.",
      "Keeps a simple workflow for resumes, reports, and internal drafts.",
      "Runs in the browser, so there is no desktop install step.",
    ],
    faqs: [
      {
        question: "What Word formats are supported?",
        answer: "The tool is intended for standard DOC and DOCX uploads.",
      },
      {
        question: "Should I check the converted file?",
        answer: "Yes. Complex layouts, fonts, and tables should always be reviewed after conversion.",
      },
      {
        question: "Does this work on mobile?",
        answer: "Yes, as long as your browser can upload the source document.",
      },
    ],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    category: "Document",
    metaDescription: "Convert PDF files to editable Word documents online with Convertify.",
    heroDescription: "Turn PDF files into editable Word documents directly in your browser.",
    summary:
      "Use the PDF to Word tool when you need to extract text and continue editing in Word-compatible formats. It is suited to simple documents that need updates, reuse, or review.",
    howTo: [
      "Upload the PDF file you want to convert.",
      "Start the conversion and wait for the editable output to be prepared.",
      "Download the Word document and check formatting around headings, tables, and images.",
    ],
    benefits: [
      "Helpful for editing content that started as a PDF.",
      "Keeps document updates faster than rebuilding a file from scratch.",
      "Works from the browser without requiring a desktop editor to start.",
    ],
    faqs: [
      {
        question: "Will the formatting match perfectly?",
        answer: "Not always. PDFs with complex layouts should be reviewed carefully after conversion.",
      },
      {
        question: "Is this best for scanned PDFs?",
        answer: "Scanned PDFs are harder to convert cleanly and may need extra review.",
      },
      {
        question: "Can I use it for one-off edits?",
        answer: "Yes. It is well suited to quickly recovering editable text from simpler PDFs.",
      },
    ],
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    category: "PDF",
    metaDescription: "Merge PDF files online for free with a browser-based PDF combiner.",
    heroDescription: "Combine multiple PDF files into a single PDF document in a few clicks.",
    summary:
      "Merge PDF is useful when you need one clean file from several reports, scans, or form exports. It helps with sharing, storing, and printing multi-part documents.",
    howTo: [
      "Upload two or more PDF files in the order you want them combined.",
      "Review the list and remove any file you do not want in the output.",
      "Run the merge and download the combined PDF.",
    ],
    benefits: [
      "Creates one shareable file instead of many separate PDFs.",
      "Useful for invoices, contracts, reports, and application documents.",
      "Runs in the browser without sending you through a long workflow.",
    ],
    faqs: [
      {
        question: "How many PDFs can I combine?",
        answer: "You can merge multiple PDFs in one session, subject to device memory limits.",
      },
      {
        question: "Does file order matter?",
        answer: "Yes. Upload files in the order you want them to appear in the final PDF.",
      },
      {
        question: "Will a watermark be added?",
        answer: "No. The output is intended to stay clean and usable.",
      },
    ],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    category: "PDF",
    metaDescription: "Split PDF pages online by page range with Convertify.",
    heroDescription: "Extract selected pages from a PDF and download them as separate files.",
    summary:
      "Split PDF helps when you only need a portion of a larger document. It is useful for sharing selected pages, isolating sections, or breaking up oversized PDFs.",
    howTo: [
      "Upload a PDF file from your device.",
      "Enter the page range you want to extract, such as 1-3,5,7.",
      "Run the split and download the resulting ZIP of page files.",
    ],
    benefits: [
      "Makes large PDF files easier to share in smaller parts.",
      "Helpful for extracting only the pages that matter.",
      "Simple for document review, submissions, and archival workflows.",
    ],
    faqs: [
      {
        question: "Can I split several page ranges at once?",
        answer: "Yes. Use comma-separated ranges when supported by the page range field.",
      },
      {
        question: "What format is returned?",
        answer: "The current workflow returns a ZIP file containing extracted PDF pages.",
      },
      {
        question: "Do I need to install anything?",
        answer: "No. The split workflow runs in the browser.",
      },
    ],
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    category: "PDF",
    metaDescription: "Reduce PDF file size online with a fast PDF compression tool.",
    heroDescription: "Compress PDF files online to make them easier to store, upload, and email.",
    summary:
      "Compress PDF is designed for reducing file size so documents are easier to send and store. It is especially useful for email attachments, upload limits, and lower-bandwidth sharing.",
    howTo: [
      "Upload the PDF file you want to compress.",
      "Let the tool optimize the file and calculate the output size.",
      "Download the smaller PDF and compare the result if needed.",
    ],
    benefits: [
      "Helps fit PDFs under email and portal upload limits.",
      "Makes large documents easier to store and share.",
      "Gives a quick browser-based option for routine file cleanup.",
    ],
    faqs: [
      {
        question: "How much smaller will my PDF get?",
        answer: "Savings depend on the source file. Results vary by content, images, and embedded data.",
      },
      {
        question: "Will text stay readable?",
        answer: "The goal is to keep the document usable, but you should review important files after compression.",
      },
      {
        question: "Can I compress multiple PDFs together?",
        answer: "The current flow focuses on one PDF at a time for simpler output handling.",
      },
    ],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    category: "PDF",
    metaDescription: "Convert PDF pages to JPG images online with Convertify.",
    heroDescription: "Export PDF pages as JPG images for presentations, previews, and image-based workflows.",
    summary:
      "PDF to JPG is useful when you need individual pages as images instead of a document. That can help with previews, presentations, uploads, or design review.",
    howTo: [
      "Upload the PDF file you want to convert.",
      "Start the conversion to render each page as a JPG image.",
      "Download the ZIP archive containing the output images.",
    ],
    benefits: [
      "Makes PDF pages easier to reuse in visual workflows.",
      "Useful for thumbnails, slides, and image-based sharing.",
      "Keeps the export flow simple for multipage PDFs.",
    ],
    faqs: [
      {
        question: "Will each page become a separate image?",
        answer: "Yes. The current tool exports page images in a ZIP archive.",
      },
      {
        question: "Is this good for screenshots of documents?",
        answer: "Yes. It is a practical way to turn full pages into image assets.",
      },
      {
        question: "Can I use the output for design review?",
        answer: "Yes. Converting pages to images is often useful for quick visual review and markup.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    category: "PDF",
    metaDescription: "Convert JPG images to PDF online and combine multiple images into one document.",
    heroDescription: "Turn JPG photos and scans into a PDF file from your browser.",
    summary:
      "JPG to PDF helps when you want a stack of images in a document format that is easier to print, store, and share. It is useful for scanned paperwork, receipts, and image-based reports.",
    howTo: [
      "Upload one or more JPG images from your device.",
      "Arrange the images in the order you want inside the PDF.",
      "Create the PDF and download the final document.",
    ],
    benefits: [
      "Converts loose image files into one portable document.",
      "Useful for scans, receipts, and photo-based submissions.",
      "Works well when you need a print-ready document quickly.",
    ],
    faqs: [
      {
        question: "Can I add more than one image?",
        answer: "Yes. Multiple images can be combined into a single PDF.",
      },
      {
        question: "Does order matter?",
        answer: "Yes. Arrange images in the order you want them to appear in the output PDF.",
      },
      {
        question: "Is this only for JPG files?",
        answer: "This route is optimized for JPG-based input. Convertify also has a broader Image to PDF tool.",
      },
    ],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    category: "PDF",
    metaDescription: "Rotate PDF pages online with Convertify.",
    heroDescription: "Fix sideways or upside-down PDF pages in a quick browser-based workflow.",
    summary:
      "Rotate PDF is meant for correcting document orientation before sharing or printing. It is especially helpful for scans, forms, and smartphone-generated PDFs.",
    howTo: [
      "Upload the PDF file you want to fix.",
      "Choose the rotation angle that matches your document.",
      "Apply the change and download the corrected PDF.",
    ],
    benefits: [
      "Fixes scanning and export mistakes quickly.",
      "Improves readability before printing or sharing.",
      "Avoids reopening the document in heavier desktop software.",
    ],
    faqs: [
      {
        question: "Can I rotate a PDF by 90 or 180 degrees?",
        answer: "Yes. Common rotation angles are supported in the tool options.",
      },
      {
        question: "Is this useful for scanned paperwork?",
        answer: "Yes. It is a common fix for scanner and phone-capture orientation issues.",
      },
      {
        question: "Do I need a PDF editor for this?",
        answer: "No. The browser-based tool handles the basic rotation workflow.",
      },
    ],
  },
  {
    slug: "edit-pdf",
    name: "Edit PDF",
    category: "PDF",
    metaDescription: "Edit PDF files online with basic browser-based PDF editing tools.",
    heroDescription: "Make quick PDF edits, annotations, and adjustments without opening a desktop editor.",
    summary:
      "Edit PDF is built for lightweight PDF updates such as quick markup, overlays, and simple adjustments. It is meant for practical browser-side editing rather than full publishing workflows.",
    howTo: [
      "Upload the PDF you want to modify.",
      "Apply the available edits or annotations in the workspace.",
      "Export the updated PDF and verify the final file.",
    ],
    benefits: [
      "Useful for quick document changes and markups.",
      "Faster than opening a full desktop tool for minor edits.",
      "Convenient for review, signatures, and lightweight changes.",
    ],
    faqs: [
      {
        question: "Is this a full desktop-style PDF editor?",
        answer: "No. It is designed for practical browser-based editing tasks, not every advanced publishing feature.",
      },
      {
        question: "Should I keep the original file?",
        answer: "Yes. Always keep the original PDF for important documents.",
      },
      {
        question: "Can I use it for annotations?",
        answer: "Yes. The tool is appropriate for quick edits and visual markup workflows.",
      },
    ],
  },
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    category: "PDF",
    metaDescription: "Password protect PDF files online with Convertify.",
    heroDescription: "Add password protection to PDF files before sharing or storing them.",
    summary:
      "Protect PDF helps you add a basic security layer before sending or storing sensitive documents. It is useful for reports, internal files, and attachments that should not open freely.",
    howTo: [
      "Upload the PDF you want to protect.",
      "Enter the password or protection settings required by the tool.",
      "Generate the protected PDF and download the secured file.",
    ],
    benefits: [
      "Adds a straightforward access barrier to shared PDFs.",
      "Useful for attachments and stored documents with sensitive content.",
      "Keeps the protection workflow simple and browser based.",
    ],
    faqs: [
      {
        question: "Should I save the password somewhere secure?",
        answer: "Yes. If you lose the password, access to the protected document may be difficult.",
      },
      {
        question: "Is this useful for email attachments?",
        answer: "Yes. Password-protected PDFs are a common way to add a basic layer of protection.",
      },
      {
        question: "Can I remove the password later?",
        answer: "Convertify also provides an Unlock PDF workflow for compatible files.",
      },
    ],
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    category: "PDF",
    metaDescription: "Unlock password-protected PDF files online with Convertify.",
    heroDescription: "Remove PDF access restrictions from compatible files when you have the right to do so.",
    summary:
      "Unlock PDF is useful when you need to reopen or reuse a protected PDF that you are authorized to access. It is intended for legitimate recovery and workflow use cases.",
    howTo: [
      "Upload the protected PDF file.",
      "Provide the required password or follow the unlock flow for compatible files.",
      "Download the unlocked PDF after processing.",
    ],
    benefits: [
      "Makes authorized reuse of protected PDFs easier.",
      "Helpful for internal workflows where files were previously secured.",
      "Reduces the need for separate desktop tools for simple access recovery.",
    ],
    faqs: [
      {
        question: "Can I unlock any PDF?",
        answer: "No. You should only unlock files you are authorized to access, and compatibility can vary by file type.",
      },
      {
        question: "Do I need the original password?",
        answer: "For many protected PDFs, yes. The exact unlock flow depends on how the file was secured.",
      },
      {
        question: "Is this meant for legitimate use only?",
        answer: "Yes. Use it only on files you own or are explicitly allowed to process.",
      },
    ],
  },
  {
    slug: "sign-pdf",
    name: "Sign PDF",
    category: "PDF",
    metaDescription: "Sign PDF files online with a simple browser-based signature tool.",
    heroDescription: "Add a signature to PDF documents without printing and scanning them first.",
    summary:
      "Sign PDF is intended for practical document signing workflows such as approvals, acknowledgments, and simple agreements. It is best for quick turnaround when you need to mark a PDF and send it back.",
    howTo: [
      "Upload the PDF document that needs a signature.",
      "Create, draw, or place your signature in the document.",
      "Export and download the signed PDF.",
    ],
    benefits: [
      "Speeds up routine document signing workflows.",
      "Removes the print-sign-scan loop for many simple cases.",
      "Works well for internal approvals and lightweight paperwork.",
    ],
    faqs: [
      {
        question: "Can I add a signature without printing?",
        answer: "Yes. The tool is designed to place signatures directly into the PDF.",
      },
      {
        question: "Is this useful on mobile?",
        answer: "Yes. It can be useful on mobile devices for quick signing tasks.",
      },
      {
        question: "Should I review the final document?",
        answer: "Yes. Always confirm placement and page output before sharing the signed PDF.",
      },
    ],
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    category: "PDF",
    metaDescription: "Convert images to PDF online with Convertify.",
    heroDescription: "Combine one or more images into a PDF document for sharing, printing, and storage.",
    summary:
      "Image to PDF is a broader version of JPG to PDF that works well for mixed image uploads. It is useful for scans, screenshots, notes, and form photos that need to be packaged as one document.",
    howTo: [
      "Upload one or more supported image files.",
      "Arrange the images in the order you want in the PDF.",
      "Generate the document and download the resulting PDF.",
    ],
    benefits: [
      "Combines multiple image files into one easier-to-share document.",
      "Useful for scans, notes, receipts, and mixed-image uploads.",
      "Keeps PDF creation simple across different image formats.",
    ],
    faqs: [
      {
        question: "Can I combine multiple images into one PDF?",
        answer: "Yes. The tool is built for combining multiple uploaded images.",
      },
      {
        question: "Is this different from JPG to PDF?",
        answer: "Yes. Image to PDF is intended as the broader route for general image uploads.",
      },
      {
        question: "Can I use it for screenshots and scans?",
        answer: "Yes. It is well suited to those kinds of image-to-document workflows.",
      },
    ],
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    category: "Image",
    metaDescription: "Convert JPG images to PNG online with Convertify.",
    heroDescription: "Turn JPG files into PNG images in a quick browser-based format conversion flow.",
    summary:
      "JPG to PNG is useful when you need a PNG output for editing, publishing, or app workflows. It gives you a fast way to switch common image formats without opening a desktop editor.",
    howTo: [
      "Upload one or more JPG images.",
      "Run the conversion to create PNG output files.",
      "Download the converted PNG images.",
    ],
    benefits: [
      "Helps move images into PNG-based workflows quickly.",
      "Useful for design, documentation, and platform upload requirements.",
      "Works directly in the browser for simple file conversions.",
    ],
    faqs: [
      {
        question: "Can I convert multiple JPG files together?",
        answer: "Yes. The tool supports batch-style image conversion workflows.",
      },
      {
        question: "Why would I use PNG instead of JPG?",
        answer: "PNG is often preferred in workflows that need different handling of image quality and editing.",
      },
      {
        question: "Do I need image editing software?",
        answer: "No. The conversion flow runs in the browser.",
      },
    ],
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    category: "Image",
    metaDescription: "Convert PNG images to JPG online with Convertify.",
    heroDescription: "Turn PNG images into JPG files for smaller size and wider sharing compatibility.",
    summary:
      "PNG to JPG is useful when you need lighter image files or a more common sharing format. It is often used for uploads, email attachments, and web-ready image delivery.",
    howTo: [
      "Upload one or more PNG files.",
      "Convert them to JPG output in the browser.",
      "Download the finished JPG files.",
    ],
    benefits: [
      "Helpful for reducing file size in common cases.",
      "Useful for uploads where JPG is the expected format.",
      "Good for quick conversions without opening an editor.",
    ],
    faqs: [
      {
        question: "Why convert PNG to JPG?",
        answer: "JPG is commonly used for lighter file sizes and broad sharing compatibility.",
      },
      {
        question: "Can I convert several files at once?",
        answer: "Yes. Multiple PNG files can be processed in a batch workflow.",
      },
      {
        question: "Should I keep the original PNG?",
        answer: "Yes. Keep the original if it matters for future editing or archival quality.",
      },
    ],
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    category: "Image",
    metaDescription: "Convert WebP images to JPG online with Convertify.",
    heroDescription: "Change WebP images into JPG format for simpler sharing and compatibility.",
    summary:
      "WebP to JPG helps when a site, system, or recipient does not want WebP files. It provides a quick browser-based fallback into a more widely accepted image format.",
    howTo: [
      "Upload your WebP image files.",
      "Start the conversion to JPG format.",
      "Download the converted image files.",
    ],
    benefits: [
      "Useful when WebP is not accepted by older tools or upload forms.",
      "Helps standardize mixed image collections into one format.",
      "Keeps the conversion workflow lightweight and direct.",
    ],
    faqs: [
      {
        question: "Why convert WebP to JPG?",
        answer: "Some platforms and workflows still expect JPG instead of WebP.",
      },
      {
        question: "Can I process multiple files?",
        answer: "Yes. The tool supports converting multiple compatible image files.",
      },
      {
        question: "Is this browser based?",
        answer: "Yes. The conversion is designed to happen in the browser.",
      },
    ],
  },
  {
    slug: "avif-to-jpg",
    name: "AVIF to JPG",
    category: "Image",
    metaDescription: "Convert AVIF images to JPG online with Convertify.",
    heroDescription: "Convert AVIF images into JPG files when broader compatibility matters more than modern source format support.",
    summary:
      "AVIF to JPG helps when you receive AVIF files but need a format that more tools can open easily. It is useful for uploads, sharing, and older editing workflows.",
    howTo: [
      "Upload one or more AVIF images.",
      "Run the conversion workflow in the browser.",
      "Download the resulting JPG files.",
    ],
    benefits: [
      "Moves AVIF files into a more commonly accepted image format.",
      "Useful for compatibility across apps, websites, and devices.",
      "Good for quick one-off conversions without desktop tools.",
    ],
    faqs: [
      {
        question: "Why convert AVIF to JPG?",
        answer: "JPG is still more widely accepted across websites, apps, and older systems.",
      },
      {
        question: "Will browser support matter?",
        answer: "Yes. AVIF handling can depend on browser support and the source file.",
      },
      {
        question: "Can I use this for upload compatibility?",
        answer: "Yes. That is one of the most common reasons to convert AVIF files.",
      },
    ],
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    category: "Image",
    metaDescription: "Convert HEIC images to JPG online with Convertify.",
    heroDescription: "Turn HEIC photos into JPG files for easier sharing, uploads, and editing.",
    summary:
      "HEIC to JPG is especially useful for photos captured on Apple devices that need broader compatibility. It helps when sites, apps, or recipients do not handle HEIC well.",
    howTo: [
      "Upload the HEIC or HEIF images you want to convert.",
      "Run the browser-based conversion workflow.",
      "Download the finished JPG files for sharing or editing.",
    ],
    benefits: [
      "Useful for making iPhone and Apple photo files easier to share.",
      "Improves compatibility with websites, forms, and desktop tools.",
      "Provides a quick way to standardize photos into JPG format.",
    ],
    faqs: [
      {
        question: "Why convert HEIC to JPG?",
        answer: "JPG is usually easier to upload, email, and open across different systems.",
      },
      {
        question: "Does this help with iPhone photos?",
        answer: "Yes. That is one of the most common use cases for HEIC conversion.",
      },
      {
        question: "Can large photos take longer?",
        answer: "Yes. Processing time can vary with file size and device performance.",
      },
    ],
  },
  {
    slug: "resize-image",
    name: "Resize Image",
    category: "Image",
    metaDescription: "Resize images online with custom width and height controls.",
    heroDescription: "Change image dimensions for uploads, documents, and design workflows directly in your browser.",
    summary:
      "Resize Image helps you match dimension requirements without opening a separate editor. It is useful for profile photos, document attachments, and website-ready assets.",
    howTo: [
      "Upload one or more image files.",
      "Enter the width and height values you need.",
      "Generate and download the resized images.",
    ],
    benefits: [
      "Useful for meeting upload and layout dimension requirements.",
      "Saves time on simple image prep work.",
      "Works well for batch resizing straightforward images.",
    ],
    faqs: [
      {
        question: "Can I set custom dimensions?",
        answer: "Yes. The tool includes width and height controls.",
      },
      {
        question: "Is this useful for website uploads?",
        answer: "Yes. Resizing is common before uploading images to forms and CMS platforms.",
      },
      {
        question: "Can I resize more than one image?",
        answer: "Yes. The workflow supports multiple uploaded images.",
      },
    ],
  },
  {
    slug: "compress-image",
    name: "Compress Image",
    category: "Image",
    metaDescription: "Compress image files online to reduce image size for web and email.",
    heroDescription: "Reduce image file size while keeping images easier to upload, send, and publish.",
    summary:
      "Compress Image is useful when pictures are too large for upload limits, storage targets, or fast sharing. It is a straightforward tool for routine image size reduction.",
    howTo: [
      "Upload the image files you want to compress.",
      "Choose the compression quality that fits your use case.",
      "Download the optimized output files.",
    ],
    benefits: [
      "Helps images upload faster and take less space.",
      "Useful for email attachments and CMS workflows.",
      "Lets you pick a quality level based on the output you need.",
    ],
    faqs: [
      {
        question: "Why compress images before upload?",
        answer: "Smaller images are easier to upload, store, and share.",
      },
      {
        question: "Can I choose the quality level?",
        answer: "Yes. The tool provides multiple compression quality options.",
      },
      {
        question: "Should I keep the original images?",
        answer: "Yes. Keep originals if maximum quality matters later.",
      },
    ],
  },
  {
    slug: "rotate-image",
    name: "Rotate Image",
    category: "Image",
    metaDescription: "Rotate images online with Convertify.",
    heroDescription: "Fix sideways image orientation before sharing, posting, or inserting into documents.",
    summary:
      "Rotate Image is a quick fix for photos and graphics that appear at the wrong angle. It is useful for camera uploads, scans, and assets that need straightforward orientation correction.",
    howTo: [
      "Upload the image you want to rotate.",
      "Adjust the angle until the preview looks correct.",
      "Download the rotated output image.",
    ],
    benefits: [
      "Fixes orientation issues quickly.",
      "Useful for photos, screenshots, scans, and document images.",
      "Avoids opening a larger editor for a simple correction.",
    ],
    faqs: [
      {
        question: "Can I make small angle adjustments?",
        answer: "Yes. The tool is designed for visual rotation and quick correction.",
      },
      {
        question: "Is this helpful for sideways phone photos?",
        answer: "Yes. That is a common use case.",
      },
      {
        question: "Do I need editing software installed?",
        answer: "No. The rotation workflow runs in the browser.",
      },
    ],
  },
  {
    slug: "image-upscaler",
    name: "Image Upscaler",
    category: "Image",
    metaDescription: "Upscale images online with Convertify.",
    heroDescription: "Increase image dimensions for clearer presentation and larger output use cases.",
    summary:
      "Image Upscaler is useful when you need a larger version of an image for viewing, presentation, or output preparation. It is best for convenience workflows where a quick browser-based upscale is enough.",
    howTo: [
      "Upload the image you want to enlarge.",
      "Run the upscaling workflow in the workspace.",
      "Download the larger output image and check the visual result.",
    ],
    benefits: [
      "Useful for quick image enlargement without extra software.",
      "Can help with presentation, previews, and lightweight print prep.",
      "Keeps the workflow simple for one-off image improvements.",
    ],
    faqs: [
      {
        question: "Will every image look sharper after upscaling?",
        answer: "Results depend heavily on the original image quality and source detail.",
      },
      {
        question: "Is this good for small source images?",
        answer: "It can help, but very small or blurry inputs still have limits.",
      },
      {
        question: "Should I compare the output before using it?",
        answer: "Yes. Always review the upscaled result for your specific use case.",
      },
    ],
  },
];

export const toolSeoMap = Object.fromEntries(
  toolSeoContent.map((tool) => [tool.slug, tool])
) as Record<string, ToolSeoContent>;

export const allIndexableRoutes = [
  ...siteRoutes
    .filter((route) => !["/tool-status", "/sitemap"].includes(route.path))
    .map((route) => route.path),
  ...toolSeoContent.map((tool) => `/tool/${tool.slug}`),
];
