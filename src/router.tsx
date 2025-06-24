import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary"
import { NotFound } from "./components/NotFound"
import { routeTree } from "./routeTree.gen"
import { queryClient } from "./lib/convex-query-client"

export function createRouter() {

    return routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: { queryClient },
            defaultPreload: "intent",
            defaultErrorComponent: DefaultCatchBoundary,
            defaultNotFoundComponent: () => <NotFound />
        }),
        queryClient
    )
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
