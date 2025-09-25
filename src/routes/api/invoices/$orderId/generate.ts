import { createServerFileRoute } from '@tanstack/react-start/server';
import { ensureOrderInvoice, listOrdersByExternalCustomerId } from '~/server/polar';
import { requireUser } from '~/server/require-user';

export const ServerRoute = createServerFileRoute('/api/invoices/$orderId/generate').methods({
  POST: async ({ params, request }) => {
    const user = await requireUser(request);
    const orders = await listOrdersByExternalCustomerId(user.id, 100);
    const knownOrder = orders.find((order) => order.id === params.orderId);

    if (!knownOrder) {
      return new Response('Invoice not found', { status: 404 });
    }

    const invoice = await ensureOrderInvoice(params.orderId);

    return Response.json({
      pdfUrl: invoice.invoice_pdf ?? null,
      hostedUrl: invoice.hosted_invoice_url ?? null,
    });
  },
});
