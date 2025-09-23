<rule>
don’t fetch or derive app state in useEffect

push data fetching to route loaders; do server work on the server; keep client state in the url or specialized stores; reserve effects for real external effects only. this update adds a hydration and suspense behavior guide and tanstack db guidance (including with zustand).

## core rules

1. fetch on navigation in route loaders (ssr + streaming). optionally seed tanstack query in the loader via `queryClient.ensureQueryData`. \[1]

2. do server work on the server via tanstack start server functions. after mutations, call `router.invalidate()` and/or `queryClient.invalidateQueries()`. \[2]

3. keep page and ui state in the url with typed search params (`validateSearch`, `Route.useSearch`, `navigate`). \[3]

4. reserve effects for external side effects only (dom, subscriptions, analytics). compute derived state during render; use `useMemo` only if expensive. \[4]\[6]

5. hydration and suspense safety: updates that suspend during hydration will replace ssr content with fallbacks. wrap synchronous updates that might suspend in `startTransition` (direct import). avoid rendering `isPending` during hydration. external stores via `useSyncExternalStore` always trigger fallbacks during hydration. \[10]

6. data placement:

   * server-synced domain data → tanstack db collections (often powered by tanstack query via `queryCollectionOptions`, or a sync engine collection). use live queries in components. \[11]\[12]\[14]
   * ephemeral ui or session state (theme, modals, steppers, optimistic ui buffers) → zustand or a local-only/localstorage db collection. do not mirror server data into zustand. \[16]\[14]
   * derived views → compute in render or use live queries for cross-collection derivations. \[12]

## if your useEffect was doing x → use y

* fetching on mount or params change → route loader (+ `ensureQueryData`). \[1]
* submitting or mutating → server function → then `router.invalidate()` and/or `qc.invalidateQueries()`. \[2]
* syncing ui with querystring → typed search params + `navigate`. \[3]
* derived state → compute during render (`useMemo` only if expensive). \[4]
* subscribing to external stores → `useSyncExternalStore` (expect hydration fallbacks; see hydration rules). \[5]\[10]
* dom or non-react widgets/listeners → small `useEffect` or `useLayoutEffect`. \[6]
* keeping a synced list with optimistic ui → tanstack db query collection + persistence handlers (`onInsert` / `onUpdate` / `onDelete`) or server function + `router.invalidate()`. \[11]\[13]
* real-time websocket/sse patches → tanstack db direct writes (`writeInsert` / `writeUpdate` / `writeDelete` / `writeUpsert` / `writeBatch`) to avoid whole-list refetches. \[13]
* cross-collection joins or aggregations → live queries. \[12]
* local-only prefs or cross-tab sync → localstoragecollection (no effects). \[14]

## idiomatic patterns (names only, no boilerplate)

* loader: `queryClient.ensureQueryData(queryOptions({ queryKey, queryFn }))` → component reads via `useSuspenseQuery` hydrated from the loader. \[1]
* db query collection: `createCollection(queryCollectionOptions({ queryKey, queryFn, queryClient, getKey }))` → component reads via live query. \[11]\[12]
* mutation (server-first): `createServerFn(...).handler(...)` → on success: `qc.invalidateQueries`, `router.invalidate`. supports `<form action={serverFn.url}>`. \[2]
* db persistence handlers (client-first): `onInsert` / `onUpdate` / `onDelete` → return `{ refetch?: boolean }` to control refetch; pair with direct writes when skipping refetch. \[13]
* search params as state: `validateSearch → Route.useSearch → navigate({ search })`. \[3]
* external store read: `useSyncExternalStore(subscribe, getSnapshot)`. \[5]
* hydration-safe interaction: `import { startTransition } from 'react'` → wrap sync updates; avoid `useTransition` during hydration; avoid rendering `isPending` until post-hydration. \[10]

## decision checklist

* needed at render → loader (defer/stream as needed). \[1]\[7]
* user changed data → server function → invalidate query/router; or db handlers/direct writes. \[2]\[13]
* belongs in url → typed search params. \[3]
* purely derived → compute in render or live query. \[4]\[12]
* external system only → effect (`useEffect` or `useLayoutEffect`). \[6]
* hydration sensitive

  * during hydration, any update that suspends → fallback
  * wrap sync updates with `startTransition` (direct import); avoid showing `isPending`; external stores will still fallback. \[10]
* ssr/seo → loader-based fetching with streaming/deferred; dehydrate/hydrate caches and db snapshots. \[7]

## react 19 helpers

