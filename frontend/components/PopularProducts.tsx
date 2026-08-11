'use client';

import { useMemo, useState } from 'react';
import { ProductCarousel } from './ProductCarousel';
import { SectionHeading } from './SectionHeading';
import type { ProductSection } from '@/lib/types';

const ALL_TAB_INDEX = 0;

export function PopularProducts({ content }: { content: ProductSection }) {
  const tabs = content.tabs ?? [];
  const [active, setActive] = useState(tabs[ALL_TAB_INDEX] ?? '');

  const visible = useMemo(() => {
    if (!tabs.length || active === tabs[ALL_TAB_INDEX]) return content.products;
    return content.products.filter(
      (product) => product.tabs?.includes(active) || product.category === active,
    );
  }, [active, content.products, tabs]);

  return (
    <section className="section bg-surface-soft">
      <div className="shell">
        <SectionHeading
          title={content.title}
          align="split"
          action={{ label: content.viewAllLabel, href: content.viewAllHref }}
        />

        {tabs.length > 0 && (
          <div
            role="tablist"
            aria-label={content.title}
            className="-mt-3 mb-8 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
          >
            {tabs.map((tab) => {
              const isActive = tab === active;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActive(tab)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-semibold transition ${
                    isActive
                      ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                      : 'border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}

        <ProductCarousel products={visible} />
      </div>
    </section>
  );
}
