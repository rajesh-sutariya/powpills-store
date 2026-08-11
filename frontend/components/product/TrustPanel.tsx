import { Icon } from '../Icon';
import labels from '@/lib/ui-labels';
import type { FooterContent } from '@/lib/types';

/**
 * Delivery, returns and payment, placed next to the buy button rather than
 * buried in the footer.
 *
 * These are the questions that stall a purchase at the moment of decision — "when
 * will it arrive", "what if it's wrong", "can I pay safely" — so they belong
 * beside the action, not a page away from it.
 */
export function TrustPanel({ payments }: { payments: FooterContent['payments'] }) {
  const points = [
    { icon: 'truck' as const, text: labels.product.deliveryTime },
    { icon: 'package' as const, text: labels.product.deliveryDiscreet },
    { icon: 'refresh' as const, text: labels.product.deliveryReturns },
  ];

  return (
    <div className="card overflow-hidden">
      <h2 className="border-b border-line px-5 py-3.5 text-sm font-bold text-ink">
        {labels.product.deliveryTitle}
      </h2>

      <ul className="flex flex-col gap-3 px-5 py-4">
        {points.map((point) => (
          <li key={point.text} className="flex items-start gap-3 text-[0.8125rem] text-ink-soft">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={point.icon} className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <span className="pt-1">{point.text}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-soft px-5 py-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
          <Icon name="lock" className="h-3.5 w-3.5 text-brand-600" />
          {labels.product.paymentTitle}
        </span>
        <span className="flex flex-wrap items-center gap-1.5">
          {payments.methods.slice(0, 5).map((method) => (
            <span
              key={method}
              className="inline-flex h-6 items-center rounded border border-line bg-white px-1.5 text-2xs font-bold uppercase tracking-tight text-ink-soft"
            >
              {method}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
