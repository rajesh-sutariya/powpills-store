'use client';

import { useState } from 'react';
import { ReviewSummary } from './ReviewSummary';
import labels from '@/lib/ui-labels';
import type { CatalogProduct } from '@/lib/catalog-types';

type TabKey = 'description' | 'specs' | 'reviews';

/** Description / additional information / reviews, as a product page is expected to have. */
export function ProductTabs({ product }: { product: CatalogProduct }) {
  const [active, setActive] = useState<TabKey>('description');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'description', label: labels.product.descriptionTab },
    { key: 'specs', label: labels.product.specsTab },
    { key: 'reviews', label: `${labels.product.reviewsTab} (${product.reviewCount})` },
  ];

  return (
    <div className="card overflow-hidden">
      <div
        role="tablist"
        aria-label={labels.product.descriptionTab}
        className="flex overflow-x-auto border-b border-line no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={`relative min-h-11 shrink-0 px-4 py-4 text-sm font-semibold transition-colors sm:px-6 ${
                isActive ? 'text-brand-800' : 'text-ink-muted hover:text-brand-700'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-brand-600" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-6">
        {active === 'description' && (
          <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{product.description}</p>
        )}

        {active === 'specs' && (
          <dl className="grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="grid gap-1 bg-white px-4 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4"
              >
                <dt className="text-[0.8125rem] font-semibold text-ink">{key}</dt>
                <dd className="text-[0.8125rem] text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === 'reviews' && (
          <div className="max-w-3xl">
            <ReviewSummary product={product} />
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-muted">
              {labels.product.reviewsEmpty}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
