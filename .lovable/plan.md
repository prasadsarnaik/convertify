## Goal
Add a new **Excel → PDF** tool that runs 100% in the browser (no API), matching the existing tool architecture (Word→PDF, PDF→Word).

## Approach
Use **SheetJS (`xlsx`)** to parse `.xlsx` / `.xls` / `.csv` into rows, then render each sheet into a PDF with **jsPDF + jspdf-autotable** as native, selectable tables.

- Selectable/searchable text (not rasterized)
- Multi-sheet support → each sheet starts on a new page with its name as a heading
- Auto-fit columns, repeat header rows, A4 landscape (better for wide sheets)
- Handles large sheets via autoTable's automatic page breaks
- Clear error if file is password-protected or corrupt

## Files

**New:**
- `src/lib/excelToPdf.ts` — `convertExcelToPdf(file: File): Promise<Blob>`
  - Read file → `XLSX.read(arrayBuffer, { type: 'array' })`
  - For each sheet: `XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })`
  - First page: jsPDF landscape A4. For each sheet, add page (except first), draw sheet name as H2, then `autoTable({ head: [row0], body: rows.slice(1), styles: { fontSize: 9 }, headStyles: { fillColor: [99,102,241] } })`
  - Returns Blob via `pdf.output('blob')`
- `src/components/ExcelToPdfTool.tsx` — workspace UI mirroring `WordToPDFTool.tsx` (dropzone for `.xlsx/.xls/.csv`, convert button, progress, mobile-safe download via existing blob utility)

**Edit:**
- `src/pages/ToolPage.tsx` — register `"excel-to-pdf": ExcelToPdfTool` in `DEDICATED_WORKSPACES`
- `src/components/ToolsGrid.tsx` — add tool card (icon `FileSpreadsheet`, slug `excel-to-pdf`)
- `src/pages/ToolsPage.tsx` — add to `pdfTools` array
- `src/lib/toolContent.ts` — add SEO meta, description, FAQs for `excel-to-pdf`
- `src/lib/toolContentLong.ts` — add long-form content + extra FAQs
- `public/sitemap.xml` — add `/excel-to-pdf` URL

**Dependencies:**
- `xlsx` (SheetJS community build) — `bun add xlsx`
- `jspdf-autotable` — `bun add jspdf-autotable` (jsPDF is already installed)

## Validation
1. `npm run build` passes.
2. Convert a multi-sheet `.xlsx` with text + numbers → open PDF, confirm each sheet on its own page(s), text is selectable, tables render with header styling.
3. Convert a `.csv` → single page table renders.
4. Convert a wide sheet (20+ columns) → autoTable shrinks/wraps without overflow.
5. SEO: new route `/excel-to-pdf` resolves, title/description present, sitemap includes it.

## Out of Scope
- Pixel-perfect Excel formatting (cell colors, merged cells, formulas as rendered values only — formulas show their computed result via SheetJS)
- Charts and embedded images inside the workbook
- `.xlsb` / password-protected workbooks (clear error message shown)
