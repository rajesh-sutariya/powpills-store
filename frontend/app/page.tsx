import { AssuranceStrip } from '@/components/AssuranceStrip';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Faq } from '@/components/Faq';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { PopularProducts } from '@/components/PopularProducts';
import { ProductRow } from '@/components/ProductRow';
import { PromoCards } from '@/components/PromoCards';
import { StatsAndReview } from '@/components/StatsAndReview';
import { SupportBanner } from '@/components/SupportBanner';
import { Testimonials } from '@/components/Testimonials';
import { getHomepageContent } from '@/lib/wp';

/**
 * Surface rhythm down the page. No two adjacent sections share a background,
 * and the two tinted bands (stats, support) plus the dark newsletter close act
 * as anchors so the page reads as one document.
 */
export default async function HomePage() {
  const { content } = await getHomepageContent();

  return (
    <>
      <Hero content={content.hero} />
      <AssuranceStrip items={content.assurances} />

      <CategoryGrid content={content.categorySection} />
      <PopularProducts content={content.popularProducts} />
      <PromoCards cards={content.promos} />

      <StatsAndReview stats={content.stats} review={content.reviewCard} />

      <HowItWorks content={content.howItWorks} />
      <ProductRow content={content.productRows[0]} background="soft" />
      <ProductRow content={content.productRows[1]} background="white" />

      <SupportBanner content={content.supportBanner} />

      <Testimonials content={content.testimonials} />
      <Faq content={content.faq} />
    </>
  );
}
