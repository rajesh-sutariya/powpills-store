'use client';

import { useState } from 'react';
import { PlusMinus } from './Icon';
import { SectionHeading } from './SectionHeading';
import type { FaqSection } from '@/lib/types';

/**
 * The first question starts open: a column of identical closed bars reads as an
 * unfinished block, and one open panel shows the reader what the control does.
 */
export function Faq({ content }: { content: FaqSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="shell">
        <SectionHeading title={content.title} />

        <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-brand-200 shadow-card' : 'border-line'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left text-sm font-semibold transition-colors ${
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
                    className="border-t border-line px-5 py-4 text-[0.8125rem] leading-relaxed text-ink-soft"
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
