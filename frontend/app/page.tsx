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

export default async function HomePage() {
  const { content } = await getHomepageContent();

  return (
    <>
      {/* 1. Utility bar */}
      <AnnouncementBar content={content.announcement} />

      {/* 2. Logo, search, account, cart */}
      <SiteHeader content={content.header} />

      {/* 3. Category navigation */}
      <MainNav content={content.nav} categories={content.categorySection.categories} />

      <main>
        {/* 4. Hero */}
        <Hero content={content.hero} />

        {/* 5. Quality / price / shipping / payment / returns strip */}
        <AssuranceStrip items={content.assurances} />

        {/* 6. Shop by Category */}
        <CategoryGrid content={content.categorySection} />

        {/* 7. Popular Products Across Our Store (tabs + rail) */}
        <PopularProducts content={content.popularProducts} />

        {/* 8. Three promo cards */}
        <PromoCards cards={content.promos} />

        {/* 9. Trust stats + featured review */}
        <StatsAndReview stats={content.stats} review={content.reviewCard} />

        {/* 10. How It Works */}
        <HowItWorks content={content.howItWorks} />

        {/* 11. Best Sellers in Men's Health */}
        <ProductRow content={content.productRows[0]} />

        {/* 12. Wellness, Hair & Skin Essentials */}
        <ProductRow content={content.productRows[1]} />

        {/* 13. Support banner */}
        <SupportBanner content={content.supportBanner} />

        {/* 14. What Our Customers Say */}
        <Testimonials content={content.testimonials} />

        {/* 15. Frequently Asked Questions */}
        <Faq content={content.faq} />

        {/* 16. Newsletter */}
        <Newsletter content={content.newsletter} />
      </main>

      {/* 17. Footer */}
      <SiteFooter content={content.footer} />
    </>
  );
}
