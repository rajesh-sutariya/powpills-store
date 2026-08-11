import { Stars } from '../Icon';
import labels from '@/lib/ui-labels';
import type { CatalogProduct } from '@/lib/catalog-types';

/**
 * Ratings distribution, not just an average.
 *
 * Usability research on review sections found the distribution summary to be the
 * most-used element — relied on more heavily than the review text itself, because
 * an average of 4.6 hides whether it came from consistent 5s or a mix of 5s and 1s.
 */
export function ReviewSummary({ product }: { product: CatalogProduct }) {
  const total = Object.values(product.reviewBreakdown).reduce((sum, count) => sum + count, 0) || 1;

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
      {/* Average */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-soft px-6 py-5 text-center sm:w-40">
        <span className="text-4xl font-extrabold tracking-tight text-brand-800">
          {product.rating.toFixed(1)}
        </span>
        <span className="mt-1 text-xs text-ink-muted">{labels.product.outOf5}</span>
        <span className="mt-2.5">
          <Stars rating={product.rating} className="h-4 w-4" />
        </span>
        <span className="mt-2 text-xs text-ink-muted">
          {product.reviewCount} {labels.product.reviewsSuffix}
        </span>
      </div>

      {/* Distribution */}
      <ul className="flex flex-col justify-center gap-2">
        {(['5', '4', '3', '2', '1'] as const).map((star) => {
          const count = product.reviewBreakdown[star] ?? 0;
          const percent = Math.round((count / total) * 100);

          return (
            <li key={star} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-xs font-medium text-ink-soft">
                {star} {labels.product.stars}
              </span>

              <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                <span
                  className="block h-full rounded-full bg-amber-400"
                  style={{ width: `${percent}%` }}
                />
              </span>

              <span className="w-12 shrink-0 text-right text-xs text-ink-muted">{percent}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
