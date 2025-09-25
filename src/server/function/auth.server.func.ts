import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../auth.server";

/**
 * Server function to get the current session
 * Verifies cookie, checks token expiry, and handles refresh tokens
 */
export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		try {
			const { headers } = getRequest();
			const session = await auth.api.getSession({
				headers,
			});

			if (!session?.user) {
				return null;
			}

			return {
				user: {
					id: session.user.id,
					email: session.user.email,
					name: session.user.name,
					image: session.user.image,
					emailVerified: session.user.emailVerified,
				},
			};
		} catch (error) {
			console.error("Session verification failed:", error);
			return null;
		}
	},
);
