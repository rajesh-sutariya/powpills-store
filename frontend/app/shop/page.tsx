import type { Metadata } from 'next';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { PageHeader } from '@/components/PageHeader';
import { products } from '@/lib/catalog';
import labels from '@/lib/ui-labels';

export const metadata: Metadata = {
  title: labels.shop.title,
  description: labels.shop.description,
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title={labels.shop.title}
        description={labels.shop.description}
        trail={[{ label: labels.shop.title }]}
        meta={`${products.length} ${labels.toolbar.resultsMany}`}
      />

      <section className="bg-white py-10 lg:py-12">
        <div className="shell">
          <CatalogBrowser products={products} />
        </div>
      </section>
    </>
  );
}
