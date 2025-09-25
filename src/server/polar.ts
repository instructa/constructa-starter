import { Polar } from '@polar-sh/sdk';
import { polarEnv } from '~/conf/polar';

export const polar = new Polar({
  accessToken: polarEnv.POLAR_ACCESS_TOKEN,
  server: polarEnv.POLAR_SERVER,
});

type CustomerIdentity = { id: string; email: string; name?: string | null };

export async function upsertPolarCustomerByExternalId(user: CustomerIdentity) {
  return polar.customers.updateExternal({
    externalId: user.id,
    customerUpdateExternalID: {
      email: user.email,
      name: user.name ?? user.email.split('@')[0],
    },
  });
}

export async function createCustomerPortalUrlForUser(user: { id: string }) {
  const session = await polar.customerSessions.create({ externalCustomerId: user.id });
  return session.customerPortalUrl;
}

export async function listOrdersByExternalCustomerId(userId: string, limit = 50) {
  const list = await polar.orders.list({
    limit,
    externalCustomerId: userId,
    organizationId: polarEnv.POLAR_ORGANIZATION_ID,
  });

  return list.items;
}

export async function ensureOrderInvoice(orderId: string) {
  try {
    return await polar.orders.getInvoice({ id: orderId });
  } catch {
    await polar.orders.generateInvoice({ id: orderId });

    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      try {
        return await polar.orders.getInvoice({ id: orderId });
      } catch {
        // retry
      }
    }

    throw new Error('Invoice not ready yet');
  }
}

export async function getCustomerStateByExternalId(userId: string) {
  return polar.customers.stateExternalGet({ externalId: userId });
}
