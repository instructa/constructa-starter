import { Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { getSession } from "~/server/function/auth.server.func";

export const Route = createFileRoute({
	// All children (/dashboard, /dashboard/settings, etc.) inherit this guard
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		if (!session) {
			// Preserve deep link for redirect after sign-in
			const redirectPath = location.pathname + location.search;

			throw redirect({
				to: "/auth/$pathname",
				params: { pathname: "sign-in" },
				search: { redirect: redirectPath },
			});
		}

		return {
			user: session.user,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
