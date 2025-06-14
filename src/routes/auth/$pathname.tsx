import { AuthCard } from "@daveyplate/better-auth-ui";
import {, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = Route.useParams();
	const search = useSearch({ from: "/auth/$pathname" });
	const redirect = (search as any)?.redirect || "/dashboard";

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4">
			<AuthCard pathname={pathname} callbackURL={redirect} />
		</main>
	);
}
