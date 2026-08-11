'use client';

import { useState } from 'react';
import { PlusMinus } from './Icon';
import type { FaqSection } from '@/lib/types';

export function Faq({ content }: { content: FaqSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-12">
      <div className="shell">
        <h2 className="section-title text-center">{content.title}</h2>

        <div className="mt-8 grid gap-x-4 gap-y-3 md:grid-cols-2">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="card overflow-hidden">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-xs font-semibold text-ink transition-colors hover:text-brand-700"
                  >
                    {item.question}
                    <span className="text-ink-muted">
                      <PlusMinus open={isOpen} />
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="border-t border-line px-5 py-4 text-2xs leading-relaxed text-ink-muted"
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
