import { AuthCard } from "@daveyplate/better-auth-ui";
import { redirect } from "@tanstack/react-router";
import { getSession } from "~/server/auth";

export const Route = createFileRoute({
	beforeLoad: async ({ params }: { params: { pathname: string } }) => {
		// Only check session for sign-in and sign-up routes
		if (params.pathname === "sign-in" || params.pathname === "sign-up") {
			const session = await getSession();
			if (session?.user) {
				// User is already logged in, redirect to dashboard
				throw redirect({
					to: "/dashboard",
				});
			}
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = Route.useParams();

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4">
			<AuthCard pathname={pathname} />
		</main>
	);
}
