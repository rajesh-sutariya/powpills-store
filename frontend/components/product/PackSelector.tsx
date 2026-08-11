'use client';

import { useState } from 'react';
import { Icon } from '../Icon';
import labels from '@/lib/ui-labels';
import type { Pack } from '@/lib/catalog-types';

/**
 * Pack-size chooser, modelled on the live store's variable-product table:
 * every pack shows its total price and its price per unit, so the saving on a
 * bigger pack is visible rather than implied.
 *
 * Selecting a pack updates the headline price and the running total — the same
 * feedback WooCommerce gives when you pick a variation.
 */
export function PackSelector({ packs }: { packs: Pack[] }) {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const pack = packs[selected];
  const total = pack.price * quantity;
  const cheapestUnit = Math.min(...packs.map((entry) => entry.price / entry.units));
  const bestValueIndex = packs.findIndex((entry) => entry.price / entry.units === cheapestUnit);

  return (
    <div>
      <h2 className="text-sm font-bold text-ink">{labels.product.packSizeTitle}</h2>

      {/* Pack ladder */}
      <ul role="radiogroup" className="mt-3 flex flex-col gap-2.5">
        {packs.map((entry, index) => {
          const isSelected = index === selected;
          return (
            <li key={entry.label}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(index)}
                className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600'
                    : 'border-line bg-white hover:border-brand-300'
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected ? 'border-brand-600' : 'border-ink-faint'
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-brand-600" />}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{entry.label}</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">{entry.unitLabel}</span>
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2.5">
                  {index === bestValueIndex && packs.length > 1 && (
                    <span className="hidden rounded-full bg-brand-600 px-2 py-0.5 text-2xs font-bold uppercase tracking-wide text-white sm:inline">
                      {labels.card.badges.save}
                    </span>
                  )}
                  <span className="text-15 font-bold text-ink">{entry.priceLabel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Quantity + running total */}
      <div className="mt-6 flex flex-wrap items-end gap-5">
        <div>
          <span className="mb-2 block text-sm font-bold text-ink">
            {labels.product.quantityLabel}
          </span>
          <div className="inline-flex items-center rounded-xl border border-line">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="inline-flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-brand-700"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span aria-live="polite" className="w-10 text-center text-sm font-bold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(99, value + 1))}
              className="inline-flex h-11 w-11 items-center justify-center text-ink-soft transition-colors hover:text-brand-700"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round">
                <path d="M5 12h14M12 5v14" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <span className="mb-1 block text-xs font-medium text-ink-muted">
            {labels.product.selectedTotal}
          </span>
          <span className="block text-2xl font-extrabold tracking-tight text-brand-800">
            ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn-primary flex-1">
          <Icon name="cart" className="h-4.5 w-4.5" strokeWidth={1.8} />
          {labels.product.addToCart}
        </button>
        <button type="button" className="btn-outline flex-1">
          {labels.product.buyNow}
        </button>
      </div>
    </div>
  );
}
