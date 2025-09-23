# TanStack Server Functions

Server-only logic callable anywhere (loaders, hooks, components, routes, client) and defined at file top level. No stable public URL. Like API Routes: request context, headers/cookies, env secrets, arbitrary work, primitive/JSON/Response returns, redirect/notFound throws.

# Differences from React Server Functions

Framework-agnostic, standard HTTP, no serial bottlenecks.

# How They Work

Server bundle executes code. Client bundle strips functions and proxies via fetch. RPC but isomorphic. Middleware supported.

# Defining Functions

Use `createServerFn(options).handler`. Options:

* `method`: GET|POST (default GET)
* `response`: data|full|raw (`raw` allows streaming/custom headers)
  Callable from server, client, or other server functions.

# Parameters

Single param may be primitive, Array, Object, FormData, ReadableStream, or Promise. Typical call `{ data, signal? }`.

# Validation & Types

`.validator` enforces runtime input and drives types. Works with Zod. Transformed output becomes `ctx.data`. Identity validator supports typed I/O without checks.

# JSON & FormData

Supports JSON. With FormData use `encType="multipart/form-data"`.

# Context (from @tanstack/react-start/server, h3)

`getWebRequest`, `getHeaders|getHeader`, `setHeader`, `setResponseStatus`, cookies/sessions, multipart, custom server context.

# Returns

Primitives/JSON, redirect/notFound, or Response (`response:'raw'`).

# Errors

Thrown errors serialized to 500 JSON; catch as needed.

# Cancellation

Supports AbortSignal. Server notified on disconnect.

# Integration

Route lifecycles auto-handle redirect/notFound. Components use `useServerFn`. Elsewhere handle manually.

# Redirects

Use `redirect` from @tanstack/react-router with `to|href`, `status`, `headers`, path/search/hash/params. SSR: 302. Client auto-handles. Do not use `sendRedirect`.

# Not Found

Use `notFound()` for router 404 in lifecycles.

# No-JS

Execute via HTML form with `serverFn.url`. Pass args with inputs. Use encType for multipart. Cannot read return value, must redirect or reload via loader.

# Static Functions

`createServerFn({ type:'static' })` caches build-time result as static JSON (key: function ID+params hash). Used in prerender and hydration. Later client calls fetch static JSON. Default cache uses fs+fetch; override with `createServerFnStaticCache` + `setServerFnStaticCache`.

# Compilation

Injects `use server` if missing. Client extracts to server bundle and proxies. Server runs as-is. Dead-code elimination applied.

# Notes

Inspired by tRPC; pairs well with it for API Routes.

- Always invoke `normalizeInput(schema, preprocess?)` inside the server-function handler. Do not rely on the `.validator()` helper for payload shaping.
- When writing a `preprocess` helper, unwrap common wrappers (e.g. `{ data: ... }`, SuperJSON `$values`, stringified arrays) so validation runs on the real payload.
