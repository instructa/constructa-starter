# TanStack Start RC1 Upgrade Guide

This guide captures the mandatory changes and local patches we applied while upgrading the project to TanStack Start RC1 (router v1.132.x).

## Platform Requirements
- Node.js **>= 22.12** (enforced via `package.json` / engines).
- Vite **>= 7**. Install `@vitejs/plugin-react` (or the matching framework plugin) manually; the Start plugin no longer autoconfigures React/Solid.

## Vite Configuration
- `tanstackStart()` options renamed:
  - `tsr` → `router` for the virtual route config.
  - `srcDirectory` moved to the top level of the plugin options.
- Wrap `defineConfig` with a factory and call `loadEnv(mode, process.cwd(), '')`, then `Object.assign(process.env, ...)`. This restores the pre-RC behaviour where all `.env` keys are exposed (RC1 regression currently filters out non-`VITE_` prefixes).
- Ensure `tanstackStart()` is registered **before** `viteReact()` in the plugin array. The RC1 router plugin throws if React runs first.
- Continue including `viteReact()`, `tailwindcss()`, and other project plugins explicitly.

## Router Entry
- `createRouter` export renamed to `getRouter`. Update module augmentation to reference `ReturnType<typeof getRouter>`.
- Initialising any browser-only tooling (like Browser Echo) should be wrapped in `if (typeof window !== 'undefined')` to keep SSR builds safe.
- Route tree generation now emits the module declaration automatically; remove any manual declarations in `routeTree.gen.ts`.

## Server Functions & Helpers
- `.validator()` → `.inputValidator()`.
- `getWebRequest` → `getRequest`, `getHeaders` → `getRequestHeaders`, etc. Apply the full set of renames listed in `docs/tasks/03-upgrade-tanstack-rc1.md`.
- Response modes were removed—return a `Response` directly when needed.
- Keep shared types (e.g. `Theme`) exported from server modules so route loaders and components can import them without circular dependencies.

## API Routes
- Replace `createServerFileRoute` with `createFileRoute` and wrap server handlers inside `server: { handlers: { ... } }`.

## Global Middleware
- `registerGlobalMiddleware` was removed. Create `src/start.ts` and export `startInstance = createStart(async () => ({ ... }))`, registering request/function middleware there.
- Harden `src/utils/loggingMiddleware.tsx`: drop the `{ type: 'function' }` option and guard every context read before logging timings so RC1's reordered execution doesn't crash the client.

## Client Entry
- Import `StartClient` from `@tanstack/react-start/client` and render `<StartClient />` without the router prop.
- Add `src/entry-client.tsx` that hydrates `<StartClient />` via `startTransition()` and `StrictMode`.

## Known Regressions / Local Patches
- **Env loading**: Add the `loadEnv(..., '', )` workaround in `vite.config.ts` until the upstream fix lands.
- **Logging middleware**: Use the guarded implementation noted above; RC1 sometimes runs the server middleware before the client context exists.
- **Root Route Devtools**: Mount `<ReactQueryDevtools />` and `<TanStackRouterDevtools />` behind `import.meta.env.DEV`, and ensure the root route imports any loader types it returns.

## Validation Steps
- Rebuild after changes: `pnpm vite build` (confirms route tree generation and SSR build succeed).
- Verify the dev server launches without env validation errors or blank screens.
