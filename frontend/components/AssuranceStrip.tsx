import { Icon } from './Icon';
import type { Assurance } from '@/lib/types';

export function AssuranceStrip({ items }: { items: Assurance[] }) {
  return (
    <section className="bg-white py-8">
      <div className="shell">
        <div className="card grid gap-6 px-6 py-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name={item.icon} className="h-4.5 w-4.5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-bold text-ink">{item.title}</span>
                <span className="mt-1 block text-2xs text-ink-muted">{item.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
