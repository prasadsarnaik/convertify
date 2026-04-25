# Repository Guidelines

## Overview
- This repository is a Vite + React + TypeScript application for PDF, image, and document tooling.
- Keep changes focused and intentional.
- Preserve the existing routing structure, component boundaries, and Tailwind-based UI patterns unless the task clearly requires a structural change.
- Extend established workflows instead of introducing parallel abstractions.

## Project Structure
- `src/pages/` contains route-level pages and page-specific composition.
- `src/components/` contains reusable UI sections and tool workspace components.
- `src/components/ui/` contains shared shadcn-style UI primitives.
- `src/hooks/` contains reusable React hooks.
- `src/lib/` contains shared utilities, helpers, and document conversion logic.
- `src/test/` contains Vitest setup and targeted tests.
- `src/assets/` contains bundled static assets.
- `public/` contains runtime-served static files.
- Use the `@/` alias for internal imports.

## Development Commands
Run all commands from the repository root.

- `npm install` installs dependencies.
- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build in `dist/`.
- `npm run build:dev` creates a development-mode build.
- `npm run preview` serves the latest production build locally.
- `npm run lint` runs ESLint.
- `npm run test` runs Vitest once in `jsdom`.
- `npm run test:watch` starts Vitest in watch mode.

## Coding Conventions
- Use TypeScript with 2-space indentation.
- Keep imports explicit and grouped logically.
- Use `PascalCase` for components and route page files.
- Use `useX` naming for hooks where appropriate.
- Keep utility filenames in `src/lib/` short and lowercase.
- Keep route-specific presentation inside `src/pages/`.
- Move reusable logic into `components`, `hooks`, or `lib`.
- Keep Tailwind classes inline in TSX and stay consistent with existing shadcn-style patterns.
- Review `eslint.config.js` before introducing patterns that may conflict with repository lint rules.

## Testing Expectations
- Name tests `*.test.ts` or `*.test.tsx`.
- Place tests in `src/test/` or alongside the feature they cover.
- Add focused coverage for utilities, hooks, converters, and visible user behavior when practical.
- Before finishing a change, run `npm run lint` and the most relevant test command.

## Change Boundaries
- Prefer small, surgical edits over broad refactors.
- Reuse existing workspace and tool patterns when adding functionality.
- Do not change routing structure, shared UI primitives, or converter behavior without checking downstream usage first.
- Avoid incidental cleanup unless it directly supports the requested change.

## Commits And PRs
- Use short, imperative commit messages such as `Add SEO component` or `Test word to PDF flow`.
- Do not use placeholder commits such as `WIP`.
- Keep each pull request scoped to one clear outcome.
- Include a concise summary, linked issue when applicable, validation steps, and screenshots for UI changes.
- Call out tradeoffs, limitations, and follow-up work before review.
