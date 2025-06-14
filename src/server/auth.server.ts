import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { reactStartCookies } from 'better-auth/react-start';
import { db } from '~/db/db-config';
import { sendEmail } from './email';
import { randomUUID } from "crypto" // new – for CSRF token fallback

const isProd = process.env.NODE_ENV === "production";

const isEmailVerificationEnabled = process.env.ENABLE_EMAIL_VERIFICATION === 'true';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
	plugins: [
	reactStartCookies({
		// 1️⃣  Secure session cookie options
		cookieName: process.env.SESSION_COOKIE_NAME ?? "ex0_session",
		cookieOptions: {
		httpOnly: true,
		secure: isProd,
		sameSite: "lax",
		path: "/",
		},
	}),
	],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: isEmailVerificationEnabled,
    sendResetPassword: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Reset your password',
          html: `
						<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
							<h2>Reset Your Password</h2>
							<p>You requested to reset your password. Click the button below to continue:</p>
							<a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a>
							<p style="margin-top: 20px; color: #666;">Or copy and paste this link into your browser:</p>
							<p style="word-break: break-all; color: #666;">${url}</p>
							<p style="margin-top: 30px; color: #999; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
						</div>
					`,
        });
      } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw error; // We want password reset failures to propagate
      }
    },
  },
  emailVerification: {
    // Only send verification emails if verification is enabled
    sendOnSignUp: isEmailVerificationEnabled,
    autoSignInAfterVerification: true,
    sendVerificationEmail: isEmailVerificationEnabled
      ? async ({ user, url }) => {
          try {
            await sendEmail({
              to: user.email as string,
              subject: 'Verify your email address',
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
            console.error('Failed to send verification email:', error);
            // Don't throw here to prevent sign-up from failing
          }
        }
      : undefined,
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