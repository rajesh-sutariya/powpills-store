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
 * Fixed square image well on a tinted background gives every card the same
 * silhouette regardless of the product shape, and `mt-auto` pins the price and
 * button to the bottom so rows line up across the grid.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-interactive group flex h-full flex-col overflow-hidden">
      {/* Image well */}
      <div className="relative aspect-square shrink-0 bg-surface-soft p-6">
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
            height={400}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-ink-muted">{product.category}</p>

        <h3 className="mt-1.5">
          <Link href={product.href} className="h-card transition-colors hover:text-brand-700">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-[0.8125rem] leading-snug text-ink-muted">{product.subtitle}</p>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} className="h-4 w-4" />
          <span className="text-xs font-medium text-ink-muted">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-15 font-bold text-brand-800">{product.price}</span>
            {product.compareAtPrice && (
              <span className="text-xs font-medium text-ink-faint line-through">
                {product.compareAtPrice}
              </span>
            )}
          </div>

          <Link href={product.href} className="btn-compact mt-3.5 w-full">
            {product.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
