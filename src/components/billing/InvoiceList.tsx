import * as React from 'react';

export type InvoiceItem = {
  id: string;
  date: string;
  amount: string;
  hostedUrl?: string | null;
  pdfUrl?: string | null;
  orderId?: string;
  isInvoiceGenerated?: boolean;
};

type InvoiceListProps = {
  items: InvoiceItem[];
  onGenerate?: (orderId: string) => void;
};

export function InvoiceList({ items, onGenerate }: InvoiceListProps) {
  if (!items.length) {
    return (
      <div className="rounded border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
        No invoices yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded border bg-card p-3 text-sm">
          <div>
            <div className="font-medium text-card-foreground">{item.amount}</div>
            <div className="text-xs text-muted-foreground">{item.date}</div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            {item.pdfUrl ? (
              <a className="underline" href={item.pdfUrl} target="_blank" rel="noreferrer">
                Download PDF
              </a>
            ) : item.hostedUrl ? (
              <a className="underline" href={item.hostedUrl} target="_blank" rel="noreferrer">
                View Online
              </a>
            ) : item.orderId && onGenerate ? (
              <button className="underline" onClick={() => onGenerate(item.orderId)}>
                Generate
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
