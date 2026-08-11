import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { CategoryContent } from '@/components/CategoryContent';
import { PageHeader } from '@/components/PageHeader';
import { categories, getCategory, getProductsByCategory } from '@/lib/catalog';
import labels from '@/lib/ui-labels';

/**
 * Category archive, matching the live store's /product-category/<slug>/ URL.
 *
 * `generateStaticParams` pre-renders one page per category, which is what lets
 * the whole site ship as a static export.
 */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) return { title: labels.shop.title };

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        trail={[{ label: labels.shop.title, href: labels.shop.href }, { label: category.name }]}
        meta={`${categoryProducts.length} ${
          categoryProducts.length === 1 ? labels.toolbar.resultsOne : labels.toolbar.resultsMany
        }`}
      />

      <section className="bg-white py-10 lg:py-12">
        <div className="shell">
          <CatalogBrowser products={categoryProducts} activeSlug={slug} />
        </div>
      </section>

      <CategoryContent category={category} />
    </>
  );
}
