import type { Metadata } from 'next';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { MainNav } from '@/components/MainNav';
import { Newsletter } from '@/components/Newsletter';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getHomepageContent } from '@/lib/wp';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PowPills — Your Trusted Online Pharmacy & Healthcare Store',
    template: '%s | PowPills',
  },
  description:
    'Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices.',
};

/**
 * Site chrome lives here, not on the homepage, so the header, category nav,
 * newsletter band and footer are identical on every page — the shop, category
 * and product pages included.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { content } = await getHomepageContent();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <AnnouncementBar content={content.announcement} />
        <SiteHeader content={content.header} />
        <MainNav content={content.nav} categories={content.categorySection.categories} />

        <main className="flex-1">{children}</main>

        <Newsletter content={content.newsletter} />
        <SiteFooter content={content.footer} />
      </body>
    </html>
  );
}
