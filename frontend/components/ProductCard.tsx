import Image from 'next/image';
import Link from 'next/link';
import { Stars } from './Icon';
import { categoryName } from '@/lib/catalog';
import labels from '@/lib/ui-labels';
import type { CatalogProduct } from '@/lib/catalog-types';

const badgeTones: Record<string, string> = {
  sale: 'bg-brand-600 text-white',
  hot: 'bg-orange-500 text-white',
  new: 'bg-sky-600 text-white',
  save: 'bg-amber-500 text-white',
};

/**
 * Proportions: four cards per view (≈279px wide) with a 4:3 image well gives a
 * card of roughly 1:1.55 — five-up produced a 1:1.9 sliver that read as broken.
 *
 * The price block is pinned to the bottom with `mt-auto` so buttons line up
 * across a row even when a product name wraps, and the price range stays on one
 * line so cards don't switch between layouts.
 */
export function ProductCard({ product }: { product: CatalogProduct }) {
  const badgeLabel = product.badge ? labels.card.badges[product.badge] : '';

  return (
    <article className="card-interactive group flex h-full flex-col overflow-hidden">
      {/* Image well — 4:3 matches the placeholder artboard exactly */}
      <div className="relative aspect-[4/3] shrink-0 border-b border-line bg-surface-soft p-4">
        {badgeLabel && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-2xs font-bold uppercase tracking-wide ${
              badgeTones[product.badge] ?? badgeTones.sale
            }`}
          >
            {badgeLabel}
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
        <p className="line-clamp-1 text-xs font-medium text-ink-muted">
          {categoryName(product.primaryCategory)}
        </p>

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

        {/* Category-specific attributes: strength and available pack range.
            Listing research is clear that shoppers compare on these without
            opening each product — showing only a name and price forces a click. */}
        <dl className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs text-ink-muted">
          {product.specs.Strength && (
            <div className="flex gap-1">
              <dt className="font-medium">{labels.product.strengthLabel}:</dt>
              <dd className="font-semibold text-ink-soft">{product.specs.Strength}</dd>
            </div>
          )}
          {product.packs.length > 1 && (
            <div className="flex gap-1">
              <dt className="font-medium">{labels.product.packsLabel}:</dt>
              <dd className="font-semibold text-ink-soft">{product.packs.length}</dd>
            </div>
          )}
        </dl>

        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-ink-muted">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto pt-4">
          <span className="block text-15 font-bold text-ink">{product.priceLabel}</span>

          <Link
            href={product.href}
            className="btn mt-3 w-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm text-brand-700 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
          >
            {labels.card.viewOptions}
          </Link>
        </div>
      </div>
    </article>
  );
}
