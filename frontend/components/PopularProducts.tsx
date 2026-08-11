'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from './Icon';
import { ProductCarousel } from './ProductCarousel';
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
    <section className="bg-white py-12">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title">{content.title}</h2>
          <Link href={content.viewAllHref} className="link-more">
            {content.viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {tabs.length > 0 && (
          <div
            role="tablist"
            aria-label={content.title}
            className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
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
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'border-line bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <ProductCarousel products={visible} />
        </div>
      </div>
    </section>
  );
}
