'use client';

import { useState } from 'react';
import { PlusMinus } from './Icon';
import type { FaqEntry } from '@/lib/catalog-types';

/**
 * Reusable accordion for category and product FAQs.
 *
 * Single column and measure-constrained, first item open — the same treatment as
 * the homepage FAQ, so the pattern is consistent site-wide.
 */
export function FaqAccordion({
  items,
  className = 'mx-auto max-w-3xl',
}: {
  items: FaqEntry[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
              isOpen ? 'border-brand-200 shadow-card' : 'border-line hover:border-brand-200'
            }`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex w-full items-center justify-between gap-5 px-5 py-4 text-left text-[0.9375rem] font-semibold transition-colors sm:px-6 ${
                  isOpen ? 'text-brand-800' : 'text-ink hover:text-brand-700'
                }`}
              >
                {item.question}
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? 'bg-brand-600 text-white' : 'bg-surface-soft text-ink-muted'
                  }`}
                >
                  <PlusMinus open={isOpen} />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft sm:px-6">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
