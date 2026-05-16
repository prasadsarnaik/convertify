## Hero Section SEO Redesign

### Goal
Redesign the hero headline and subheadline for better SEO while preserving the premium, minimal Convertify aesthetic.

### Copy Changes
- **Headline (h1):** "Convert Files Instantly Online" — with "Instantly Online" highlighted via the existing accent gradient.
- **Subheadline (p):** "Free online PDF, Word, JPG, PNG, and file conversion tools. Fast, secure, and easy to use."

### SEO Meta Updates
- Update `<title>` in `index.html` to: "Convertify – Free Online File Converter"
- Update `<meta name="description">` in `index.html` to: "Convert PDF, Word, JPG, PNG, and more with Convertify. Free online file converter with fast, secure, and easy tools."
- Verify no other H1s exist on the Index page.

### UI Enhancements
- Add a subtle animated radial gradient glow behind the headline (CSS-only, low-motion-safe).
- Apply a gentle floating animation to the hero content container.
- Add smooth hover transitions (scale + shadow) to the existing CTA buttons.
- Improve mobile text wrapping with `text-balance` and responsive sizing.
- Keep all existing spacing, button layout, and Framer Motion entrance animations intact.

### Files to Edit
- `src/components/Hero.tsx` — copy, gradient highlight, glow, floating animation, button hovers
- `index.html` — `<title>` and `<meta name="description">`

### Validation
- Build passes
- Only one `<h1>` on the page
- Gradient glow and floating animation render correctly on mobile and desktop
- No layout breakage

## Technical Notes
- Use Tailwind semantic tokens and existing gradient variables.
- Keep animations lightweight (`transform`/`opacity` only) for Core Web Vitals.
- Wrap animations in `@media (prefers-reduced-motion: no-preference)` where appropriate.