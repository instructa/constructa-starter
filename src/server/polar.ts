import { Polar } from '@polar-sh/sdk';
import { polarEnv } from '~/conf/polar';

export const polar = new Polar({
  accessToken: polarEnv.POLAR_ACCESS_TOKEN,
  server: polarEnv.POLAR_SERVER,
});

type CustomerIdentity = { id: string; email: string; name?: string | null };

export async function upsertPolarCustomerByExternalId(user: CustomerIdentity) {
  const name = user.name ?? user.email.split('@')[0];

  const isUuid = /^[0-9a-fA-F-]{36}$/.test(user.id);

  try {
    if (isUuid) {
      return await polar.customers.update({
        id: user.id,
        customerUpdate: {
          email: user.email,
          name,
          externalId: user.id,
        },
      });
    }
  } catch (error: any) {
    if (error?.error !== 'RequestValidationError' && error?.error !== 'ResourceNotFound') {
      console.error('[polar] unexpected error updating customer by id', error);
      throw error;
    }
  }

  try {
    return await polar.customers.updateExternal({
      externalId: user.id,
      customerUpdateExternalID: {
        email: user.email,
        name,
      },
    });
  } catch (error: any) {
    if (error?.error !== 'ResourceNotFound') {
      console.error('[polar] updateExternal failed', error);
      throw error;
    }
  }

  // Create customer if it doesn't exist yet
  return polar.customers.create({
    email: user.email,
    name,
    externalId: user.id,
  });
}

export async function createCustomerPortalUrlForUser(user: { id: string }) {
  const session = await polar.customerSessions.create({ externalCustomerId: user.id });
  return session.customerPortalUrl;
}

export async function listOrdersByExternalCustomerId(userId: string, limit = 50) {
  let customerId: string | null = null;

  try {
    const customer = await polar.customers.getExternal({ externalId: userId });
    customerId = customer.id;
  } catch (error: any) {
    if (error?.error === 'ResourceNotFound') {
      return [];
    }
    console.error('[polar] failed to resolve customer by external id', error);
    throw error;
  }

  const iterator = await polar.orders.list({
    customerId,
    organizationId: polarEnv.POLAR_ORGANIZATION_ID,
    limit,
  });

  const orders: Awaited<ReturnType<typeof polar.orders.get>>[] = [];

  for await (const page of iterator) {
    orders.push(...page.result.items);
    if (orders.length >= limit) {
      break;
    }
  }

  return orders.slice(0, limit);
}

export async function ensureOrderInvoice(orderId: string) {
  try {
    return await polar.orders.invoice({ id: orderId });
  } catch {
    await polar.orders.generateInvoice({ id: orderId });

    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      try {
        return await polar.orders.invoice({ id: orderId });
      } catch {
        // retry
      }
    }

    throw new Error('Invoice not ready yet');
  }
}

export async function getCustomerStateByExternalId(userId: string) {
  return polar.customers.getStateExternal({ externalId: userId });
}
