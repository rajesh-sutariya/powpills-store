import { ProductCard } from './ProductCard';
import labels from '@/lib/ui-labels';
import type { CatalogProduct } from '@/lib/catalog-types';

/**
 * Static grid used by the shop, category and related-products views. Same card
 * as the homepage rails, so a product looks identical wherever it appears.
 */
export function ProductGrid({
  products,
  columns = 4,
}: {
  products: CatalogProduct[];
  columns?: 3 | 4;
}) {
  if (products.length === 0) {
    return (
      <div className="card px-6 py-14 text-center">
        <p className="text-sm text-ink-muted">{labels.emptyState}</p>
      </div>
    );
  }

  const columnClass =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <ul className={`grid grid-cols-1 gap-5 ${columnClass}`}>
      {products.map((product) => (
        <li key={product.slug} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
