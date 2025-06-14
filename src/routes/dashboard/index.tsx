import {
	AuthLoading,
	RedirectToSignIn,
	SignedIn,
} from "@daveyplate/better-auth-ui";
import { redirect } from "@tanstack/react-router";
import {} from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			{/* Show loading skeleton while checking authentication */}
			<AuthLoading>
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
						<div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
					</div>
				</div>
			</AuthLoading>

			{/* Redirect to sign-in if not authenticated */}
			<RedirectToSignIn />

			{/* Only show dashboard content to authenticated users */}
			<SignedIn>
				<div className="container mx-auto py-8">
					<h1 className="text-3xl font-bold mb-4">Dashboard</h1>
					<p>Welcome to your dashboard!</p>
				</div>
			</SignedIn>
		</>
	);
}
