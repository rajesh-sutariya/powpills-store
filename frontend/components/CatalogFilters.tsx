'use client';

import Link from 'next/link';
import { Icon } from './Icon';
import { categories, formLabel } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { Facet, FacetKey, FacetState } from '@/lib/catalog-types';

/**
 * Facet panel, shared by the desktop sidebar and the mobile filter drawer.
 *
 * Multi-select checkboxes with a count per option: filtering research is clear
 * that shoppers expect to tick several values at once, and that forcing a single
 * choice adds friction. Options that would return nothing are never shown,
 * because a filter that leads to an empty list is worse than no filter.
 */
export function CatalogFilters({
  facets,
  state,
  onToggle,
  onClear,
  activeSlug,
  maxPrice,
  priceCeiling: ceiling,
  onPriceChange,
  activeCount,
}: {
  facets: Facet[];
  state: FacetState;
  onToggle: (key: FacetKey, value: string) => void;
  onClear: () => void;
  activeSlug?: string;
  maxPrice: number;
  priceCeiling: number;
  onPriceChange: (value: number) => void;
  activeCount: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Category rail */}
      <div className="card overflow-hidden">
        <h2 className="border-b border-line px-5 py-3.5 text-sm font-bold text-ink">
          {labels.sidebar.categoriesTitle}
        </h2>
        <ul className="p-2">
          <li>
            <Link
              href={labels.shop.href}
              className={`flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-colors ${
                activeSlug
                  ? 'text-ink-soft hover:bg-brand-50 hover:text-brand-700'
                  : 'bg-brand-50 text-brand-800'
              }`}
            >
              {labels.sidebar.allProducts}
            </Link>
          </li>
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-800'
                      : 'text-ink-soft hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      name={category.icon}
                      className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-ink-faint'}`}
                    />
                    <span className="truncate">{category.name}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-faint">{category.productCount}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Facets */}
      {(facets.length > 0 || ceiling > 0) && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <h2 className="text-sm font-bold text-ink">{labels.filters.title}</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                {labels.filters.clearAll}
              </button>
            )}
          </div>

          {/* Price */}
          {ceiling > 0 && (
            <fieldset className="border-b border-line px-5 py-4">
              <legend className="text-[0.8125rem] font-bold text-ink">
                {labels.filters.priceTitle}
              </legend>
              <input
                type="range"
                min={0}
                max={ceiling}
                step={1}
                value={maxPrice}
                onChange={(event) => onPriceChange(Number(event.target.value))}
                aria-label={labels.filters.priceTitle}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand-600"
              />
              <p className="mt-2 text-xs text-ink-muted">
                {labels.filters.priceUpTo} <span className="font-semibold text-ink">${maxPrice}</span>
              </p>
            </fieldset>
          )}

          {facets.map((facet) => (
            <fieldset key={facet.key} className="border-b border-line px-5 py-4 last:border-b-0">
              <legend className="text-[0.8125rem] font-bold text-ink">{facet.label}</legend>

              <ul className="mt-2.5 flex max-h-56 flex-col gap-1 overflow-y-auto overscroll-contain">
                {facet.options.map((option) => {
                  const checked = state[facet.key].includes(option.value);
                  const display = facet.key === 'form' ? formLabel(option.value) : option.value;

                  return (
                    <li key={option.value}>
                      <label className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1.5 text-[0.8125rem] transition-colors hover:bg-brand-50">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(facet.key, option.value)}
                          className="h-4 w-4 shrink-0 rounded border-line text-brand-600 accent-brand-600"
                        />
                        <span className={`min-w-0 flex-1 truncate ${checked ? 'font-semibold text-brand-800' : 'text-ink-soft'}`}>
                          {display}
                        </span>
                        <span className="shrink-0 text-xs text-ink-faint">{option.count}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}
        </div>
      )}
    </div>
  );
}
