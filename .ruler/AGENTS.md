# don’t fetch or derive app state in useEffect

# core rules

1. Fetch on navigation in route loaders (SSR + streaming); optionally seed via `queryClient.ensureQueryData`. \[1]
2. Do server work on the server via TanStack Start server functions; after mutations call `router.invalidate()` and/or `queryClient.invalidateQueries()`. \[2]
3. Keep page/UI state in the URL with typed search params (`validateSearch`, `Route.useSearch`, `navigate`). \[3]
4. Reserve effects for real external effects only (DOM, subscriptions, analytics). Compute derived state during render; `useMemo` only if expensive. \[4]\[6]
5. Hydration + Suspense: any update that suspends during hydration replaces SSR content with fallbacks. Wrap sync updates that might suspend in `startTransition` (direct import). Avoid rendering `isPending` during hydration. `useSyncExternalStore` always triggers fallbacks during hydration. \[10]
6. Data placement:

   * Server-synced domain data → TanStack DB collections (often powered by TanStack Query via `queryCollectionOptions`, or a sync engine). Read with live queries. \[11]\[12]\[14]
   * Ephemeral UI/session (theme, modals, steppers, optimistic buffers) → zustand or local-only/localStorage collection. Do not mirror server data into zustand. \[16]\[14]
   * Derived views → compute in render or via live queries. \[12]

# if your useEffect did X → use Y

* Fetch on mount/param change → route loader (+ `ensureQueryData`). \[1]
* Submit/mutate → server function → then `router.invalidate()`/`qc.invalidateQueries()`. \[2]
* Sync UI ↔ querystring → typed search params + `navigate`. \[3]
* Derived state → compute during render (`useMemo` only if expensive). \[4]
* Subscribe external stores → `useSyncExternalStore` (expect hydration fallbacks). \[5]\[10]
* DOM/listeners/widgets → small `useEffect`/`useLayoutEffect`. \[6]
* Synced list + optimistic UI → DB query collection + `onInsert`/`onUpdate`/`onDelete` or server fn + invalidate. \[11]\[13]
* Realtime websocket/SSE patches → TanStack DB direct writes (`writeInsert/update/delete/upsert/batch`). \[13]
* Joins/aggregations → live queries. \[12]
* Local-only prefs/cross-tab → localStorage collection (no effects). \[14]

# idioms (names only)

* Loader: `queryClient.ensureQueryData(queryOptions({ queryKey, queryFn }))` → read via `useSuspenseQuery` hydrated from loader. \[1]
* DB query collection: `createCollection(queryCollectionOptions({ queryKey, queryFn, queryClient, getKey }))` → read via live query. \[11]\[12]
* Mutation (server-first): `createServerFn(...).handler(...)` → on success `qc.invalidateQueries`, `router.invalidate`; supports `<form action={serverFn.url}>`. \[2]
* DB persistence handlers: `onInsert`/`onUpdate`/`onDelete` → return `{ refetch?: boolean }`; pair with direct writes when skipping refetch. \[13]
* Search params as state: `validateSearch → Route.useSearch → navigate({ search })`. \[3]
* External store read: `useSyncExternalStore(subscribe, getSnapshot)`. \[5]
* Hydration-safe: `import { startTransition } from 'react'` for sync updates; avoid `useTransition`/`isPending` during hydration. \[10]

# decision checklist

* Needed at render → loader (defer/stream). \[1]\[7]
* User changed data → server fn → invalidate; or DB handlers/direct writes. \[2]\[13]
* Belongs in URL → typed search params. \[3]
* Purely derived → render/live query. \[4]\[12]
* External system only → effect. \[6]
* Hydration sensitive → `startTransition` for sync updates; expect fallbacks from external stores; avoid `isPending` during hydration. \[10]
* SSR/SEO → loader-based fetching with streaming/deferred; dehydrate/hydrate caches and DB snapshots. \[7]

# React 19 helpers

* `useActionState` for form pending/error/result. \[8]
* `use` to suspend on promises. \[9]

# hydration + suspense playbook \[10]

* Rule: sync updates that suspend during hydration → fallback replaces SSR.
* Quick fix: wrap updates with `startTransition` (direct import); re-wrap after `await`.
* Avoid during hydration: using `useTransition` for the update, rendering `isPending`, `useDeferredValue` unless the suspensey child is memoized, any `useSyncExternalStore` mutation.
* Safe during hydration: setting same value with `useState`/`useReducer`, `startTransition`-wrapped sync updates, `useDeferredValue` with `React.memo` around the suspensey child.
* Compiler auto-memoization may help; treat as optimization.

# TanStack DB: when/how \[11]\[12]\[13]\[14]\[15]\[16]

* Use DB for server-synced domain data.
* Load: `queryCollectionOptions` (simple fetch; optional refetch) or sync collections (Electric/Trailbase/RxDB).
* Read: live queries (reactive, incremental; joins, `groupBy`, `distinct`, `order`, `limit`). \[12]
* Writes:

  * Server-first → server fn → `router.invalidate()`/`qc.invalidateQueries()`. \[2]
  * Client-first → `onInsert`/`onUpdate`/`onDelete` (return `{ refetch: false }` if reconciling via direct writes/realtime). \[13]
  * Direct writes → `writeInsert/update/delete/upsert/batch` for websocket/SSE deltas, incremental pagination, server-computed fields; bypass optimistic layer and skip refetch. \[13]
