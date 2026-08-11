import Image from 'next/image';
import Link from 'next/link';
import { Stars } from './Icon';
import type { Product } from '@/lib/types';

const badgeTones = {
  sale: 'bg-brand-600 text-white',
  hot: 'bg-orange-500 text-white',
  new: 'bg-sky-600 text-white',
  save: 'bg-amber-500 text-white',
} as const;

/**
 * Proportions: four cards per view (≈279px wide) with a 4:3 image well gives a
 * card of roughly 1:1.55 — five-up produced a 1:1.9 sliver that read as broken.
 *
 * The price block is pinned to the bottom with `mt-auto` so the buttons line up
 * across a row even when a product name wraps to two lines, and the price and
 * its strike-through stay on one line so cards don't jump between layouts.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-interactive group flex h-full flex-col overflow-hidden">
      {/* Image well — 4:3 matches the placeholder artboard exactly, no letterboxing */}
      <div className="relative aspect-[4/3] shrink-0 border-b border-line bg-surface-soft p-4">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-2xs font-bold uppercase tracking-wide ${badgeTones[product.badge.tone]}`}
          >
            {product.badge.label}
          </span>
        )}
        <Link href={product.href} className="block h-full w-full">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={400}
            height={300}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-medium text-ink-muted">{product.category}</p>

        <h3 className="mt-1.5">
          <Link
            href={product.href}
            className="h-card line-clamp-2 transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-1 text-[0.8125rem] leading-snug text-ink-muted">
          {product.subtitle}
        </p>

        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-ink-muted">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="whitespace-nowrap text-15 font-bold text-ink">{product.price}</span>
            {product.compareAtPrice && (
              <span className="whitespace-nowrap text-xs font-medium text-ink-muted line-through">
                {product.compareAtPrice}
              </span>
            )}
          </div>

          <Link
            href={product.href}
            className="btn mt-3 w-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm text-brand-700 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
          >
            {product.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
