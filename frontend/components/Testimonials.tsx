'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Stars } from './Icon';
import { SectionHeading } from './SectionHeading';
import type { TestimonialSection } from '@/lib/types';

export function Testimonials({ content }: { content: TestimonialSection }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      rail.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollByPage = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="section bg-surface-soft">
      <div className="shell">
        <SectionHeading title={content.title} />

        <div className="relative">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            className="carousel-arrow -left-4 lg:-left-5"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>

          <ul
            ref={railRef}
            className="grid snap-x snap-mandatory auto-cols-[minmax(255px,1fr)] grid-flow-col gap-5 overflow-x-auto scroll-smooth pb-2 no-scrollbar lg:auto-cols-[calc((100%_-_3.75rem)/4)]"
          >
            {content.items.map((item) => (
              <li key={item.name} className="min-w-0 snap-start">
                <figure className="card flex h-full flex-col p-6">
                  <Stars rating={5} className="h-4 w-4" />

                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="leading-tight">
                      <span className="block text-[0.8125rem] font-bold text-ink">{item.name}</span>
                      <span className="mt-0.5 block text-xs text-ink-muted">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            className="carousel-arrow -right-4 lg:-right-5"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
