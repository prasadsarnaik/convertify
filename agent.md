# Repository Guidelines

## Overview
This repo is a Vite + React + TypeScript application for PDF and document tooling. Keep changes small and deliberate, and preserve the existing routing, component boundaries, and Tailwind-driven UI patterns unless the task clearly requires otherwise.

## Project Layout
- `src/pages/` contains route-level pages.
- `src/components/` contains reusable sections and tool workspaces for PDF, image, and document flows.
- `src/components/ui/` contains shared shadcn-style UI primitives.
- `src/hooks/` contains reusable React hooks.
- `src/lib/` contains shared utilities and document conversion logic.
- `src/test/` contains Vitest setup and targeted test coverage.
- `src/assets/` contains bundled static assets.
- `public/` contains files served directly at runtime.

Use the `@/` alias for internal imports.

## Commands
Run commands from the repository root.

- `npm install` installs dependencies.
- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run build:dev` creates a development-mode build for debugging.
- `npm run preview` serves the latest production build locally.
- `npm run lint` runs ESLint across the project.
- `npm run test` runs Vitest once in `jsdom`.
- `npm run test:watch` starts Vitest in watch mode.

## Coding Conventions
- Use TypeScript with 2-space indentation.
- Keep imports explicit and grouped logically.
- Use `PascalCase` for components and page files.
- Use `useX` naming for hooks when appropriate.
- Keep utility filenames in `src/lib/` short and lowercase.
- Keep route-specific presentation in `src/pages/`; move reusable logic into `components`, `hooks`, or `lib`.
- Write Tailwind classes inline in TSX and stay aligned with the existing shadcn-style patterns.

Check `eslint.config.js` before introducing patterns that may affect linting.

## Testing Expectations
Vitest and Testing Library are configured through `vitest.config.ts` and `src/test/setup.ts`.

- Name tests `*.test.ts` or `*.test.tsx`.
- Keep tests in `src/test/` or colocated with the feature they cover.
- Add focused tests for utilities, hooks, converters, and visible user behavior when practical.
- Run `npm run lint` and the most relevant test command before wrapping up changes.

## Change Scope
- Prefer focused edits over broad refactors unless structural cleanup is required.
- Reuse existing workspace patterns when adding or extending tools.
- Do not change routing structure, shared UI primitives, or converter behavior without checking downstream usage.

## Commits And PRs
- Use short, imperative commit messages such as `Add SEO component` or `Test word to PDF flow`.
- Avoid placeholder commits such as `WIP` on shared branches.
- Keep pull requests scoped to one clear outcome.
- Include a concise summary, linked issue if applicable, validation steps, and screenshots for UI changes.
- Call out limitations, follow-up work, and tradeoffs before review.
