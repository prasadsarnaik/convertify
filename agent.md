# Agent Notes

This repository is a Vite + React + TypeScript app for PDF and document tooling.
Keep changes small, deliberate, and aligned with the existing routing, component boundaries, and Tailwind-based UI patterns.

## Where Things Live
- `src/pages/` route-level pages.
- `src/components/` reusable sections and tool workspaces.
- `src/components/ui/` shared shadcn-style UI primitives.
- `src/hooks/` reusable React hooks.
- `src/lib/` shared utilities and conversion logic.
- `src/test/` Vitest setup and targeted tests.
- `src/assets/` bundled static assets.
- `public/` runtime-served files.

Use the `@/` alias for internal imports.

## Standard Commands
Run these from the repository root:
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server.
- `npm run build` creates the production build in `dist/`.
- `npm run build:dev` creates a development build for debugging.
- `npm run preview` serves the latest production build locally.
- `npm run lint` runs ESLint.
- `npm run test` runs Vitest once in `jsdom`.
- `npm run test:watch` runs Vitest in watch mode.

## Code Style
- Use TypeScript and 2-space indentation.
- Keep imports explicit and grouped logically.
- Use `PascalCase` for components and page files.
- Use `useX` naming for hooks when appropriate.
- Keep utility filenames in `src/lib/` short and lowercase.
- Keep route-specific presentation in `src/pages/`.
- Move reusable logic into `components`, `hooks`, or `lib`.
- Write Tailwind classes inline in TSX and follow the existing shadcn-style patterns.

Check `eslint.config.js` before introducing patterns that could affect linting.

## Testing
- Name tests `*.test.ts` or `*.test.tsx`.
- Keep tests in `src/test/` or colocated with the feature they cover.
- Add focused tests for utilities, hooks, converters, and visible user behavior when practical.
- Run `npm run lint` and the most relevant test command before wrapping up changes.

## Scope
- Prefer focused edits over broad refactors unless structural cleanup is required.
- Reuse existing workspace patterns when adding or extending tools.
- Do not change routing structure, shared UI primitives, or converter behavior without checking downstream usage.

## Commit And PR Notes
- Use short, imperative commit messages such as `Add SEO component` or `Test word to PDF flow`.
- Avoid placeholder commits such as `WIP`.
- Keep pull requests scoped to one clear outcome.
- Include a concise summary, linked issue if applicable, validation steps, and screenshots for UI changes.
- Call out limitations, follow-up work, and tradeoffs before review.