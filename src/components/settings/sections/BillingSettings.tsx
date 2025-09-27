import * as React from 'react';
import { z } from 'zod';
import { InvoiceList, type InvoiceItem } from '~/components/billing/InvoiceList';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useOpenPortal } from '~/hooks/useBilling';

const BillingSchema = z.object({
  billingEmail: z.string().email(),
  company: z.string().optional().nullable(),
  line1: z.string().optional().nullable(),
  line2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  vat: z.string().optional().nullable(),
});

type BillingFormState = z.infer<typeof BillingSchema>;

export interface BillingSettingsSectionProps {
  variant?: 'dialog' | 'page';
}

export function BillingSettingsSection({ variant = 'dialog' }: BillingSettingsSectionProps) {
  const wrapperSpacing = variant === 'page' ? 'space-y-8' : 'space-y-6';
  const [form, setForm] = React.useState<BillingFormState | null>(null);
  const [invoices, setInvoices] = React.useState<InvoiceItem[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const openPortal = useOpenPortal();

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, invoicesRes] = await Promise.all([
          fetch('/api/settings/billing', { credentials: 'include' }),
          fetch('/api/invoices', { credentials: 'include' }),
        ]);

        if (!profileRes.ok) throw new Error('Failed to load billing profile');
        const profilePayload = await profileRes.json();
        const profile = BillingSchema.partial().parse(profilePayload.profile ?? {});

        if (!invoicesRes.ok) throw new Error('Failed to load invoices');
        const invoicePayload = (await invoicesRes.json()) as InvoiceItem[];

        if (!cancelled) {
          setForm({
            billingEmail: profile.billingEmail ?? '',
            company: profile.company ?? '',
            line1: profile.line1 ?? '',
            line2: profile.line2 ?? '',
            city: profile.city ?? '',
            state: profile.state ?? '',
            postalCode: profile.postalCode ?? '',
            country: profile.country ?? '',
            vat: profile.vat ?? '',
          });
          setInvoices(invoicePayload);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('Unable to load billing details.');
          setForm({
            billingEmail: '',
            company: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            vat: '',
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = React.useCallback(
    <K extends keyof BillingFormState>(key: K, value: string) => {
      setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    [],
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!form) return;
      setSaving(true);
      setError(null);

      const res = await fetch('/api/settings/billing', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const message = await res.text();
        setError(message || 'Failed to save billing settings');
      }

      setSaving(false);
    },
    [form],
  );

  const handleGenerate = React.useCallback(async (orderId: string) => {
    const res = await fetch(`/api/invoices/${orderId}/generate`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      window.alert('Failed to generate invoice.');
      return;
    }

    const payload = await res.json();
    setInvoices((items) =>
      items.map((item) =>
        item.orderId === orderId
          ? { ...item, pdfUrl: payload.pdfUrl ?? null, hostedUrl: payload.hostedUrl ?? null }
          : item,
      ),
    );
  }, []);

  if (loading || !form) {
    return <div className="text-sm text-muted-foreground">Loading billing details…</div>;
  }

  return (
    <div className={wrapperSpacing}>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Field
          label="Billing email"
          value={form.billingEmail ?? ''}
          onChange={(value) => updateField('billingEmail', value)}
          required
        />
        <Field label="Company" value={form.company ?? ''} onChange={(value) => updateField('company', value)} />
        <Field
          label="Address line 1"
          className="md:col-span-2"
          value={form.line1 ?? ''}
          onChange={(value) => updateField('line1', value)}
        />
        <Field
          label="Address line 2"
          className="md:col-span-2"
          value={form.line2 ?? ''}
          onChange={(value) => updateField('line2', value)}
        />
        <Field label="City" value={form.city ?? ''} onChange={(value) => updateField('city', value)} />
        <Field label="State/Region" value={form.state ?? ''} onChange={(value) => updateField('state', value)} />
        <Field
          label="Postal code"
          value={form.postalCode ?? ''}
          onChange={(value) => updateField('postalCode', value)}
        />
        <Field
          label="Country (ISO)"
          value={form.country ?? ''}
          onChange={(value) => updateField('country', value.toUpperCase())}
        />
        <Field
          label="VAT / Tax ID"
          className="md:col-span-2"
          value={form.vat ?? ''}
          onChange={(value) => updateField('vat', value)}
        />
        {error ? (
          <div className="md:col-span-2 text-sm text-destructive">{error}</div>
        ) : null}
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save billing details'}
          </Button>
          <button
            type="button"
            className="text-sm font-medium text-primary underline"
            onClick={() => {
              void openPortal().catch(() => {
                window.alert('Unable to open customer portal. Please try again.');
              });
            }}
          >
            Open customer portal
          </button>
        </div>
      </form>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Invoices</h2>
          <p className="text-sm text-muted-foreground">
            Download receipts or generate invoices for recent purchases.
          </p>
        </div>
        <InvoiceList items={invoices} onGenerate={handleGenerate} />
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <Input
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1"
      />
    </div>
  );
}
