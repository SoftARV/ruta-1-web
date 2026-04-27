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
- Currently a minimal SPA — no router, no state management library, no data fetching layer

## TypeScript

`tsconfig.app.json` targets ES2023 with `bundler` module resolution, strict mode enabled, and `verbatimModuleSyntax: true`. Use `import type` for type-only imports. No path aliases are configured.

## ESLint

Uses the new flat-config format (`eslint.config.js`). Plugins: `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
