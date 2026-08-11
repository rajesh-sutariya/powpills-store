import { AnnouncementBar } from '@/components/AnnouncementBar';
import { AssuranceStrip } from '@/components/AssuranceStrip';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Faq } from '@/components/Faq';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { MainNav } from '@/components/MainNav';
import { Newsletter } from '@/components/Newsletter';
import { PopularProducts } from '@/components/PopularProducts';
import { ProductRow } from '@/components/ProductRow';
import { PromoCards } from '@/components/PromoCards';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { StatsAndReview } from '@/components/StatsAndReview';
import { SupportBanner } from '@/components/SupportBanner';
import { Testimonials } from '@/components/Testimonials';
import { getHomepageContent } from '@/lib/wp';

/**
 * Surface rhythm down the page. No two adjacent sections share a background,
 * and the two tinted bands (stats, support) plus the dark close act as anchors
 * so the page reads as one document:
 *
 *   dark → white chrome → hero tint → soft → white → soft → white
 *        → brand tint → white → soft → white → mint tint → soft → white
 *        → dark → darker
 */
export default async function HomePage() {
  const { content } = await getHomepageContent();

  return (
    <>
      <AnnouncementBar content={content.announcement} />
      <SiteHeader content={content.header} />
      <MainNav content={content.nav} categories={content.categorySection.categories} />

      <main>
        {/* Hero tint, with the assurance strip overlapping up into it. */}
        <Hero content={content.hero} />
        <AssuranceStrip items={content.assurances} />

        <CategoryGrid content={content.categorySection} />
        <PopularProducts content={content.popularProducts} />
        <PromoCards cards={content.promos} />

        {/* First tinted anchor. */}
        <StatsAndReview stats={content.stats} review={content.reviewCard} />

        <HowItWorks content={content.howItWorks} />
        <ProductRow content={content.productRows[0]} background="soft" />
        <ProductRow content={content.productRows[1]} background="white" />

        {/* Second tinted anchor. */}
        <SupportBanner content={content.supportBanner} />

        <Testimonials content={content.testimonials} />
        <Faq content={content.faq} />
        <Newsletter content={content.newsletter} />
      </main>

      <SiteFooter content={content.footer} />
    </>
  );
}
