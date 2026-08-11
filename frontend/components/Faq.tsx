'use client';

import { useState } from 'react';
import { PlusMinus } from './Icon';
import { SectionHeading } from './SectionHeading';
import type { FaqSection } from '@/lib/types';

/**
 * Single column, centred and measure-constrained.
 *
 * Two columns of accordions was the wrong call: opening a panel on one side
 * shunts only that column, so the two halves drift out of alignment as you
 * read, and the eye has no single path down the list. One column also keeps
 * answers at a comfortable reading width.
 *
 * The first question starts open — six identical closed bars read as an
 * unfinished block and don't show what the control does.
 */
export function Faq({ content }: { content: FaqSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading title={content.title} />

        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {content.items.map((item, index) => {
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
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-5 px-5 py-4.5 text-left text-15 font-semibold transition-colors sm:px-6 ${
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
                  <div
                    id={`faq-panel-${index}`}
                    className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft sm:px-6"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
