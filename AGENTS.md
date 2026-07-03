# Agent Notes — Luisa Pita Bejarano Web Frontapp

## Stack
- Vue 3 + Vite + TypeScript + SCSS.
- pnpm (`.npmrc` sets `node-linker=hoisted`; `pnpm-workspace.yaml` is malformed, ignore it).
- Pinia, vue-router, GSAP + ScrollTrigger + Lenis (smooth scroll).

## Commands
- `pnpm dev` — Vite dev server.
- `pnpm build` — `vue-tsc -b && vite build` (no test/lint/formatter scripts — verify via build only).
- `pnpm preview` — preview `dist/`.

## Architecture
- Entry `src/main.ts`: creates Pinia, hydrates `useUserStore()` from localStorage, then mounts after `router.isReady()`.
- Router `src/router/index.ts`: 18 named routes. Route `meta` drives dynamic SEO in `afterEach`. Auth guards in `beforeEach` (see **Auth flow** below).
- Stores: `user` (Pinia, localStorage-backed auth/session) and `dashboard` (Pinia, **all hardcoded/mock data** — courses, lessons, recipes, schedule, live classes, achievements).
- HTTP: `src/services/httpBase.ts` — Axios base class; all service files (`authService`, `userService`, `paymentService`, `presaleService`, `launchReminderService`, `adminService`) extend it as instantiated singletons. `/api` suffix is auto-appended to the URL.
- Asynchronous `auth:token-expired` CustomEvent on 401 responses (listened for elsewhere).
- Views: `src/views/home`, `src/views/dashboard/` (routed views use `index.vue` convention), `src/views/admin/`, `src/views/auth/`, plus legal pages.
- Components: `src/components/{layout,home,ui,auth,dashboard,admin,presale}/`.
- SPA: `public/_redirects` — `/* /index.html 200` (Netlify-style SPA fallback).

## Auth flow
- `useUserStore().hydrate()` called in `main.ts` before any routing. Reads tokens from localStorage keys prefixed `access_token`, `user_*`.
- Router guards (`beforeEach`):
  - `requiresAuth` → unauthenticated users redirected to `login`.
  - `requiresAdmin` → non-admin users redirected to `no-permission`.
  - Authenticated users visiting `/` (home) are redirected to `dashboard`, `payments`, or `admin-users` based on role/access.
  - Authenticated users without active access cannot see dashboard routes → redirected to `payments`.
  - Authenticated users visiting public auth pages (`login`, `register`, etc.) are redirected away.

## Path alias
- `@/` → `./src` (both Vite and TypeScript config).

## Styles
- `vite.config.ts` auto-injects `@use "@/styles/index.scss" as *;` into every `<style lang="scss">` block.
- `index.scss` forwards `colorVariables.module.scss` and `fonts.module.scss`, and provides `lighten()`/`darken()` helpers.
- `global.scss` imported once in `main.ts`: defines CSS custom properties on `:root`/`[data-theme="dark"]`, Lenis classes, `.container` utility, `[data-reveal]` animation init states.
- Additional SCSS: `typography.scss`, `admin-shared.scss`.
- `--cream` and `--surface` tokens exist only in light theme (no dark counterpart).
- Font Awesome 6 loaded via CDN in `index.html`.

## Environment
- Copy `.env.example` to `.env`.
```
VITE_API_BASE_URL=http://localhost:8100/api
VITE_PRESALE_DEADLINE=2026-07-06T23:59:59-05:00
VITE_LAUNCH_DEADLINE=2026-07-06T00:00:00-05:00
VITE_WHATSAPP_NUMBER=593999999999
VITE_ADMIN_WHATSAPP=593992019807
VITE_ANNUAL_PRICE=297
VITE_MONTHLY_PRICE=47
```

## Payment integration
- Payphone payment gateway via `prepareBox()` (`payments/prepare-box`) and `prepareAnnual()` / `prepareMonthly()` (`payments/prepare` / `payments/prepare-monthly`).
- Payments confirmed via `confirmPayment(id, clientTransactionId)`.
- Payment history, cancellation, and manual payment handling in `paymentService`.

## Animations
- Lenis smooth scroll initialized globally in `App.vue` via `useSmoothScroll()` composable — GSAP ticker is used, so ScrollTrigger must be registered on import.
- Scroll reveal: `useScrollReveal()` composable animates `[data-reveal]` elements when they enter viewport. Initial states (`opacity: 0`, `translateY(48px)`) are set in `global.scss`.
- GSAP + ScrollTrigger loaded — register plugin when importing.

## Key conventions
- `<script setup lang="ts">` for SFCs.
- PascalCase component names (e.g. `HeroSection.vue`, `AppButton.vue`).
- Page SEO defined in route `meta`, not in components.
- Dashboard views use `index.vue` convention with sub-components in same directory.
- Images served from Cloudinary (`res.cloudinary.com/dkosgkjpq`). Use `useCloudinary()` composable or `buildSrcSet()` for responsive images.
- All services are instantiated singletons (`export const authService = new AuthService()`).
- FormData requests automatically strip `Content-Type` in `httpBase.ts`.

## Config gotcha
- Both `vite.config.ts` and `vite.config.js` exist with identical content. Vite prefers `.ts`; `tsconfig.node.json` references only `vite.config.ts`. Treat `.ts` as source of truth.
