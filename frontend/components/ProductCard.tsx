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

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition hover:shadow-card-hover">
      {/* Image */}
      <div className="relative bg-white">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded px-2 py-1 text-2xs font-bold uppercase tracking-wide ${badgeTones[product.badge.tone]}`}
          >
            {product.badge.label}
          </span>
        )}
        <Link href={product.href} className="block">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={400}
            height={400}
            className="mx-auto h-40 w-auto object-contain transition group-hover:scale-[1.03]"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col border-t border-line px-4 pb-4 pt-3">
        <p className="text-2xs font-medium text-ink-faint">{product.category}</p>

        <h3 className="mt-1 text-sm font-bold leading-snug text-ink">
          <Link href={product.href} className="hover:text-brand-700">
            {product.name}
          </Link>
        </h3>

        <p className="mt-0.5 text-2xs text-ink-muted">{product.subtitle}</p>

        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-2xs text-ink-muted">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-extrabold text-brand-800">{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-2xs font-medium text-ink-faint line-through">
              {product.compareAtPrice}
            </span>
          )}
        </div>

        <Link
          href={product.href}
          className="btn mt-4 w-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-brand-700 hover:bg-brand-600 hover:text-white"
        >
          {product.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
