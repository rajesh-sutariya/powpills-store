import catalogJson from '@/data/catalog.json';
import type { Catalog, CatalogCategory, CatalogProduct, SortKey } from './catalog-types';

/**
 * Read-only accessors over the shared catalogue.
 *
 * Everything is resolved from the one JSON document, so the homepage rails,
 * category pages, product pages and the WordPress seeder all agree by
 * construction.
 */

const catalog = catalogJson as unknown as Catalog;

export const categories: CatalogCategory[] = catalog.categories;
export const products: CatalogProduct[] = catalog.products;

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
const productBySlug = new Map(products.map((product) => [product.slug, product]));

export function getCategory(slug: string): CatalogCategory | undefined {
  return categoryBySlug.get(slug);
}

export function getProduct(slug: string): CatalogProduct | undefined {
  return productBySlug.get(slug);
}

/** Resolves an ordered list of slugs, skipping anything that no longer exists. */
export function getProducts(slugs: string[]): CatalogProduct[] {
  return slugs
    .map((slug) => productBySlug.get(slug))
    .filter((product): product is CatalogProduct => Boolean(product));
}

export function getProductsByCategory(slug: string): CatalogProduct[] {
  return products.filter((product) => product.categories.includes(slug));
}

/** Human-readable category name for a product card. */
export function categoryName(slug: string): string {
  return categoryBySlug.get(slug)?.name ?? '';
}

const slugByName = new Map(categories.map((category) => [category.name, category.slug]));

/** Resolves a display name back to a slug, used by the homepage tab filters. */
export function categorySlugByName(name: string): string | undefined {
  return slugByName.get(name);
}

export function sortProducts(list: CatalogProduct[], sort: SortKey): CatalogProduct[] {
  const sorted = [...list];

  switch (sort) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'price-asc':
      return sorted.sort((a, b) => a.priceMin - b.priceMin);
    case 'price-desc':
      return sorted.sort((a, b) => b.priceMin - a.priceMin);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'popular':
    default:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

/**
 * Related products: same category first, falling back to the same active
 * ingredient so a product is never left with an empty rail.
 */
export function relatedProducts(product: CatalogProduct, limit = 4): CatalogProduct[] {
  const sameCategory = products.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      candidate.categories.some((slug) => product.categories.includes(slug)),
  );

  const sameIngredient = products.filter(
    (candidate) =>
      candidate.slug !== product.slug &&
      candidate.subtitle === product.subtitle &&
      !sameCategory.includes(candidate),
  );

  return [...sameCategory, ...sameIngredient].slice(0, limit);
}

/** Products carrying a given badge, used for the homepage rails. */
export function getProductsByBadge(badge: string, limit = 10): CatalogProduct[] {
  return products.filter((product) => product.badge === badge).slice(0, limit);
}
