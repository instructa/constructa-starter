import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { z } from 'zod';

import { auth } from '~/server/auth.server';

const inputSchema = z
  .object({
    email: z.string().email().optional(),
    callbackURL: z.string().min(1).optional(),
  })
  .optional();

export const resendVerificationEmail = createServerFn({ method: 'POST' })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async (input) => {
    const emailVerificationEnabled = process.env.ENABLE_EMAIL_VERIFICATION === 'true';

    if (!emailVerificationEnabled) {
      return {
        success: false as const,
        error: 'EMAIL_VERIFICATION_DISABLED' as const,
      };
    }

    const callbackURL = input?.callbackURL ?? '/dashboard';

    if (input?.email) {
      await auth.api.sendVerificationEmail({
        body: {
          email: input.email,
          callbackURL,
        },
      });
      return { success: true } as const;
    }

    const { headers } = getRequest();
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw new Error('UNAUTHORIZED');
    }

    await auth.api.sendVerificationEmail({
      headers,
      body: {
        email: session.user.email,
        callbackURL,
      },
    });

    return { success: true } as const;
  });
