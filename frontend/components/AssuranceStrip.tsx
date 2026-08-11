import { Icon } from './Icon';
import type { Assurance } from '@/lib/types';

/**
 * Overlaps the hero above it (negative top margin) so the two sections read as
 * a single unit — this is the seam that stops the page feeling like a stack of
 * disconnected strips.
 */
export function AssuranceStrip({ items }: { items: Assurance[] }) {
  return (
    <section className="relative z-10 bg-surface-soft pb-14 sm:pb-16 lg:pb-20">
      <div className="shell">
        <ul className="-mt-14 grid grid-cols-1 gap-x-6 gap-y-6 rounded-3xl border border-line bg-white px-5 py-6 shadow-lift sm:-mt-20 sm:grid-cols-2 sm:px-7 sm:py-8 lg:-mt-24 lg:grid-cols-5 lg:gap-x-4 lg:px-8">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`flex items-start gap-3.5 lg:px-2 ${
                index > 0 ? 'lg:border-l lg:border-line' : ''
              }`}
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-snug text-ink">{item.title}</span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
