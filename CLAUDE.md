# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check + production build (output: dist/)
npm run lint      # ESLint (flat config)
npm run preview   # Serve the production build locally
```

No test framework is configured.

## Stack

- **React 19** with TypeScript, bundled by **Vite 8**
- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`
- Single-page landing for the Ruta 1 bus app — no router, no state management library, no data fetching layer
- Fonts and MDI icons loaded via CDN links in `index.html` (not npm packages)

## Structure

- `src/App.tsx` — entire landing page in one component; `SLIDES` array is hoisted outside the component
- `src/index.css` — all styles (CSS custom property tokens, component styles, responsive breakpoints)
- `src/App.css` — intentionally empty; all styles live in `index.css`
- `public/screenshots/` — phone carousel images (`landing-map.png`, `landing-line.png`, `landing-search.png`)

## Design tokens

Light/dark theme is driven by a `data-theme` attribute on `<html>`. The attribute is written directly via `document.documentElement.setAttribute` — not React state. A pre-hydration inline script in `index.html` reads `localStorage` / `prefers-color-scheme` to set the initial theme before React loads.

## TypeScript

`tsconfig.app.json` targets ES2023 with `bundler` module resolution, strict mode enabled, and `verbatimModuleSyntax: true`. Use `import type` for type-only imports. No path aliases are configured.

## ESLint

Uses the new flat-config format (`eslint.config.js`). Plugins: `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
