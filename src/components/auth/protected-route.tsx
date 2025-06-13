import { SignedIn, SignedOut } from "@daveyplate/better-auth-ui";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<Navigate to="/auth/$pathname" params={{ pathname: "sign-in" }} />
			</SignedOut>
		</>
	);
}
