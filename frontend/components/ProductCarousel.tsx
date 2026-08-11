'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icon';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/types';

/**
 * Horizontally scrollable product rail: five cards per view on desktop,
 * with the prev/next arrows shown on the left and right edges of the row.
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
        className="carousel-arrow -left-4"
      >
        <ChevronLeft />
      </button>

      <ul
        ref={railRef}
        className="grid auto-cols-[minmax(200px,1fr)] grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-1 no-scrollbar sm:auto-cols-[minmax(220px,1fr)] lg:auto-cols-[calc((100%_-_4rem)/5)]"
      >
        {products.map((product) => (
          <li key={product.id} className="min-w-0">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label="Next products"
        onClick={() => scrollByPage(1)}
        disabled={atEnd}
        className="carousel-arrow -right-4"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
