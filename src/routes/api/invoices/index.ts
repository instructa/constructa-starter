import { createFileRoute } from '@tanstack/react-router';
import { listOrdersByExternalCustomerId } from '~/server/polar';
import { requireUser } from '~/server/require-user';

export const Route = createFileRoute('/api/invoices/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await requireUser(request);

        const orders = await listOrdersByExternalCustomerId(user.id, 50);

        const items = orders.map((order) => {
          const invoice: any = order.invoice ?? {};
          return {
            id: order.id,
            orderId: order.id,
            date: new Date(order.created_at).toLocaleString(),
            amount: `${((order.amount ?? 0) / 100).toFixed(2)} ${order.currency ?? 'USD'}`,
            hostedUrl: invoice.hosted_invoice_url ?? null,
            pdfUrl: invoice.invoice_pdf ?? null,
            isInvoiceGenerated: Boolean(invoice.invoice_pdf),
          };
        });

        return Response.json(items);
      },
    },
  },
});
