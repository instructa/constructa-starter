import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { reactStartCookies } from "better-auth/react-start"
import { db } from "./db"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email verification is disabled by default for development
const enableEmailVerification = process.env.ENABLE_EMAIL_VERIFICATION === 'true'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: enableEmailVerification,
    sendResetPassword: async ({ user, url, token }: { user: any, url: any, token: any }) => {
      console.log(`Password reset for ${user.email}:`);
      console.log(`Reset URL: ${url}`);
      console.log(`Token: ${token}`);
      // In production, replace this with actual email sending
      // You can use services like Resend, SendGrid, etc.
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: 'Reset your password',
        html: `<a href="${url}">Click here to reset your password</a>`
      });
    },

  },
  emailVerification: {
    sendOnSignUp: enableEmailVerification,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }: { user: any, url: any, token: any }) => {
      console.log(`Email verification for ${user.email}:`);
      console.log(`Verification URL: ${url}`);
      console.log(`Token: ${token}`);
      // In production, replace this with actual email sending
      // You can use services like Resend, SendGrid, etc.
      if (enableEmailVerification) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: user.email,
          subject: 'Verify your email',
          html: `<a href="${url}">Click here to verify your email</a>`
        });
      }
    },
  },
  plugins: [reactStartCookies()],
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
})