* Behaviors: query collection treats `queryFn` result as full state; empty array deletes all; merge partial fetches before returning. \[13]
* Transaction merging reduces churn:

  * insert+update → merged insert
  * insert+delete → cancel
  * update+delete → delete
  * update+update → single union
  * same type back-to-back → keep latest \[15]
* SSR: per-request store instances; never touch storage during SSR. \[16]\[14]

# SSR/streaming/hydration with router + DB

* In loaders: seed query via `ensureQueryData`; for DB, preload or dehydrate/hydrate snapshots so lists render instantly and stream updates. \[1]\[7]\[12]\[14]
* After mutations: loader-owned → invalidate router/query; DB-owned → let collection refetch or apply direct writes. \[2]\[13]

# micro-recipes

* Avoid first-click spinner after SSR: wrap clicks with `startTransition`; don’t render `isPending` until post-hydration. \[10]
* External store during hydration: defer interaction or isolate the suspense boundary; expect fallbacks. \[5]\[10]
* Paginated load-more: fetch next page, then `collection.utils.writeBatch(() => writeInsert(...))` to append without refetching old pages. \[13]
* Realtime patches: `writeUpsert`/`writeDelete` from socket callback inside `writeBatch`. \[13]

# TanStack Start best practices

## Static server functions

* `createServerFn({ method: 'GET' }).middleware([staticFunctionMiddleware])` runs at build time; cached as static JSON by key `(fnId + params hash)`; prerender embeds data in HTML; later client calls fetch JSON.
* Custom cache via `createServerFnStaticCache` and `setServerFnStaticCache`.

## Server functions

* RPC-style, server-only; no stable public URL; access request ctx/env/cookies; return primitives/JSON/`Response`; can redirect/notFound/error.
* Define: `createServerFn(opts?).handler(async ctx => { ... })`.
* Options: `method: 'GET'|'POST'`.
* Callable from server/client/other server fns.
* Single param: primitives/objects/`FormData`/`ReadableStream`/`Promise`.
* Validation & types: `.inputValidator(input => validated)` (works with Zod); identity validator for typing only.
* Context (`@tanstack/react-start/server`): `getRequest`, `getRequestHeaders`/`getRequestHeader`, `setResponseHeaders`/`setResponseHeader`, `getCookies`, sessions, multipart, etc.
* Returns: primitives/JSON by default; can set headers/status; return `Response` for custom responses/SSE.
* Errors & control flow: throw → 500; `redirect(...)` from `@tanstack/react-router`; `notFound()`; supports `AbortSignal`.
* Usage: in route lifecycles (`loader`/`beforeLoad`) redirects/notFounds auto-handled; in components use `useServerFn(fn)` and integrate with React Query; elsewhere handle redirects/notFounds manually.
* No-JS support: use `<form action={serverFn.url} method="POST">` (pass args via inputs; `encType="multipart/form-data"` as needed); return value unavailable to client JS → use HTTP redirects to trigger loader refresh.
* Static variant: see Static server functions above.

## Selective SSR

* Default `ssr: true` (change via `getRouter({ defaultSsr: false })`). SPA mode disables all server loaders/SSR.
* Per-route `ssr`: `true` | `'data-only'` | `false`.
* Functional `ssr(props)`: runs only on server initial request; can return `true` | `'data-only'` | `false` based on validated params/search.
* Inheritance: child can only get less SSR (true → `'data-only'` or false; `'data-only'` → false).
* Fallback: first route with `ssr: false` or `'data-only'` renders `pendingComponent` (or `defaultPendingComponent`) at least `minPendingMs` (or `defaultPendingMinMs`).
* Root: you can disable SSR of root route component; `shellComponent` is always SSRed.

## Zustand in TanStack Start

* Use for client/UI/session and push-based domain state (theme, modals, wizards, optimistic UI, websocket buffers). Keep server data in loaders/Query.
* Per-request store instance to avoid SSR leaks; inject via Router context; dehydrate/hydrate via `router.dehydrate`/`router.hydrate` so snapshots stream with the page.
* After navigation resolution, clear transient UI with `router.subscribe('onResolved', ...)`.
* Mutations: do work in server fn → optionally update store optimistically → `router.invalidate` to reconcile with loader data.
* Persist middleware only for client/session; avoid touching storage during SSR.
* Use atomic selectors (`useStore(s => slice)`) and equality helpers.

## Project constraints

* Use pnpm.
* All route files are TypeScript React (`.tsx`).
* Use alias imports: `~` resolves to root `./src`.
* Never update `.env`; update `.env.example` instead.
* Never start the dev server with `pnpm run dev` or `npm run dev`.
* Never create a local pnpm --store

## docs map

\[1] router data loading · \[2] server functions · \[3] search params · \[4] you might not need an effect · \[5] `useSyncExternalStore` · \[6] synchronizing with effects · \[7] SSR/streaming · \[8] `useActionState` · \[9] `use` · \[10] hydration + suspense guide · \[11] TanStack DB query collection · \[12] live queries · \[13] direct writes + persistence handlers · \[14] collections catalog · \[15] transactions + optimistic actions · \[16] zustand in TanStack Start
