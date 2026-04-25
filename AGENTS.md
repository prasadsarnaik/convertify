# Repository Guidelines

## Overview
- This repository is a Vite + React + TypeScript app for PDF, image, and document tooling.
- Keep edits focused. Preserve existing routing, component boundaries, and Tailwind-based UI patterns unless the task clearly requires a structural change.
- Prefer extending existing workflows over introducing parallel abstractions.

## Project Structure
- `src/pages/` holds route-level pages and page-specific composition.
- `src/components/` holds reusable UI sections and tool workspaces.
- `src/components/ui/` holds shared shadcn-style primitives.
- `src/hooks/` holds reusable React hooks.
- `src/lib/` holds shared utilities, helpers, and document conversion logic.
- `src/test/` holds Vitest setup and targeted tests.
- `src/assets/` holds bundled static assets.
- `public/` holds runtime-served static files.

Use the `@/` alias for internal imports.

## Development Commands
Run commands from the repository root.

- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server.
- `npm run build` creates a production build in `dist/`.
- `npm run build:dev` creates a development-mode build.
- `npm run preview` serves the latest production build locally.
- `npm run lint` runs ESLint.
- `npm run test` runs Vitest once in `jsdom`.
- `npm run test:watch` starts Vitest in watch mode.

## Coding Conventions
- Use TypeScript and 2-space indentation.
- Keep imports explicit and grouped logically.
- Use `PascalCase` for components and route page files.
- Use `useX` naming for hooks when appropriate.
- Keep utility filenames in `src/lib/` short and lowercase.
- Keep route-specific presentation in `src/pages/`; move reusable logic into `components`, `hooks`, or `lib`.
- Keep Tailwind classes inline in TSX and stay consistent with the existing shadcn-style patterns.
- Check `eslint.config.js` before introducing new patterns that may conflict with lint rules.

## Testing Expectations
- Name tests `*.test.ts` or `*.test.tsx`.
- Keep tests in `src/test/` or colocated with the feature they cover.
- Add focused coverage for utilities, hooks, converters, and visible user behavior when practical.
- Run `npm run lint` and the most relevant test command before finishing changes.

## Change Boundaries
- Prefer small, surgical edits over broad refactors.
- Reuse existing workspace and tool patterns when adding functionality.
- Do not change routing structure, shared UI primitives, or converter behavior without checking downstream usage.
- Avoid incidental cleanup unless it directly supports the task.

## Commits And PRs
- Use short, imperative commit messages such as `Add SEO component` or `Test word to PDF flow`.
- Avoid placeholder commits such as `WIP`.
- Keep each pull request scoped to one clear outcome.
- Include a concise summary, linked issue if applicable, validation steps, and screenshots for UI changes.
- Call out tradeoffs, limitations, and follow-up work before review.
