import { convexAdapter } from '@better-auth-kit/convex';
import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { api } from './_generated/api';

const auth = betterAuth({
  database: convexAdapter({ api }),
  plugins: [
    magicLink({
      async sendMagicLink({ email, url }) {
        // This will be handled by the email provider
        // For now, we'll just log it
        console.log('Magic link:', { email, url });
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION === 'true',
  },
  emailVerification: {
    sendOnSignUp: process.env.ENABLE_EMAIL_VERIFICATION === 'true',
    autoSignInAfterVerification: true,
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
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
  },
});