# AGENTS.md

## Purpose
- This repository is a Vite + React + TypeScript application for PDF, image, and document tooling.
- Make deliberate, scoped changes that fit the existing architecture.
- Extend current flows before introducing new abstractions.

## Operating Rules
- Preserve the current routing structure unless the task clearly requires a route-level change.
- Respect existing component boundaries; do not move page-specific concerns into shared modules too early.
- Keep the current Tailwind and shadcn-style UI approach unless there is a strong reason to change it.
- Prefer surgical edits over broad refactors.

## Project Layout
- `src/pages/`: route-level pages and page-specific composition
- `src/components/`: reusable UI sections and workspace components
- `src/components/ui/`: shared shadcn-style UI primitives
- `src/hooks/`: reusable React hooks
- `src/lib/`: shared utilities, helpers, and document conversion logic
- `src/test/`: Vitest setup and targeted tests
- `src/assets/`: bundled static assets
- `public/`: runtime-served static files
- Use the `@/` alias for internal imports.

## Implementation Guidance
- Keep route-specific presentation logic inside `src/pages/`.
- Move behavior into `components`, `hooks`, or `lib` only when it is clearly reusable.
- Reuse existing workspace and tool patterns when adding functionality.
- Avoid incidental cleanup unless it directly supports the requested change.

## Code Standards
- Use TypeScript with 2-space indentation.
- Keep imports explicit and grouped logically.
- Use `PascalCase` for components and route page files.
- Use `useX` naming for hooks when appropriate.
- Keep utility filenames in `src/lib/` short and lowercase.
- Keep Tailwind classes inline in TSX and aligned with existing patterns.
- Review `eslint.config.js` before introducing patterns that may conflict with repository rules.

## Change Boundaries
- Do not change routing structure, shared UI primitives, or converter behavior without checking downstream usage first.
- Avoid architectural changes when a focused update is sufficient.
- Treat converter logic and workspace flows as shared behavior; verify impact before modifying them.

## Commands
Run all commands from the repository root.

- `npm install`: install dependencies
- `npm run dev`: start the Vite development server
- `npm run build`: create a production build in `dist/`
- `npm run build:dev`: create a development-mode build
- `npm run preview`: serve the latest production build locally
- `npm run lint`: run ESLint
- `npm run test`: run Vitest once in `jsdom`
- `npm run test:watch`: start Vitest in watch mode

## Testing
- Name tests `*.test.ts` or `*.test.tsx`.
- Place tests in `src/test/` or alongside the feature they cover.
- Add focused coverage for utilities, hooks, converters, and visible user behavior when practical.
- Before finishing a change, run `npm run lint` and the most relevant test command.

## Commit And PR Expectations
- Use short, imperative commit messages such as `Add SEO component` or `Test word to PDF flow`.
- Do not use placeholder commits such as `WIP`.
- Keep each pull request scoped to one clear outcome.
- Include a concise summary, linked issue when applicable, validation steps, and screenshots for UI changes.
- Call out tradeoffs, limitations, and follow-up work before review.