* `useActionState` for form pending, error, and result (pairs with server functions or tanstack form). \[8]
* `use` to suspend on promises (client or server). \[9]

## hydration and suspense playbook \[10]

key insight: synchronous state updates that cause suspense during hydration will replace ssr content with the fallback.

quick fix for most cases: wrap updates with `startTransition` (direct import).

```tsx
import { startTransition } from 'react'
const onClick = () => startTransition(() => setCount(c => c + 1))
```

async edge: transition context is lost after `await`. re-wrap after the await (direct import only).

```tsx
import { startTransition } from 'react'
startTransition(async () => {
  await api.call()
  startTransition(() => setCount(c => c + 1))
})
```

avoid during hydration:

* using `useTransition` for the update (triggers fallbacks)
* rendering `isPending`
* `useDeferredValue` unless the suspensey child is memoized
* any `useSyncExternalStore` mutation (always triggers fallbacks during hydration)

safe during hydration:

* `useState` or `useReducer` setting the same value
* `startTransition` (direct import) wrapped sync updates
* `useDeferredValue` with `React.memo` around the suspensey child

note on compiler-based memoization: reports indicate automatic memoization can prevent many hydration fallbacks. treat as optimization, verify in your app.

## tanstack db: when and how \[11]\[12]\[13]\[14]\[15]

use db for server-synced domain data.

load paths:

* query collection (`queryCollectionOptions`) → simple fetch; optional refetch after mutations. \[11]
* sync collections (electric, trailbase, rxdb) → live sync into a collection. \[14]

read with live queries (reactive, incremental; supports joins, groupBy, distinct, order, limit). \[12]

write paths:

* server-first: mutate via server function → `router.invalidate()` / `qc.invalidateQueries()` to reconcile loader/query state. \[2]
* client-first: use collection `onInsert` / `onUpdate` / `onDelete`. return `{ refetch: false }` if reconciling via direct writes or realtime; keep default refetch for simplicity. \[13]
* direct writes: `writeInsert` / `writeUpdate` / `writeDelete` / `writeUpsert` / `writeBatch` for websocket or sse deltas, incremental pagination, or server-computed fields; bypass optimistic layer and skip refetch. \[13]

important behaviors:

* query collection treats `queryFn` result as full state; returning an empty array deletes all items. merge partial fetches with cached data before returning. \[13]
* transaction merging reduces churn

  * insert then update → stays insert with merged changes
  * insert then delete → cancels out
  * update then delete → delete
  * update then update → single update with unioned changes
  * same type back-to-back → keep the latest \[15]
* per-request store instances on ssr; never touch storage during ssr. \[16]\[14]

db vs zustand quick picks:

* db: remote truth, lists/tables, cross-collection joins, optimistic mutations, live sync, realtime patches
* zustand: local ui/session flows (theme, wizards, modals), push-based ephemeral domain state, websocket buffers (not the authoritative server data). if you optimistically mirror server data in zustand, reconcile via `router.invalidate()` or db refresh and clear transient ui on `router.subscribe('onResolved', ...)`. \[16]

## ssr, streaming, and hydration with router and db

* in loaders: seed query via `ensureQueryData`. for db, preload collections or dehydrate/hydrate db snapshots alongside the router so lists render instantly and stream updates. \[1]\[7]\[12]\[14]
* after mutations: prefer router/query invalidation for loader-owned data; for db-owned data, either let the collection refetch or apply direct writes (especially for acknowledged websocket or server responses). \[2]\[13]

## micro-recipes

* avoid first-click flash to spinner after ssr: wrap click handlers with `startTransition` (direct import). do not render `isPending` until after hydration. \[10]
* external store during hydration: either defer interaction until hydrated, or isolate the suspense boundary away from the store-driven region. expect fallbacks if the store changes. \[5]\[10]
* paginated load-more for large lists: fetch next page, then `collection.utils.writeBatch(() => writeInsert(...))` to append without refetching old pages. \[13]
* realtime patches: apply `writeUpsert` or `writeDelete` directly from the socket callback inside a `writeBatch`. \[13]

## docs map

\[1] router data loading · \[2] server functions · \[3] search params · \[4] you might not need an effect · \[5] `useSyncExternalStore` · \[6] synchronizing with effects · \[7] ssr/streaming · \[8] `useActionState` · \[9] `use` · \[10] hydration and suspense behavior guide (this section) · \[11] tanstack db query collection · \[12] live queries · \[13] direct writes and persistence handlers · \[14] collections catalog (electric, trailbase, rxdb, localstorage, localonly) · \[15] transactions and optimistic actions · \[16] zustand in tanstack start </rule>
