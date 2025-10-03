import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { reportRouteNotFound } from "~/lib/observability/report-not-found";

export function NotFound({ children }: { children?: any }) {
    const location = useRouterState({ select: (state) => state.location });

    useEffect(() => {
        if (!location) return;
        void reportRouteNotFound({
            pathname: location.pathname,
            search: typeof window !== "undefined" ? window.location.search : null,
            href: typeof window !== "undefined" ? window.location.href : location.href,
        });
    }, [location?.href, location?.pathname]);

    return (
        <div className="space-y-2 p-2">
            <div className="text-gray-600 dark:text-gray-400">
                {children || <p>The page you are looking for does not exist.</p>}
            </div>
            <p className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => window.history.back()}
                    className="rounded bg-emerald-500 px-2 py-1 font-black text-sm text-white uppercase"
                >
                    Go back
                </button>
                <Link
                    to="/"
                    className="rounded bg-cyan-600 px-2 py-1 font-black text-sm text-white uppercase"
                >
                    Start Over
                </Link>
            </p>
        </div>
    );
}
