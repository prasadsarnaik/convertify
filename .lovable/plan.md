
## Goal
Make the "Founder, Creator & Owner" card on the About page (`src/pages/AboutPage.tsx`) feel more creative and alive with layered motion — without touching other sections.

## Visual Concept
A premium, animated profile card:

- **Animated gradient aura** behind the avatar — a soft conic/radial gradient blob that slowly rotates and pulses (purple → pink → blue), giving the avatar a glowing halo.
- **Orbiting accent dots** (2–3 small colored dots) circling the avatar emoji using `motion` rotate animation on an absolute-positioned ring.
- **Floating sparkle icons** (`Sparkles`, `Code2`, `Palette` from lucide) drifting subtly around the card corners with staggered y/opacity loops.
- **Avatar emoji**: keep 👨‍💻 but enhance — gentle float (y: [0,-6,0]) + occasional wave rotate, sitting inside a glassmorphic ring with gradient border (`bg-gradient-to-br p-[2px]` wrapper).
- **Name "Prasad Shivaji Sarnaik"**: animated gradient text (animated background-position shift across purple→pink→blue) for a shimmering effect.
- **Role badges**: replace plain "UI/UX Designer & Independent Developer" line with two small animated pill badges ("UI/UX Designer", "Independent Developer") that fade/slide in sequentially.
- **Card container**: subtle border-gradient glow on hover, soft shadow lift, and a faint animated grid or dot pattern background inside the card (low opacity) for depth.
- **Entrance**: whole card scales in with spring; child elements stagger (aura → avatar → label → name → badges → bio).

## Scope
Only the Creator section block inside `src/pages/AboutPage.tsx` (the `<section className="container max-w-md ...">` at the bottom). No changes to mission, why-items, hero, navbar, footer, or other pages.

## Technical Notes
- Use existing `framer-motion` (already imported).
- Use lucide icons already available (`Sparkles`) plus add `Code2`, `Palette` from `lucide-react`.
- Use only semantic tokens + existing accent classes (`accent-blue`, `accent-purple`, `accent-pink`) for colors — no hardcoded hex.
- Animated gradient text via Tailwind `bg-clip-text text-transparent` with a `motion.span` animating `backgroundPosition`.
- Orbit ring via absolutely-positioned `motion.div` with `animate={{ rotate: 360 }}` infinite linear.
- Respect reduced-motion users implicitly via subtle durations (no jarring movement).

## Acceptance
- Founder card visibly more dynamic on load and idle (gradient aura pulse, orbiting dots, floating sparkles, shimmering name).
- Light + dark mode both readable.
- No layout shift outside the card; rest of About page untouched.
