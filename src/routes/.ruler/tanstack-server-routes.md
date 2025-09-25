# Server Routes — TanStack Start

## Purpose

Server HTTP endpoints for raw requests, forms, auth.

## Location

./src/routes; any file exporting ServerRoute becomes an API route.

## Server + App in one file

ServerRoute and Route can coexist; client can fetch('/path').

## Routing

Mirrors TanStack Router; dynamic \$id; splat \$; escaped \[.] for literals; nested dirs or dotted filenames map to nested paths; exactly one handler per resolved path (duplicates error).

## Examples

users.ts → /users; users.index.ts → /users (dup methods error); users/\$id.ts → /users/\$id; users/\$id/posts.ts or users.\$id.posts.ts → /users/\$id/posts; api/file/\$.ts → /api/file/\$; my-script\[.]js.ts → /my-script.js.

## Middleware scope

Pathless layout routes add group middleware; break-out routes skip parents.

## Server entry

Server entry follows RC1 patterns (see src/start.ts for implementation). Uses createStart() with middleware registration.

## Define handlers

Use createFileRoute() and wrap server handlers inside `server: { handlers: { ... } }` structure. Methods per HTTP verb, directly or via builder with middleware.

## Handler context

request, params, context; return Response or Promise<Response>; helpers from @tanstack/react-start allowed.

## Bodies

request.json(), request.text(), request.formData() for POST/PUT/PATCH/DELETE.

## JSON, status, headers

Return JSON manually or via json(); set status via Response init or setResponseStatus(); set headers via Response init or setHeaders().

## Params recap

/users/\$id → params.id; /users/\$id/posts/\$postId → params.id + params.postId; /file/\$ → params.\_splat.

## Unique path rule

Only one file per resolved path; users.ts vs users.index.ts vs users/index.ts conflicts.

## API Route Structure (RC1)

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/example')({
  server: {
    handlers: {
      GET: ({ request }) => new Response('Hello'),
      POST: ({ request }) => new Response('Created', { status: 201 })
    }
  }
})
```

Previously: `createServerFileRoute('/api/example').methods({ GET: ..., POST: ... })`
