# Repository Guidelines

## Project Structure & Module Organization
This project is a Vite + React + TypeScript application.

- `src/pages/` contains route-level screens.
- `src/components/` contains reusable feature components and tool workspaces.
- `src/components/ui/` contains shared shadcn-style UI primitives and related helpers.
- `src/hooks/` contains custom React hooks.
- `src/lib/` contains shared utilities and converter logic.
- `src/test/` contains Vitest setup and test files.
- `src/assets/` contains bundled static assets.
- `public/` contains files served directly at runtime.

Use the `@/` import alias for app code, for example `@/components/Navbar`.

## Build, Test, and Development Commands
Run commands from the repository root.

- `npm install` installs dependencies.
- `npm run dev` starts the local Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run build:dev` creates a development-mode build for troubleshooting.
- `npm run preview` serves the latest production build locally.
- `npm run lint` runs ESLint across the project.
- `npm run test` runs the Vitest suite once in `jsdom`.
- `npm run test:watch` starts Vitest in watch mode.

## Coding Style & Naming Conventions
Use TypeScript with 2-space indentation. Keep imports explicit and grouped logically.

- Components and page files use `PascalCase`.
- Hooks use `useX` naming where possible.
- Utility modules in `src/lib/` use concise lowercase filenames.
- Keep route-specific UI in page components and move reusable logic into `hooks` or `lib`.

Tailwind utility classes are written inline in TSX. Follow the rules in `eslint.config.js`, and run `npm run lint` before finishing changes.

## Testing Guidelines
Vitest and Testing Library are configured via `vitest.config.ts` and `src/test/setup.ts`.

- Name tests `*.test.ts` or `*.test.tsx`.
- Keep tests in `src/test/` or next to the feature they cover.
- Add targeted tests for new logic in hooks, utilities, converters, and user-facing page behavior.

No coverage gate is currently enforced, but new functionality should ship with focused tests where practical.

## Commit & Pull Request Guidelines
Use short, imperative commit messages such as `Add SEO component` or `Test all tools`.

- Avoid placeholder commits like `WIP` on shared branches.
- Keep pull requests focused and clearly scoped.
- Include a summary, linked issue when applicable, test results, and screenshots or recordings for UI changes.
- Call out known limitations or follow-up work before requesting review.
