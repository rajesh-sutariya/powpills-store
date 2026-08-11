import type { Metadata } from 'next';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { CategorySidebar } from '@/components/CategorySidebar';
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

      <section className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <CategorySidebar />
          <CatalogBrowser products={products} />
        </div>
      </section>
    </>
  );
}
