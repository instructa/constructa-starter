import { Outlet } from "@tanstack/react-router";
import { Header } from "~/components/Header";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}
