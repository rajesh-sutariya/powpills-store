import type { HomepageContent, Product } from './types';

/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR ALL COPY ON THE HOMEPAGE
 * ---------------------------------------------------------------------------
 * Every visible string of the design lives in this file, and the WordPress
 * seeder (backend/wp-content/plugins/powpills-core/includes/class-seeder.php)
 * mirrors it one-to-one. Change a string here and in the seeder and it changes
 * everywhere on the page.
 */

// Placeholder image folder. NEXT_PUBLIC_BASE_PATH is only set when the site is
// served from a sub-path (the GitHub Pages preview); locally it resolves to /images.
const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images`;

const popularProducts: Product[] = [
  {
    id: 'tadapox-10mg',
    name: 'Tadapox 10 mg',
    subtitle: 'Tadalafil Tablets',
    category: "Men's Health",
    badge: { label: 'Sale', tone: 'sale' },
    tabs: ['Best Sellers', "Men's Health"],
    rating: 4.8,
    reviewCount: 126,
    price: '$32.00 – $148.00',
    compareAtPrice: '$40.00',
    ctaLabel: 'View Options',
    href: '/product/tadapox-10mg',
    image: { src: `${IMG}/product-tadapox.svg`, alt: 'Tadapox 10 mg tablets pack' },
  },
  {
    id: 'minoxidil-5-solution',
    name: 'Minoxidil 5% Solution',
    subtitle: 'Hair Regrowth Treatment',
    category: 'Hair Care',
    badge: { label: 'Sale', tone: 'sale' },
    tabs: ['Best Sellers', 'Wellness'],
    rating: 4.7,
    reviewCount: 98,
    price: '$24.00 – $96.00',
    compareAtPrice: '$30.00',
    ctaLabel: 'View Options',
    href: '/product/minoxidil-5-solution',
    image: { src: `${IMG}/product-minoxidil.svg`, alt: 'Minoxidil 5% solution bottle' },
  },
  {
    id: 'beto-400',
    name: 'Beto 400',
    subtitle: 'Paracetamol Tablets',
    category: 'Pain Relief',
    badge: { label: 'Hot', tone: 'hot' },
    tabs: ['Best Sellers', 'Pain Relief'],
    rating: 4.6,
    reviewCount: 204,
    price: '$12.00 – $58.00',
    compareAtPrice: '$15.00',
    ctaLabel: 'View Options',
    href: '/product/beto-400',
    image: { src: `${IMG}/product-beto.svg`, alt: 'Beto 400 tablets pack' },
  },
  {
    id: 'biotin-tablets',
    name: 'Biotin Tablets',
    subtitle: 'Hair & Nail Support',
    category: 'Wellness',
    tabs: ['New Arrivals', 'Wellness'],
    rating: 4.9,
    reviewCount: 152,
    price: '$16.00 – $72.00',
    compareAtPrice: '$20.00',
    ctaLabel: 'View Options',
    href: '/product/biotin-tablets',
    image: { src: `${IMG}/product-biotin.svg`, alt: 'Biotin tablets bottle' },
  },
  {
    id: 'aceclofen-gel',
    name: 'Aceclofen Gel',
    subtitle: 'Topical Pain Relief',
    category: 'Pain Relief',
    badge: { label: 'New', tone: 'new' },
    tabs: ['New Arrivals', 'Pain Relief'],
    rating: 4.5,
    reviewCount: 76,
    price: '$9.00 – $42.00',
    compareAtPrice: '$12.00',
    ctaLabel: 'View Options',
    href: '/product/aceclofen-gel',
    image: { src: `${IMG}/product-aceclofen.svg`, alt: 'Aceclofen gel tube' },
  },
  {
    id: 'vitamin-c-serum',
    name: 'Vitamin C Serum',
    subtitle: 'Brightening Face Serum',
    category: 'Skin Care',
    badge: { label: 'New', tone: 'new' },
    tabs: ['New Arrivals', 'Skin Care'],
    rating: 4.7,
    reviewCount: 88,
    price: '$18.00 – $64.00',
    ctaLabel: 'View Options',
    href: '/product/vitamin-c-serum',
    image: { src: `${IMG}/product-serum.svg`, alt: 'Vitamin C serum bottle' },
  },
  {
    id: 'salicylic-acid-face-wash',
    name: 'Salicylic Acid Face Wash',
    subtitle: 'Acne & Oil Control',
    category: 'Skin Care',
    tabs: ['Skin Care', 'Wellness'],
    rating: 4.6,
    reviewCount: 64,
    price: '$11.00 – $38.00',
    ctaLabel: 'View Options',
    href: '/product/salicylic-acid-face-wash',
    image: { src: `${IMG}/product-facewash.svg`, alt: 'Salicylic acid face wash bottle' },
  },
  {
    id: 'sildenafil-100mg',
    name: 'Sildenafil 100 mg',
    subtitle: 'Erectile Dysfunction',
    category: "Men's Health",
    badge: { label: 'Sale', tone: 'sale' },
    tabs: ['Best Sellers', "Men's Health"],
    rating: 4.9,
    reviewCount: 318,
    price: '$28.00 – $132.00',
    compareAtPrice: '$36.00',
    ctaLabel: 'View Options',
    href: '/product/sildenafil-100mg',
    image: { src: `${IMG}/product-sildenafil.svg`, alt: 'Sildenafil 100 mg tablets pack' },
  },
  {
    id: 'ibuprofen-400mg',
    name: 'Ibuprofen 400 mg',
    subtitle: 'Anti-Inflammatory Tablets',
    category: 'Pain Relief',
    tabs: ['Pain Relief', 'Best Sellers'],
    rating: 4.6,
    reviewCount: 176,
    price: '$8.00 – $34.00',
    ctaLabel: 'View Options',
    href: '/product/ibuprofen-400mg',
    image: { src: `${IMG}/product-ibuprofen.svg`, alt: 'Ibuprofen 400 mg tablets pack' },
  },
  {
    id: 'multivitamin-daily',
    name: 'Daily Multivitamin',
    subtitle: 'Complete Wellness Formula',
    category: 'Vitamins & Supplements',
    tabs: ['Wellness', 'New Arrivals'],
    rating: 4.8,
    reviewCount: 142,
    price: '$14.00 – $56.00',
    ctaLabel: 'View Options',
    href: '/product/multivitamin-daily',
    image: { src: `${IMG}/product-multivitamin.svg`, alt: 'Daily multivitamin bottle' },
  },
];

const mensHealthProducts: Product[] = [
  {
    id: 'sildenafil-100mg',
    name: 'Sildenafil 100 mg',
    subtitle: 'Erectile Dysfunction',
    category: "Men's Health",
    rating: 4.9,
    reviewCount: 318,
    price: '$28.00 – $132.00',
    compareAtPrice: '$36.00',
    ctaLabel: 'View Options',
    href: '/product/sildenafil-100mg',
    image: { src: `${IMG}/product-sildenafil.svg`, alt: 'Sildenafil 100 mg tablets pack' },
  },
  {
    id: 'vardenafil-20mg',
    name: 'Vardenafil 20 mg',
    subtitle: 'Fast Acting Tablets',
    category: "Men's Health",
    rating: 4.7,
    reviewCount: 164,
    price: '$34.00 – $146.00',
    compareAtPrice: '$42.00',
    ctaLabel: 'View Options',
    href: '/product/vardenafil-20mg',
    image: { src: `${IMG}/product-vardenafil.svg`, alt: 'Vardenafil 20 mg tablets pack' },
  },
  {
    id: 'finasteride-1mg',
    name: 'Finasteride 1 mg',
    subtitle: 'Hair Loss Treatment',
    category: "Men's Health",
    rating: 4.6,
    reviewCount: 121,
    price: '$19.00 – $88.00',
    compareAtPrice: '$24.00',
    ctaLabel: 'View Options',
    href: '/product/finasteride-1mg',
    image: { src: `${IMG}/product-finasteride.svg`, alt: 'Finasteride 1 mg tablets pack' },
  },
  {
    id: 'dapoxetine-60mg',
    name: 'Dapoxetine 60 mg',
    subtitle: 'Premature Ejaculation',
    category: "Men's Health",
    rating: 4.5,
    reviewCount: 96,
    price: '$26.00 – $118.00',
    compareAtPrice: '$32.00',
    ctaLabel: 'View Options',
    href: '/product/dapoxetine-60mg',
    image: { src: `${IMG}/product-dapoxetine.svg`, alt: 'Dapoxetine 60 mg tablets pack' },
  },
  {
    id: 'testosterone-booster',
    name: 'Testosterone Booster',
    subtitle: 'Stamina & Strength',
    category: "Men's Health",
    rating: 4.7,
    reviewCount: 134,
    price: '$21.00 – $94.00',
    compareAtPrice: '$26.00',
    ctaLabel: 'View Options',
    href: '/product/testosterone-booster',
    image: { src: `${IMG}/product-testosterone.svg`, alt: 'Testosterone booster jar' },
  },
];

const wellnessProducts: Product[] = [
  {
    id: 'collagen-peptides',
    name: 'Collagen Peptides',
    subtitle: 'Skin, Hair & Nails',
    category: 'Vitamins & Supplements',
    rating: 4.8,
    reviewCount: 188,
    price: '$22.00 – $92.00',
    compareAtPrice: '$28.00',
    ctaLabel: 'View Options',
    href: '/product/collagen-peptides',
    image: { src: `${IMG}/product-collagen.svg`, alt: 'Collagen peptides tub' },
  },
  {
    id: 'vitamin-d3-5000iu',
    name: 'Vitamin D3 5000 IU',
    subtitle: 'Bone & Immunity Support',
    category: 'Vitamins & Supplements',
    rating: 4.9,
    reviewCount: 246,
    price: '$13.00 – $52.00',
    compareAtPrice: '$16.00',
    ctaLabel: 'View Options',
    href: '/product/vitamin-d3-5000iu',
    image: { src: `${IMG}/product-vitamind3.svg`, alt: 'Vitamin D3 5000 IU softgels bottle' },
  },
  {
    id: 'omega-3-1000mg',
    name: 'Omega-3 1000 mg',
    subtitle: 'Heart Health',
    category: 'Vitamins & Supplements',
    rating: 4.7,
    reviewCount: 173,
    price: '$17.00 – $68.00',
    compareAtPrice: '$21.00',
    ctaLabel: 'View Options',
    href: '/product/omega-3-1000mg',
    image: { src: `${IMG}/product-omega3.svg`, alt: 'Omega-3 1000 mg softgels bottle' },
  },
  {
    id: 'ketoconazole-shampoo',
    name: 'Ketoconazole Shampoo',
    subtitle: 'Anti-Dandruff Care',
    category: 'Hair Care',
    rating: 4.6,
    reviewCount: 112,
    price: '$15.00 – $58.00',
    compareAtPrice: '$19.00',
    ctaLabel: 'View Options',
    href: '/product/ketoconazole-shampoo',
    image: { src: `${IMG}/product-shampoo.svg`, alt: 'Ketoconazole shampoo bottle' },
  },
  {
    id: 'niacinamide-serum',
    name: 'Niacinamide Serum',
    subtitle: 'Blemish & Pore Care',
    category: 'Skin Care',
    rating: 4.8,
    reviewCount: 129,
    price: '$18.00 – $64.00',
    compareAtPrice: '$23.00',
    ctaLabel: 'View Options',
    href: '/product/niacinamide-serum',
    image: { src: `${IMG}/product-niacinamide.svg`, alt: 'Niacinamide serum bottle' },
  },
];

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
      { label: 'Best Sellers', href: '/best-sellers' },
      { label: "Men's Health", href: '/category/mens-health' },
      { label: "Women's Health", href: '/category/womens-health' },
      { label: 'Pain Relief', href: '/category/pain-relief' },
      { label: 'Hair Care', href: '/category/hair-care' },
      { label: 'Skin Care', href: '/category/skin-care' },
      { label: 'Vitamins & Supplements', href: '/category/vitamins-supplements' },
      { label: 'All Categories', href: '/categories' },
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
    secondaryCta: { label: 'Browse Categories', href: '/categories' },
    image: {
      src: `${IMG}/hero-products.svg`,
      alt: 'PowPills medicines, supplements and healthcare products',
    },
  },

  assurances: [
    {
      icon: 'shield-check',
      title: 'Quality Assured',
      description: 'Sourced from trusted suppliers',
    },
    {
      icon: 'tag',
      title: 'Affordable Prices',
      description: 'Best prices on all medicines',
    },
    {
      icon: 'globe',
      title: 'Worldwide Shipping',
      description: 'Delivering to 100+ countries',
    },
    {
      icon: 'credit-card',
      title: 'Multiple Payment Options',
      description: 'Safe & secure payments',
    },
    {
      icon: 'refresh',
      title: 'Easy Returns',
      description: 'Hassle-free return policy',
    },
  ],

  categorySection: {
    title: 'Shop by Category',
    subtitle: 'Find the right healthcare and wellness products for you',
    categories: [
      {
        name: "Men's Health",
        icon: 'male',
        tone: 'sky',
        ctaLabel: 'View Products',
        href: '/category/mens-health',
      },
      {
        name: "Women's Health",
        icon: 'female',
        tone: 'rose',
        ctaLabel: 'View Products',
        href: '/category/womens-health',
      },
      {
        name: 'Pain Relief',
        icon: 'bandage',
        tone: 'cream',
        ctaLabel: 'View Products',
        href: '/category/pain-relief',
      },
      {
        name: 'Hair Care',
        icon: 'hair',
        tone: 'mint',
        ctaLabel: 'View Products',
        href: '/category/hair-care',
      },
      {
        name: 'Skin Care',
        icon: 'skin',
        tone: 'sky',
        ctaLabel: 'View Products',
        href: '/category/skin-care',
      },
      {
        name: 'Vitamins & Supplements',
        icon: 'pill',
        tone: 'mint',
        ctaLabel: 'View Products',
        href: '/category/vitamins-supplements',
      },
      {
        name: 'All Categories',
        icon: 'grid',
        tone: 'soft',
        ctaLabel: 'View Products',
        href: '/categories',
      },
    ],
  },

  popularProducts: {
    title: 'Popular Products Across Our Store',
    viewAllLabel: 'View All Products',
    viewAllHref: '/shop',
    tabs: [
      'All Products',
      'Best Sellers',
      'New Arrivals',
      "Men's Health",
      'Pain Relief',
      'Skin Care',
      'Wellness',
    ],
    products: popularProducts,
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
    author: {
      name: 'Michael R.',
      role: 'Verified Buyer',
      avatar: `${IMG}/avatar-michael.svg`,
    },
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
      title: "Best Sellers in Men's Health",
      viewAllLabel: 'View All',
      viewAllHref: '/category/mens-health',
      products: mensHealthProducts,
    },
    {
      title: 'Wellness, Hair & Skin Essentials',
      viewAllLabel: 'View All',
      viewAllHref: '/category/vitamins-supplements',
      products: wellnessProducts,
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
        quote:
          'Great prices and fast delivery. The packaging is always discreet and professional.',
        name: 'Daniel L.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-daniel.svg`,
      },
      {
        quote:
          'Excellent customer service and a wide range of products. Highly trusted store.',
        name: 'Sarah K.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-sarah.svg`,
      },
      {
        quote:
          'Ordering was simple, the medicine arrived quickly and exactly as described.',
        name: 'James T.',
        role: 'Verified Buyer',
        avatar: `${IMG}/avatar-james.svg`,
      },
      {
        quote:
          'Everything arrived on time and in perfect condition. Very happy with the service.',
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
          { label: "Men's Health", href: '/category/mens-health' },
          { label: "Women's Health", href: '/category/womens-health' },
          { label: 'Pain Relief', href: '/category/pain-relief' },
          { label: 'Hair Care', href: '/category/hair-care' },
          { label: 'Skin Care', href: '/category/skin-care' },
          { label: 'Vitamins & Supplements', href: '/category/vitamins-supplements' },
          { label: 'All Categories', href: '/categories' },
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

export default homepageContent;
