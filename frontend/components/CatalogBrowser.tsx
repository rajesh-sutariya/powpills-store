'use client';

import { useMemo, useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { sortProducts } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { CatalogProduct, SortKey } from '@/lib/catalog-types';

/**
 * Toolbar + grid for the shop and category pages.
 *
 * Sorting is client-side because the whole catalogue ships with the page — that
 * keeps the site fully static (no server round-trip) while still behaving like
 * the WooCommerce sort control shoppers expect.
 */
export function CatalogBrowser({
  products,
  columns = 4,
}: {
  products: CatalogProduct[];
  columns?: 3 | 4;
}) {
  const [sort, setSort] = useState<SortKey>('popular');

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  const countLabel = `${labels.toolbar.showing} ${products.length} ${
    products.length === 1 ? labels.toolbar.resultsOne : labels.toolbar.resultsMany
  }`;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <p className="text-sm text-ink-muted">{countLabel}</p>

        <label className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-ink-soft">{labels.toolbar.sortLabel}</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-10 rounded-xl border border-line bg-white px-3 pr-8 text-sm font-medium text-ink transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50"
          >
            {labels.toolbar.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ProductGrid products={sorted} columns={columns} />
    </div>
  );
}
