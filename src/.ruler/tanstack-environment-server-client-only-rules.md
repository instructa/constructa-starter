# ClientOnly

* Client-only render to avoid SSR hydration issues
* Props: fallback (loading UI), children (post-hydration UI)

# Environment functions

* createIsomorphicFn(): env-specific implementation (server/client)
* serverOnly(fn), clientOnly(fn): hard-gate execution by env
* Tree-shaken per bundle (client stripped from server, and vice versa)

# TanStack Start basics

* Depends: @tanstack/react-router, Vite
* Router: getRouter()
* routeTree.gen.ts auto-generated on first dev run
* Optional entries: server handler via @tanstack/react-start/server; client hydrate via StartClient
* Root route head: utf-8, viewport, title; component wraps Outlet in RootDocument
* Routes: createFileRoute() ⇒ code-split + lazy-load; loader runs server/client
* Navigation: Link (typed), useNavigate (imperative), useRouter (instance)

# Server functions (RPCs)

* createServerFn({ method }) + zod .inputValidator + .handler(ctx)
* After mutations: router.invalidate(); queryClient.invalidateQueries(\['entity', id])

# Typed Links

* Link to="/posts/\$postId" with params; activeProps for styling
