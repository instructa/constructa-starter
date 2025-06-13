import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth-client";

export function useAuth() {
	const { data: session, isLoading } = useQuery({
		queryKey: ["auth-session"],
		queryFn: async () => {
			const { data } = await authClient.getSession();
			return data;
		},
	});

	return {
		user: session?.user || null,
		isAuthenticated: !!session?.user,
		isLoading,
		session,
	};
}
