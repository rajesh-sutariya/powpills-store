'use client';

import { useMemo, useState } from 'react';
import { CatalogFilters } from './CatalogFilters';
import { ProductGrid } from './ProductGrid';
import { applyFacets, buildFacets, priceCeiling, sortProducts } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { FacetKey, FacetState, CatalogProduct, SortKey } from '@/lib/catalog-types';

const EMPTY_STATE: FacetState = { ingredient: [], form: [], manufacturer: [] };
const PAGE_SIZE = 12;

/**
 * Listing view for the shop and category pages: facets, sort, active-filter
 * chips, and incremental loading.
 *
 * Everything runs client-side because the catalogue ships with the page, so the
 * site stays a static export while still filtering instantly.
 *
 * Layout order matters on mobile: the filter panel is a drawer, not a column
 * above the grid. Previously a 13-item category list pushed every product below
 * the fold on a phone.
 */
export function CatalogBrowser({
  products,
  activeSlug,
}: {
  products: CatalogProduct[];
  activeSlug?: string;
}) {
  const [sort, setSort] = useState<SortKey>('popular');
  const [facetState, setFacetState] = useState<FacetState>(EMPTY_STATE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const ceiling = useMemo(() => Math.ceil(priceCeiling(products)), [products]);
  const [maxPrice, setMaxPrice] = useState(ceiling);

  const facets = useMemo(() => buildFacets(products), [products]);

  const filtered = useMemo(
    () => sortProducts(applyFacets(products, facetState, maxPrice), sort),
    [products, facetState, maxPrice, sort],
  );

  const activeCount =
    Object.values(facetState).reduce((total, values) => total + values.length, 0) +
    (maxPrice < ceiling ? 1 : 0);

  function toggle(key: FacetKey, value: string) {
    setVisible(PAGE_SIZE);
    setFacetState((current) => {
      const values = current[key];
      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((entry) => entry !== value)
          : [...values, value],
      };
    });
  }

  function clearAll() {
    setFacetState(EMPTY_STATE);
    setMaxPrice(ceiling);
    setVisible(PAGE_SIZE);
  }

  const panel = (
    <CatalogFilters
      facets={facets}
      state={facetState}
      onToggle={toggle}
      onClear={clearAll}
      activeSlug={activeSlug}
      maxPrice={maxPrice}
      priceCeiling={ceiling}
      onPriceChange={(value) => {
        setMaxPrice(value);
        setVisible(PAGE_SIZE);
      }}
      activeCount={activeCount}
    />
  );

  const shown = filtered.slice(0, visible);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <div className="lg:sticky lg:top-24">{panel}</div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="order-1 text-sm text-ink-muted">
            {labels.toolbar.showing}{' '}
            <span className="font-semibold text-ink">{filtered.length}</span>{' '}
            {filtered.length === 1 ? labels.toolbar.resultsOne : labels.toolbar.resultsMany}
          </p>

          {/* Mobile filter trigger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="order-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-ink-soft lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            {labels.filters.title}
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-2xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>

          <label className="order-2 ml-auto flex items-center gap-2.5 lg:order-3">
            <span className="hidden text-sm font-medium text-ink-soft sm:inline">
              {labels.toolbar.sortLabel}
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              aria-label={labels.toolbar.sortLabel}
              className="min-h-11 rounded-xl border border-line bg-white px-3 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-50"
            >
              {labels.toolbar.sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Active filter chips */}
        {activeCount > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {(Object.keys(facetState) as FacetKey[]).flatMap((key) =>
              facetState[key].map((value) => (
                <button
                  key={`${key}-${value}`}
                  type="button"
                  onClick={() => toggle(key, value)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100"
                >
                  {value}
                  <span aria-hidden="true" className="text-brand-600">
                    ×
                  </span>
                  <span className="sr-only">{labels.filters.remove}</span>
                </button>
              )),
            )}
            {maxPrice < ceiling && (
              <button
                type="button"
                onClick={() => setMaxPrice(ceiling)}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800"
              >
                {labels.filters.priceUpTo} ${maxPrice}
                <span aria-hidden="true" className="text-brand-600">
                  ×
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-ink-muted underline hover:text-brand-700"
            >
              {labels.filters.clearAll}
            </button>
          </div>
        )}

        <ProductGrid products={shown} />

        {/* Incremental loading, so a 59-product page isn't one endless scroll */}
        {visible < filtered.length && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-xs text-ink-muted">
              {labels.toolbar.showing} {shown.length} {labels.filters.of} {filtered.length}
            </p>
            <button
              type="button"
              onClick={() => setVisible((value) => value + PAGE_SIZE)}
              className="btn-outline"
            >
              {labels.filters.loadMore}
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.filters.title}
            className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-surface-soft"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3.5">
              <h2 className="text-sm font-bold text-ink">{labels.filters.title}</h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-soft"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4">{panel}</div>

            <div className="border-t border-line bg-white p-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="btn-primary w-full"
              >
                {labels.filters.showResults.replace('{count}', String(filtered.length))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
