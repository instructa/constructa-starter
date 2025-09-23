TanStack DB in 60 seconds (token-tight)

What it is

* Reactive client store extending TanStack Query with collections, live queries, optimistic mutations; uni-directional data flow; live queries via d2ts (incremental, sub-ms).

Core loop

* Define collections → read via live queries → mutate optimistically; local overlay until backend confirms; auto rollback on error.

Collections

* QueryCollection: fetch via TanStack Query.
* ElectricCollection: sync Postgres subsets via ElectricSQL Shapes.
* TrailBaseCollection: sync TrailBase Record APIs; parse/serialize hooks.
* RxDBCollection: bridge RxDB (replication, offline).
* LocalStorageCollection: small local state, cross-tab sync.
* LocalOnlyCollection: in-memory UI/session state.
* Derived collections: live queries return collections.
* Schemas: Standard Schema (Zod, Effect) for validation and types; if schema provided, no generic type param.

Live queries

* Reactive, incremental, support joins; results are collections.
* Framework hooks: React useLiveQuery; Angular injectLiveQuery.

Query builder essentials

* from one source; where with eq, gt, gte, lt, lte, like, ilike, inArray, and, or, not.
* select projections, renames, computed fields (upper, lower, length, concat, coalesce, add).
* joins: left default; right, inner, full; equality conditions only.
* subqueries: in from and join; deduped when reused.
* groupBy + aggregates: count, sum, avg, min, max; having.
* distinct requires select.
* orderBy asc|desc; limit; offset.
* Composability: reusable Query, cached intermediates.
* Functional variants fn.select, fn.where, fn.having for complex JS logic; less optimizable.

Mutations and transactions

* insert, update, delete; onInsert/onUpdate/onDelete handlers persist writes.
* mutationFn must await server write + sync/refetch before returning (drops optimistic state safely).
* createOptimisticAction for custom actions; createTransaction for manual batching.
* Control optimistic: optimistic true (default) vs false for critical/validated/batch operations.

Transaction lifecycle

* pending → persisting → completed → failed.

Mutation merging (same item within a transaction)

* insert+update → insert (merge)
* insert+delete → removed
* update+delete → delete
* update+update → update (union changes)
* same type → latest wins

Error handling

* Named errors: SchemaValidationError (type, issues), CollectionInErrorStateError, DuplicateKeyError, MissingHandlerError, TransactionError, etc.
* QueryCollection error utils: lastError(), isError(), errorCount(), clearError().
* Status flags: idle, loading, initialCommit, ready, error, cleaned-up.
* Common pitfalls: operations blocked in error state until cleanup; direct mutations need handlers; schema validation must be sync; duplicate keys throw.
* Sync errors: collections still marked ready; cached data shown; retries supported; cleanup errors isolated.
* Recovery patterns: cleanup and restart; graceful degradation; rollback cascading on conflicts; invalid state guards.
* Best practices: use instanceof; check flags; handle isPersisted.promise; import only needed error types.

Create custom collection options (collection options creator)

* When: custom sync engine/protocol or non-Query needs.
* Must provide: config interface; sync(begin, write, commit, markReady) with listener-before-fetch buffering and dedupe; cleanup; parse/serialize for type conversion; rowUpdateMode partial|full.
* Mutation handlers

  * Pattern A: user-provided handlers (Query, Electric).
  * Pattern B: built-in handlers calling provider APIs (TrailBase, RxDB); chunk for batch limits.
* Managing optimistic state until sync

  * Provider wait methods (eg waitForPendingWrites)
  * Transaction id tracking (awaitTxId)
  * ID-based tracking (awaitIds)
  * Version/timestamp waits
  * Full refetch strategy (simplest)
* Testing: unit, integration, error, performance.
* Practices: always markReady; buffer events; batch writes; clean up resources.

Query Collection specifics

* Install: @tanstack/query-db-collection, @tanstack/query-core, @tanstack/db.
* Required: queryKey, queryFn, queryClient, getKey.
* Options: enabled, refetchInterval, retry, retryDelay, staleTime, meta; id, schema, sync, startSync.
* Handlers: onInsert/onUpdate/onDelete; return { refetch: false } to skip auto-refetch.
* Utils: refetch().

Direct writes (to synced store; no optimistic layer; no auto-refetch)

* writeInsert, writeUpdate, writeDelete, writeUpsert.
* writeBatch(cb) for atomic multi-ops.
* Use cases: socket/SSE deltas, large datasets, server-computed fields, pagination.

Important behaviors

* queryFn result is complete state; missing items are deleted; present items upserted.
* Empty array deletes all.
* For incremental fetches: merge with cached state before returning; handle deletions if provided.
* Direct writes update cache immediately; query sync still authoritative unless refetch suppressed/tuned.