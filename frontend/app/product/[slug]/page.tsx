import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon, Stars } from '@/components/Icon';
import { PackSelector } from '@/components/product/PackSelector';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ProductGrid } from '@/components/ProductGrid';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { getCategory, getProduct, products, relatedProducts } from '@/lib/catalog';
import { homepageContent } from '@/lib/content';
import labels from '@/lib/ui-labels';

/**
 * Single product page, matching the live store's /product/<slug>/ URL.
 *
 * One page is pre-rendered per product so the site remains a static export.
 */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: labels.shop.title };

  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const category = getCategory(product.primaryCategory);
  const related = relatedProducts(product, 4);
  const assurances = homepageContent.assurances.slice(0, 4);

  return (
    <>
      {/* Breadcrumb band */}
      <div className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white py-5">
        <div className="shell">
          <Breadcrumbs
            trail={[
              { label: labels.shop.title, href: labels.shop.href },
              ...(category ? [{ label: category.name, href: category.href }] : []),
              { label: product.name },
            ]}
          />
        </div>
      </div>

      {/* Buy box */}
      <section className="bg-white py-10 lg:py-12">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="card flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-soft p-8">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={400}
                height={300}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            {/* Assurances, reused from the homepage so the promises match */}
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {assurances.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={item.icon} className="h-4.5 w-4.5" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-xs font-bold text-ink">{item.title}</span>
                    <span className="mt-0.5 block text-2xs text-ink-muted">{item.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div>
            {category && (
              <Link
                href={category.href}
                className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
              >
                <Icon name={category.icon} className="h-3.5 w-3.5" />
                {category.name}
              </Link>
            )}

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {product.name}
            </h1>

            <p className="mt-2 text-15 text-ink-muted">{product.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-2">
                <Stars rating={product.rating} className="h-4 w-4" />
                <span className="text-[0.8125rem] font-medium text-ink-muted">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-700">
                <Icon name="cart-check" className="h-4 w-4" />
                {labels.product.inStock}
              </span>
            </div>

            <div className="mt-5 border-y border-line py-5">
              <span className="block text-xs font-medium text-ink-muted">
                {labels.product.priceRangeLabel}
              </span>
              <span className="mt-1 block text-2xl font-extrabold tracking-tight text-brand-800 sm:text-3xl">
                {product.priceLabel}
              </span>
            </div>

            <div className="mt-6">
              <PackSelector packs={product.packs} />
            </div>

            {/* Key specs, above the fold */}
            <dl className="mt-7 grid gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
              {Object.entries(product.specs)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key} className="flex gap-2 text-[0.8125rem]">
                    <dt className="shrink-0 font-semibold text-ink">{key}:</dt>
                    <dd className="min-w-0 text-ink-muted">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface-soft py-10 lg:py-12">
        <div className="shell">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="shell">
            <SectionHeading
              title={labels.product.relatedTitle}
              align="split"
              action={
                category
                  ? { label: homepageContent.productRows[0].viewAllLabel, href: category.href }
                  : undefined
              }
            />
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
