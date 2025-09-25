import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '~/db/db-config';
import { billingInfo } from '~/db/schema/billing.schema';
import { upsertPolarCustomerByExternalId, polar } from '~/server/polar';
import { requireUser } from '~/server/require-user';

const BillingSchema = z.object({
  billingEmail: z.string().email(),
  company: z.string().optional().nullable(),
  line1: z.string().optional().nullable(),
  line2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().length(2).optional().nullable(),
  vat: z.string().optional().nullable(),
});

type BillingPayload = z.infer<typeof BillingSchema>;

export const Route = createFileRoute('/api/settings/billing')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await requireUser(request);

        const [info] = await db.select().from(billingInfo).where(eq(billingInfo.userId, user.id));

        const profile: BillingPayload = {
          billingEmail: info?.billingEmail ?? user.email,
          company: info?.company ?? '',
          line1: info?.line1 ?? '',
          line2: info?.line2 ?? '',
          city: info?.city ?? '',
          state: info?.state ?? '',
          postalCode: info?.postalCode ?? '',
          country: info?.country ?? '',
          vat: info?.vat ?? '',
        };

        return Response.json({ profile, invoices: [] });
      },
      PATCH: async ({ request }) => {
        const user = await requireUser(request);
        const body = await request.json();
        const parsed = BillingSchema.safeParse(body);

        if (!parsed.success) {
          return new Response('Invalid payload', { status: 422 });
        }

        const data = parsed.data;

        await db
          .insert(billingInfo)
          .values({ userId: user.id, ...data })
          .onConflictDoUpdate({
            target: billingInfo.userId,
            set: { ...data, updatedAt: new Date() },
          });

        await upsertPolarCustomerByExternalId({ id: user.id, email: data.billingEmail, name: user.name });

        await polar.customers.updateExternal({
          externalId: user.id,
          customerUpdateExternalID: {
            email: data.billingEmail,
            name: user.name ?? null,
            billingAddress: data.line1
              ? {
                  line1: data.line1 ?? undefined,
                  line2: data.line2 ?? undefined,
                  postalCode: data.postalCode ?? undefined,
                  city: data.city ?? undefined,
                  state: data.state ?? undefined,
                  country: data.country ?? undefined,
                }
              : null,
            taxId: data.vat ? [data.vat, guessVatType(data.vat)] : null,
          },
        });

        return new Response(null, { status: 204 });
      },
    },
  },
});

function guessVatType(value: string) {
  return /^[A-Z]{2}/i.test(value) ? 'eu_vat' : 'us_ein';
}
