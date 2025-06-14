import { AuthCard } from "@daveyplate/better-auth-ui";
import { } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute({
	validateSearch: searchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = Route.useParams();
	const { redirect } = Route.useSearch();
	const callbackURL = redirect || "/dashboard";

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4">
			<AuthCard pathname={pathname} callbackURL={callbackURL} />
		</main>
	);
}
