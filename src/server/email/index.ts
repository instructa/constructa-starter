import {
  ConsoleProvider,
  type EmailProvider,
  MailhogProvider,
  ResendProvider,
  SMTPProvider,
} from './providers';

let emailProvider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (emailProvider) {
    return emailProvider;
  }

  const provider =
    process.env.EMAIL_PROVIDER ??
    (process.env.NODE_ENV === 'production' ? 'smtp' : 'mailhog');

  switch (provider) {
    case 'resend':
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is required for Resend provider');
      }
      emailProvider = new ResendProvider(process.env.RESEND_API_KEY);
      break;

    case 'smtp':
      if (!process.env.SMTP_HOST) {
        throw new Error('SMTP_HOST is required for SMTP provider');
      }
      emailProvider = new SMTPProvider({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS || '',
            }
          : undefined,
      });
      break;

    case 'mailhog':
      if (process.env.NODE_ENV === 'production') {
        console.warn(
          'Email provider is set to mailhog while NODE_ENV=production. Switch to SMTP or another transactional provider before deploying.'
        );
      }
      emailProvider = new MailhogProvider(
        process.env.MAILHOG_HOST || 'localhost',
        Number.parseInt(process.env.MAILHOG_PORT || '1025')
      );
      break;

    default:
      emailProvider = new ConsoleProvider();
      break;
  }

  /* eslint-disable no-console */
  console.log(`Email provider initialized: ${provider}`);
  return emailProvider;
}

export async function sendEmail(params: {
  from?: string;
  to: string;
  subject: string;
  html: string;
}) {
  const provider = getEmailProvider();
  const from = params.from || process.env.EMAIL_FROM || 'noreply@localhost';

  await provider.sendEmail({
    ...params,
    from,
  });
}
