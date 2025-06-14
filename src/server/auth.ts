import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "~/db/db-config";
import type { user } from "~/db/schema/auth.schema";
import { sendEmail } from "./email";

type User = typeof user.$inferSelect;

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	plugins: [reactStartCookies()],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION === "true",
	},
	emailVerification: {
		sendOnSignUp: process.env.ENABLE_EMAIL_VERIFICATION === "true",
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			console.log("=== EMAIL VERIFICATION TRIGGERED ===");
			console.log(
				`ENABLE_EMAIL_VERIFICATION: ${process.env.ENABLE_EMAIL_VERIFICATION}`,
			);
			console.log(`Email verification for ${user.email}:`);
			console.log(`Verification URL: ${url}`);
			console.log(`Token: ${token}`);
			console.log("=====================================");

			try {
				await sendEmail({
					to: user.email as string,
					subject: "Verify your email address",
					html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2>Verify your email address</h2>
							<p>Please click the button below to verify your email address:</p>
							<a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a>
							<p style="margin-top: 20px; color: #666;">Or copy and paste this link into your browser:</p>
							<p style="word-break: break-all; color: #666;">${url}</p>
							<p style="margin-top: 30px; color: #999; font-size: 14px;">If you didn't request this email, you can safely ignore it.</p>
						</div>
					`,
				});
			} catch (error) {
				console.error("Failed to send verification email:", error);
				// Don't throw here to prevent sign-up from failing
			}
		},
	},
	socialProviders: {
		...(process.env.GITHUB_CLIENT_ID && {
			github: {
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			},
		}),
		...(process.env.GOOGLE_CLIENT_ID && {
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			},
		}),
	},
});

export default auth;
