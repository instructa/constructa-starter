# React Hydration + Suspense

## Core error

Error: A component suspended while responding to synchronous input. Wrap updates that suspend with startTransition.

## Key rule

During hydration, any synchronous state change breaks Suspense and shows fallbacks. Prevent by wrapping updates with startTransition.

## 90% fix

* `startTransition(() => setState(...))`
* Async:
  `startTransition(async () => { await x(); startTransition(() => setState(...)) })`
* External stores: `useSyncExternalStore` always triggers fallbacks; no real workaround.

## Behavior matrix (compressed)

* useState/useReducer new value: triggers; React Compiler prevents
* Same value: never triggers
* startTransition (direct import, sync): prevents
* useTransition (hook, sync): triggers during hydration
* startTransition after await: triggers (lost context)
* startTransition double-wrapped with direct import: prevents
* startTransition double-wrapped with useTransition: still triggers
* startTransition + rendering isPending: triggers
* useDeferredValue: triggers; with React.memo: prevents
* useSyncExternalStore: always triggers; React Compiler prevents

## What triggers fallbacks (even with full SSR HTML)

* Plain setState/dispatch during hydration
* External store mutations
* useTransition-wrapped updates
* Async updates after await unless re-wrapped with direct-import startTransition
* Rendering isPending
* useDeferredValue (unless memoized)

## What doesn’t

* No actual state change (same value)
* startTransition (direct import) for sync updates
* Correct double-wrap pattern for async (direct import)
* Deferred value when the child is memoized

## Why

* External stores can’t be transitioned
* Transition context is lost across await
* Rendering isPending causes extra non-transitioned renders

## React Compiler

Automatic memoization prevents observed hydration fallbacks; makes most manual startTransition wrapping unnecessary (per tests).

## Testing method (E2E)

SSR via renderToPipeableStream → open prebuilt HTML → wait for hydration → click → assert boundary content stays visible. Real browsers, Playwright, lazy components with delays.

## Practical takeaways

* Wrap interactive hydration-time updates with startTransition (direct import)
* For async, re-enter a new startTransition after await
* Don’t rely on useTransition for hydration; avoid rendering isPending during hydration
* External stores will flash; consider alternatives or React Compiler
* Same-value updates are skipped
