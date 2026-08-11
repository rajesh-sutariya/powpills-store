'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icon';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';

/**
 * Four cards per view on desktop, three on tablet. The arrows fade out at each
 * end instead of sitting there greyed, and scrolling snaps so a card is never
 * left half-visible.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
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
  }, [sync, products]);

  const scrollByPage = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.9, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous products"
        onClick={() => scrollByPage(-1)}
        disabled={atStart}
        className="carousel-arrow -left-4 lg:-left-5"
      >
        <ChevronLeft className="h-4.5 w-4.5" />
      </button>

      <ul
        ref={railRef}
        className="grid snap-x snap-mandatory auto-cols-[minmax(240px,1fr)] grid-flow-col gap-5 overflow-x-auto scroll-smooth pb-2 no-scrollbar md:auto-cols-[calc((100%_-_2.5rem)/3)] lg:auto-cols-[calc((100%_-_3.75rem)/4)]"
      >
        {products.map((product) => (
          <li key={product.id} className="min-w-0 snap-start">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Next products"
        onClick={() => scrollByPage(1)}
        disabled={atEnd}
        className="carousel-arrow -right-4 lg:-right-5"
      >
        <ChevronRight className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}
