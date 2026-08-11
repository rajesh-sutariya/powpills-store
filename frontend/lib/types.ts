/**
 * Shared content contract.
 *
 * The exact same shape is returned by the WordPress REST endpoint
 * `/wp-json/powpills/v1/homepage` (see backend/wp-content/plugins/powpills-core).
 * `lib/content.ts` holds the identical payload as a static fallback so the
 * storefront renders even when WordPress is unreachable.
 */

import type { CatalogCategory, CatalogProduct } from './catalog-types';

export type IconName =
  | 'shield-check'
  | 'lock'
  | 'truck'
  | 'headset'
  | 'package'
  | 'tag'
  | 'globe'
  | 'credit-card'
  | 'refresh'
  | 'male'
  | 'female'
  | 'bandage'
  | 'hair'
  | 'skin'
  | 'pill'
  | 'grid'
  | 'chat'
  | 'mail'
  | 'phone'
  | 'search'
  | 'user'
  | 'cart'
  | 'map-pin'
  | 'cart-check'
  | 'sparkles'
  | 'heart'
  | 'bolt'
  | 'leaf';

export type Tone = 'mint' | 'rose' | 'cream' | 'sky' | 'soft';

export interface IconItem {
  icon: IconName;
  label: string;
}

export interface AnnouncementBar {
  items: IconItem[];
  shipTo: {
    label: string;
    value: string;
  };
}

export interface HeaderContent {
  brand: {
    name: string;
    tagline: string;
  };
  search: {
    placeholder: string;
    buttonLabel: string;
  };
  account: {
    title: string;
    subtitle: string;
    href: string;
  };
  cart: {
    title: string;
    itemsLabel: string;
    total: string;
    href: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  categoriesLabel: string;
  links: NavLink[];
}

export interface HeroContent {
  title: string;
  description: string;
  features: IconItem[];
  primaryCta: NavLink;
  secondaryCta: NavLink;
  image: {
    src: string;
    alt: string;
  };
}

export interface Assurance {
  icon: IconName;
  title: string;
  description: string;
}

export interface CategorySection {
  title: string;
  subtitle: string;
  /** Shared call to action rendered on every category card. */
  ctaLabel: string;
  categories: CatalogCategory[];
}

export interface ProductSection {
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  tabs?: string[];
  products: CatalogProduct[];
}

export interface PromoCard {
  title: string;
  description: string;
  tone: Tone;
  ctaLabel?: string;
  href?: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface StatsSection {
  title: string;
  items: {
    value: string;
    label: string;
  }[];
}

export interface ReviewCard {
  score: string;
  scoreLabel: string;
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface HowItWorksStep {
  step: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface HowItWorksSection {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

export interface SupportChannel {
  icon: IconName;
  title: string;
  detail: string;
}

export interface SupportBanner {
  title: string;
  description: string;
  channels: SupportChannel[];
  image: {
    src: string;
    alt: string;
  };
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TestimonialSection {
  title: string;
  items: Testimonial[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

export interface NewsletterSection {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  socials: { label: string; href: string }[];
  columns: FooterColumn[];
  contact: {
    title: string;
    items: { icon: IconName; label: string }[];
  };
  payments: {
    label: string;
    methods: string[];
  };
  secureLabel: string;
  copyright: string;
}

export interface HomepageContent {
  announcement: AnnouncementBar;
  header: HeaderContent;
  nav: NavContent;
  hero: HeroContent;
  assurances: Assurance[];
  categorySection: CategorySection;
  popularProducts: ProductSection;
  promos: PromoCard[];
  stats: StatsSection;
  reviewCard: ReviewCard;
  howItWorks: HowItWorksSection;
  productRows: ProductSection[];
  supportBanner: SupportBanner;
  testimonials: TestimonialSection;
  faq: FaqSection;
  newsletter: NewsletterSection;
  footer: FooterContent;
}
