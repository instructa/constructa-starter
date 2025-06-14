import { Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { getSessionOrNull } from "~/server/auth";

export const Route = createFileRoute({
	// All children (/dashboard, /dashboard/settings, etc.) inherit this guard
	loader: async ({ request }) => {
		const session = await getSessionOrNull(request);

		if (!session) {
			// Preserve deep link for redirect after sign-in
			const currentUrl = new URL(request.url);
			const redirectPath = currentUrl.pathname + currentUrl.search;

			throw redirect({
				to: "/auth/sign-in",
				search: { redirect: redirectPath },
				status: 303,
			});
		}

		// Strip any unnecessary fields before returning
		return {
			user: {
				id: session.user.id,
				email: session.user.email,
				name: session.user.name,
				image: session.user.image,
				emailVerified: session.user.emailVerified,
			},
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
