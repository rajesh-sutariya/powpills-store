'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Stars } from './Icon';
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
    <section className="bg-surface-soft py-12">
      <div className="shell">
        <h2 className="section-title text-center">{content.title}</h2>

        <div className="relative mt-8">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            className="carousel-arrow -left-4"
          >
            <ChevronLeft />
          </button>

          <ul
            ref={railRef}
            className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-1 no-scrollbar lg:auto-cols-[calc((100%_-_3rem)/4)]"
          >
            {content.items.map((item) => (
              <li key={item.name} className="min-w-0">
                <figure className="card flex h-full flex-col px-5 py-5">
                  <Stars rating={5} />
                  <blockquote className="mt-3 flex-1 text-2xs leading-relaxed text-ink-soft">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="leading-tight">
                      <span className="block text-2xs font-bold text-ink">{item.name}</span>
                      <span className="block text-2xs text-ink-muted">{item.role}</span>
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
            className="carousel-arrow -right-4"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
