import { categories, getProducts, getProductsByCategory, products } from './catalog';
import type { HomepageContent } from './types';

/**
 * ---------------------------------------------------------------------------
 * HOMEPAGE COPY
 * ---------------------------------------------------------------------------
 * Every visible string of the homepage design lives here, and the WordPress
 * seeder (class-powpills-content.php) mirrors it one-to-one — tools/check-copy-parity.py
 * enforces that.
 *
 * Products and categories are NOT duplicated here: they are resolved from the
 * shared catalogue (data/catalog.json) so the homepage rails, the category
 * pages and WordPress can never disagree.
 */

const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images`;

/** Homepage category strip: the real store categories, in nav order. */
const homepageCategories = categories;

/** Popular rail — a spread across categories, with the tab filters below. */
const popularRail = getProducts([
  'cenforce-100-mg',
  'vidalista-20-mg',
  'super-vidalista',
  'finpecia-1-mg',
  'kz-cream',
  'careprost-3-ml',
  'zerodol-sp',
  'cenforce-200-mg',
  'tugain-5-solution',
  'aziderm-20-cream',
  'jardiance-10-mg',
  'urimax-d',
]);

const erectileDysfunctionRail = getProductsByCategory('erectile-dysfunction').slice(0, 8);
const skinAndHairRail = [
  ...getProductsByCategory('hair-loss'),
  ...getProductsByCategory('skin-care'),
].slice(0, 8);

export const homepageContent: HomepageContent = {
  announcement: {
    items: [
      { icon: 'shield-check', label: 'Genuine Packaging' },
      { icon: 'lock', label: 'Secure Checkout' },
      { icon: 'truck', label: 'Trackable Delivery' },
      { icon: 'headset', label: '24/7 Customer Support' },
    ],
    shipTo: {
      label: 'Delivering to:',
      value: 'United States',
    },
  },

  header: {
    brand: {
      name: 'PowPills',
      tagline: 'Trusted · Affordable · Delivered',
    },
    search: {
      placeholder: 'Search product, ingredient, brand or condition...',
      buttonLabel: 'Search',
    },
    account: {
      title: 'My Account',
      subtitle: 'Login',
      href: '/account',
    },
    cart: {
      title: 'Cart',
      itemsLabel: '0 items',
      total: '$0.00',
      href: '/cart',
    },
  },

  nav: {
    categoriesLabel: 'Shop by Category',
    links: [
      { label: 'Best Sellers', href: '/shop' },
      { label: 'Erectile Dysfunction', href: '/product-category/erectile-dysfunction' },
      { label: 'Premature Ejaculation', href: '/product-category/premature-ejaculation' },
      { label: 'Hair Loss', href: '/product-category/hair-loss' },
      { label: 'Skin Care', href: '/product-category/skin-care' },
      { label: "Women's Health", href: '/product-category/womens-health' },
      { label: 'Pain Relief', href: '/product-category/pain' },
      { label: 'All Categories', href: '/all-categories' },
    ],
  },

  hero: {
    title: 'Your Trusted Online Pharmacy & Healthcare Store',
    description:
      'Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices.',
    features: [
      { icon: 'package', label: 'Discreet Packaging' },
      { icon: 'lock', label: 'Secure Checkout' },
      { icon: 'truck', label: 'Trackable Delivery' },
      { icon: 'headset', label: '24/7 Support' },
    ],
    primaryCta: { label: 'Shop All Meds', href: '/shop' },
    secondaryCta: { label: 'Browse Categories', href: '/all-categories' },
    image: {
      src: `${IMG}/hero-products.svg`,
      alt: 'PowPills medicines, supplements and healthcare products',
    },
  },

  assurances: [
    { icon: 'shield-check', title: 'Quality Assured', description: 'Sourced from trusted suppliers' },
    { icon: 'tag', title: 'Affordable Prices', description: 'Best prices on all medicines' },
    { icon: 'globe', title: 'Worldwide Shipping', description: 'Delivering to 100+ countries' },
    { icon: 'credit-card', title: 'Multiple Payment Options', description: 'Safe & secure payments' },
    { icon: 'refresh', title: 'Easy Returns', description: 'Hassle-free return policy' },
  ],

  categorySection: {
    title: 'Shop by Category',
    subtitle: 'Find the right healthcare and wellness products for you',
    ctaLabel: 'View Products',
    categories: homepageCategories,
  },

  popularProducts: {
    title: 'Popular Products Across Our Store',
    viewAllLabel: 'View All Products',
    viewAllHref: '/shop',
    tabs: [
      'All Products',
      'Erectile Dysfunction',
      'Premature Ejaculation',
      'Hair Loss',
      'Skin Care',
      'Pain Relief',
      'Diabetes',
    ],
    products: popularRail,
  },

  promos: [
    {
      title: 'Discreet & Safe Delivery',
      description:
        'Your privacy is our priority. All orders are shipped in plain, discreet packaging with no product information on the outside.',
      tone: 'mint',
      ctaLabel: 'Learn More',
      href: '/shipping-delivery',
      image: { src: `${IMG}/promo-delivery.svg`, alt: 'Discreet PowPills delivery package' },
    },
    {
      title: 'Save More with Bigger Pack Sizes',
      description:
        'Choose from multiple pack sizes and save more when you buy your favourite products in bulk.',
      tone: 'rose',
      image: { src: `${IMG}/promo-packs.svg`, alt: 'Multiple pack sizes of PowPills products' },
    },
    {
      title: 'Need Help Choosing?',
      description: 'Our customer support team is here to help you find the right product.',
      tone: 'cream',
      image: { src: `${IMG}/promo-support.svg`, alt: 'Customer support headset' },
    },
  ],

  stats: {
    title: 'Trusted by Thousands of Customers Worldwide',
    items: [
      { value: '10,000+', label: 'Happy Customers' },
      { value: '500+', label: 'Trusted Products' },
      { value: '100+', label: 'Countries Served' },
      { value: '98%', label: 'Satisfaction Rate' },
    ],
  },

  reviewCard: {
    score: '4.8',
    scoreLabel: 'Excellent',
    quote: 'Excellent service, genuine products and very fast discreet delivery. Highly recommended!',
    author: { name: 'Michael R.', role: 'Verified Buyer', avatar: `${IMG}/avatar-michael.svg` },
  },

  howItWorks: {
    title: 'How It Works',
    subtitle: 'Getting your health essentials is simple and secure',
    steps: [
      {
        step: '1',
        icon: 'search',
        title: 'Browse & Select',
        description: 'Explore our range of trusted products',
      },
      {
        step: '2',
        icon: 'lock',
        title: 'Secure Checkout',
        description: 'Place your order with our safe and encrypted checkout',
      },
      {
        step: '3',
        icon: 'truck',
        title: 'Fast & Discreet Delivery',
        description: 'We pack discreetly and ship right to your doorstep',
      },
      {
        step: '4',
        icon: 'heart',
        title: 'Stay Healthy',
        description: 'Enjoy quality healthcare and live your best life',
      },
    ],
  },

  productRows: [
    {
      title: 'Best Sellers in Erectile Dysfunction',
      viewAllLabel: 'View All',
      viewAllHref: '/product-category/erectile-dysfunction',
      products: erectileDysfunctionRail,
    },
    {
      title: 'Hair & Skin Care Essentials',
      viewAllLabel: 'View All',
      viewAllHref: '/product-category/skin-care',
      products: skinAndHairRail,
    },
  ],

  supportBanner: {
    title: "Need Help? We're Here For You",
    description:
      'Our support team is available 24/7 to assist you with orders, products or any questions.',
    channels: [
      { icon: 'chat', title: 'Live Chat', detail: 'Chat with us online' },
      { icon: 'mail', title: 'Email Support', detail: 'support@powpills.com' },
      { icon: 'phone', title: 'Call Us', detail: '+1 (888) 123-4567' },
    ],
    image: { src: `${IMG}/support-agent.svg`, alt: 'PowPills customer support agent' },
  },

  testimonials: {
    title: 'What Our Customers Say',
    items: [
      {
        quote: 'Great prices and fast delivery. The packaging is always discreet and professional.',
        name: 'Daniel L.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-daniel.svg`,
      },
      {
        quote: 'Excellent customer service and a wide range of products. Highly trusted store.',
        name: 'Sarah K.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-sarah.svg`,
      },
      {
        quote: 'Ordering was simple, the medicine arrived quickly and exactly as described.',
        name: 'James T.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-james.svg`,
      },
      {
        quote: 'Everything arrived on time and in perfect condition. Very happy with the service.',
        name: 'Priya M.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-priya.svg`,
      },
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Is my order information kept private?',
        answer:
          'Yes. Your privacy is our priority. All orders are shipped in plain, discreet packaging with no product information on the outside, and your details are never shared with third parties.',
      },
      {
        question: 'Are the products genuine?',
        answer:
          'Every product we sell is sourced from trusted suppliers and checked before it is dispatched, so you always receive genuine medicines and healthcare products.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Delivery times depend on your location. Orders are dispatched quickly and every parcel comes with tracking so you can follow it right to your doorstep.',
      },
      {
        question: 'Can I return or exchange a product?',
        answer:
          'Yes. We offer a hassle-free return policy. Contact our support team with your order number and we will help you arrange a return or exchange.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'We deliver to 100+ countries worldwide with trackable shipping and multiple secure payment options at checkout.',
      },
      {
        question: 'How can I contact customer support?',
        answer:
          'Our support team is available 24/7 by live chat, by email at support@powpills.com or by phone at +1 (888) 123-4567.',
      },
    ],
  },

  newsletter: {
    title: 'Stay Healthy, Stay Informed.',
    description: 'Subscribe to our newsletter for exclusive offers, health tips and updates.',
    placeholder: 'Enter your email address',
    buttonLabel: 'Subscribe',
  },

  footer: {
    brand: {
      name: 'PowPills',
      tagline: 'Trusted. Affordable. Delivered.',
      description:
        'Your trusted online pharmacy for medicines, health products and wellness essentials.',
    },
    socials: [
      { label: 'Facebook', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    columns: [
      {
        title: 'Customer Service',
        links: [
          { label: 'Contact Us', href: '/contact' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Shipping & Delivery', href: '/shipping-delivery' },
          { label: 'Returns & Refunds', href: '/returns-refunds' },
          { label: 'Order Tracking', href: '/order-tracking' },
        ],
      },
      {
        title: 'My Account',
        links: [
          { label: 'Login', href: '/account/login' },
          { label: 'Register', href: '/account/register' },
          { label: 'Address Book', href: '/account/addresses' },
          { label: 'Order History', href: '/account/orders' },
        ],
      },
      {
        title: 'Categories',
        links: [
          { label: 'Erectile Dysfunction', href: '/product-category/erectile-dysfunction' },
          { label: 'Premature Ejaculation', href: '/product-category/premature-ejaculation' },
          { label: 'Hair Loss', href: '/product-category/hair-loss' },
          { label: 'Skin Care', href: '/product-category/skin-care' },
          { label: "Women's Health", href: '/product-category/womens-health' },
          { label: 'Pain Relief', href: '/product-category/pain' },
          { label: 'All Categories', href: '/all-categories' },
        ],
      },
      {
        title: 'Information',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms & Conditions', href: '/terms-conditions' },
          { label: 'Blog', href: '/blog' },
          { label: 'Sitemap', href: '/sitemap' },
        ],
      },
    ],
    contact: {
      title: 'Contact Us',
      items: [
        { icon: 'mail', label: 'support@powpills.com' },
        { icon: 'phone', label: '+1 (888) 123-4567' },
        { icon: 'headset', label: '24/7 Customer Support' },
        { icon: 'map-pin', label: '123 Wellness Ave, New York, NY 10001, USA' },
      ],
    },
    payments: {
      label: 'We Accept',
      methods: ['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'],
    },
    secureLabel: '100% Secure Checkout',
    copyright: '© 2024 PowPills. All rights reserved.',
  },
};

/** Total catalogue size, used by the shop page header. */
export const catalogueSize = products.length;

export default homepageContent;
