import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Icon, Stars } from '@/components/Icon';
import { PackSelector } from '@/components/product/PackSelector';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ReviewSummary } from '@/components/product/ReviewSummary';
import { StickyBuyBar } from '@/components/product/StickyBuyBar';
import { TrustPanel } from '@/components/product/TrustPanel';
import { ProductGrid } from '@/components/ProductGrid';
import { SectionHeading } from '@/components/SectionHeading';
import {
  disclaimer,
  getCategory,
  getProduct,
  products,
  relatedProducts,
  sameIngredient,
} from '@/lib/catalog';
import { homepageContent } from '@/lib/content';
import labels from '@/lib/ui-labels';

/** One statically pre-rendered page per product, matching /product/<slug>/. */
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
  const alternatives = sameIngredient(product, 4);
  const related = relatedProducts(product, 4);

  // Product structured data, so search engines can read the price range,
  // rating and availability rather than guessing from the markup.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.specs.SKU ?? product.slug,
    brand: { '@type': 'Brand', name: product.name.split(' ')[0] },
    category: category?.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: product.priceMin,
      highPrice: product.priceMax,
      offerCount: product.packs.length,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb band */}
      <div className="border-b border-brand-100 bg-gradient-to-b from-brand-50 to-white py-4 lg:py-5">
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
      <section id="buy-box" className="bg-white py-8 lg:py-12">
        <div className="shell grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <ProductGallery images={product.gallery} alt={product.image.alt} />
          </div>

          <div>
            {category && (
              <Link
                href={category.href}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
              >
                <Icon name={category.icon} className="h-3.5 w-3.5" />
                {category.name}
              </Link>
            )}

            <h1 className="mt-3.5 text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-2xl lg:text-3xl">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-ink-muted sm:text-15">{product.subtitle}</p>

            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href="#reviews" className="flex items-center gap-2">
                <Stars rating={product.rating} className="h-4 w-4" />
                <span className="text-[0.8125rem] font-medium text-ink-muted underline-offset-2 hover:underline">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </a>

              <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-brand-700">
                <Icon name="cart-check" className="h-4 w-4" />
                {labels.product.inStock}
              </span>
            </div>

            <div className="mt-5 border-y border-line py-4">
              <span className="block text-xs font-medium text-ink-muted">
                {labels.product.priceRangeLabel}
              </span>
              <span className="mt-1 block text-2xl font-extrabold tracking-tight text-brand-800 sm:text-3xl">
                {product.priceLabel}
              </span>
            </div>

            {/* Prescription notice, stated before the shopper commits */}
            <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-surface-cream px-4 py-3 text-xs leading-relaxed text-ink-soft">
              <Icon name="shield-check" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              {labels.product.prescriptionNotice}
            </p>

            <div className="mt-6">
              <PackSelector packs={product.packs} />
            </div>

            <div className="mt-6">
              <TrustPanel payments={homepageContent.footer.payments} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-t border-line bg-surface-soft py-10 lg:py-12">
        <div className="shell">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Ratings. Rendered up front rather than behind a tab: the distribution
          summary is the most-used part of a reviews section, and an average
          alone hides whether it came from consistent 5s or a split verdict. */}
      <section id="reviews" className="bg-white py-12 lg:py-14">
        <div className="shell">
          <h2 className="h-panel">{labels.product.reviewsTitle}</h2>

          <div className="mt-6 max-w-3xl">
            <ReviewSummary product={product} />
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-muted">
              {labels.product.reviewsEmpty}
            </p>
          </div>
        </div>
      </section>

      {/* Safety and usage */}
      <section className="border-t border-line bg-surface-soft py-12 lg:py-14">
        <div className="shell">
          <h2 className="h-panel">{labels.product.usageTitle}</h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {product.usage.map((block) => (
              <li key={block.title} className="card h-full p-5">
                <h3 className="text-sm font-bold text-ink">{block.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">{block.body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-ink-faint">{disclaimer}</p>
        </div>
      </section>

      {/* Product FAQs */}
      <section className="bg-white py-12 lg:py-14">
        <div className="shell">
          <SectionHeading title={labels.product.faqTitle} />
          <FaqAccordion items={product.faqs} />
        </div>
      </section>

      {/* Same active ingredient — the closest real alternatives */}
      {alternatives.length > 0 && (
        <section className="bg-white py-12 lg:py-14">
          <div className="shell">
            <SectionHeading
              title={labels.product.alternativesTitle}
              align="split"
              action={
                category
                  ? { label: homepageContent.productRows[0].viewAllLabel, href: category.href }
                  : undefined
              }
            />
            <ProductGrid products={alternatives} />
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface-soft py-12 lg:py-14">
          <div className="shell">
            <SectionHeading title={labels.product.relatedTitle} />
            <ProductGrid products={related} />
          </div>
        </section>
      )}

      <StickyBuyBar priceLabel={product.priceLabel} name={product.name} />
    </>
  );
}
