## Goal

Both tools already run 100% in the browser with no API. The problem is **output quality**:

- **Word → PDF** currently rasterizes the page with `html2canvas` → the PDF is just a picture. Text isn't selectable or searchable, file size is huge, and it looks blurry on zoom.
- **PDF → Word** currently dumps every line as a plain paragraph at the same font size → loses bold, italic, headings, font sizes, and paragraph grouping.

I'll rewrite both converters to produce **true, selectable, formatted output** — still entirely client-side.

---

## Word → PDF (`src/lib/wordToPdf.ts`)

Replace the html2canvas raster pipeline with a **native jsPDF text renderer**:

1. `mammoth.convertToHtml()` → semantic HTML (headings, paragraphs, lists, tables, bold/italic, images as base64).
2. Walk the HTML DOM and emit jsPDF instructions:
   - `<h1>/<h2>/<h3>` → larger bold text with spacing
   - `<p>` → body text with `splitTextToSize` for word-wrap
   - `<strong>/<em>` → `setFont("helvetica","bold"|"italic")` runs
   - `<ul>/<ol>` → bullet/number prefix + indent
   - `<table>` → simple grid using `jspdf-autotable` (already common; will add if missing)
   - `<img>` → `pdf.addImage()` at intrinsic size, scaled to page width
3. Manual page-break logic: track `cursorY`, call `pdf.addPage()` when content exceeds usable height.
4. A4 portrait, 40 pt margins, Helvetica 11 pt body.

Result: small file size, **selectable & searchable text**, crisp at any zoom.

Fallback: if rendering throws on an exotic element, log and skip that node rather than failing the whole conversion.

---

## PDF → Word (`src/lib/pdfToWord.ts`)

Upgrade the pdf.js extraction to preserve formatting:

1. For each page, call `getTextContent()` and also `getOperatorList()` to read font names + sizes per item.
2. Group items into **lines** by Y (existing logic) and into **paragraphs** by line-gap heuristic (gap > 1.5× line-height = new paragraph).
3. For each text item:
   - Detect **bold** if font name contains `Bold|Black|Heavy`
   - Detect **italic** if font name contains `Italic|Oblique`
   - Carry **font size** through to docx `TextRun({ size: ptToHalfPt(size) })`
4. Detect headings: lines whose font size is ≥ 1.3× the page median → `HeadingLevel.HEADING_1/2`.
5. Preserve runs within a line (multiple `TextRun`s per `Paragraph`) so partial-bold/italic survives.
6. Keep the existing page-break and Calibri default.

Result: docx that opens in Word/Google Docs with real headings, bold, italic, and proportional font sizes — fully editable.

---

## Files

- **Edit** `src/lib/wordToPdf.ts` — full rewrite of `convertWordToPdf`; remove `html2canvas` usage.
- **Edit** `src/lib/pdfToWord.ts` — upgrade `buildLinesFromTextContent` + paragraph builder.
- **Possibly add** `jspdf-autotable` dependency for clean table rendering in Word→PDF (small, ~30 KB).
- No UI changes — `WordToPDFTool.tsx` / `PdfToWordTool.tsx` already wire up correctly.

## Validation

1. `npm run build` passes.
2. Manually convert a sample DOCX with headings, bold, a list, and an image → open the PDF, confirm text is selectable (Ctrl+F finds words).
3. Manually convert a sample PDF → open the DOCX in Word/Google Docs, confirm headings/bold/sizes are preserved.
4. Confirm the existing Vitest suite still passes.

## Out of Scope

- **Scanned (image-only) PDFs** — still won't yield text without OCR. I'll surface a clearer error: *"This PDF appears to be scanned. Text extraction requires OCR (not yet supported)."*
- **Legacy `.doc`** files — remain unsupported in-browser; the existing validation message stays.
- **Pixel-perfect Word layout** in the PDF (columns, exact fonts, headers/footers) — true fidelity requires LibreOffice/Word and isn't possible purely client-side.
