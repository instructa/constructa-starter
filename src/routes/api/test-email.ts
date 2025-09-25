/* eslint-disable no-console */
import { createFileRoute } from '@tanstack/react-router';
import { sendEmail } from '~/server/email';

export const Route = createFileRoute('/api/test-email')({
  server: {
    handlers: {
      GET: async () => {
        try {
          await sendEmail({
            to: 'test@example.com',
            subject: 'Test Email',
            html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h1>Test Email</h1>
						<p>If you can see this email, the email system is working correctly!</p>
						<p>Provider: ${process.env.EMAIL_PROVIDER || 'console'}</p>
						<p>Time: ${new Date().toISOString()}</p>
					</div>
				`,
          });

          return Response.json({
            success: true,
            message: 'Test email sent!',
            provider: process.env.EMAIL_PROVIDER || 'console',
          });
        } catch (error) {
          console.error('Failed to send test email:', error);
          return Response.json(
            {
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
          );
        }
      },
    },
  },
});
