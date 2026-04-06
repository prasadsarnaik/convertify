

## Convertify Pre-Launch Audit & Fix Plan

### Audit Summary

I reviewed all 20 tools, all pages, routing, assets, theming, and build output. The app is in strong shape overall. Here are the issues found and fixes needed:

---

### Issues Found

**1. Rotate Image missing from /tools page**
The ToolsPage (`src/pages/ToolsPage.tsx`) lists 9 image tools but is missing "Rotate Image". It exists on the homepage grid and has a working dedicated workspace, but users navigating via /tools won't see it.

**Fix**: Add `{ name: "Rotate Image", desc: "Rotate images to any angle", icon: RotateCw, color: "from-accent-green to-accent-purple", slug: "rotate-image" }` to the `imageTools` array in ToolsPage.tsx.

**2. 404 page lacks branding and navigation**
The NotFound page is a plain unstyled page with no Navbar/Footer and doesn't match the site's design system.

**Fix**: Add Navbar, Footer, and style it consistently with the rest of the site (Apple-style, gradient icon, proper spacing).

**3. Contact form has no backend — submits silently**
The contact form calls `setSubmitted(true)` with no actual delivery. Users may think their message was sent.

**Fix**: Add a toast notification making it clear this is a demo/placeholder, or add a note like "We'll get back to you soon" with a disclaimer. This is acceptable for launch as a static site.

**4. "Rotate Image" tool missing from converters.ts dispatcher**
The `runConversion` function in `converters.ts` has no case for `"rotate-image"` — but this doesn't matter since it uses a dedicated workspace component (RotateImageWorkspace) that handles processing directly. No fix needed.

**5. `fabric` imported via `require()` — potential ESM issue**
EditPdfWorkspace and SignPdfWorkspace use `require("fabric")` which works but may cause warnings. Since it's working currently, this is low priority.

---

### What's Working Well (No Changes Needed)

- All 20 tools have proper routing via ToolPage.tsx
- All dedicated workspaces (Edit PDF, Sign PDF, Rotate PDF, Compress PDF, Image to PDF, Image Upscaler, Protect PDF, Unlock PDF, Rotate Image) have full upload → process → download flows
- Generic tools (Merge, Split, PDF to JPG, format conversions, Resize, Compress Image) work through ToolWorkspace + converters.ts
- Protect → Unlock round-trip encryption verified (AES-256-GCM)
- Dark mode toggle works correctly (light default, dark secondary)
- All pages have Navbar + Footer (except 404)
- No build errors
- Logo asset exists and loads
- Theme variables properly defined for both light and dark
- Mobile responsive navbar with hamburger menu

---

### Implementation Steps

1. **Add Rotate Image to ToolsPage** — Add the missing entry to `imageTools` array in `src/pages/ToolsPage.tsx`

2. **Improve 404 page** — Add Navbar, Footer, and Apple-style design with a "Go Home" button, matching the site's look

3. **Add disclaimer to Contact form** — Add a subtle note that this is a static demo form (no messages are actually sent)

All three are quick, low-risk changes that won't affect existing functionality.

