/**
 * Interface labels for the catalogue pages.
 *
 * Kept separate from lib/content.ts on purpose: content.ts holds the homepage
 * copy that must match the approved design word for word, while these are
 * labels for the shop, category and product pages, which the homepage design
 * never showed.
 */
export const labels = {
  breadcrumbHome: 'Home',

  shop: {
    title: 'All Products',
    description:
      'Every medicine and healthcare product in the PowPills catalogue, across all categories.',
    href: '/shop',
  },

  allCategories: {
    title: 'All Categories',
    description: 'Browse the full range of treatment categories in our catalogue.',
    href: '/all-categories',
  },

  toolbar: {
    resultsOne: 'product',
    resultsMany: 'products',
    showing: 'Showing',
    sortLabel: 'Sort by',
    sortOptions: [
      { value: 'popular', label: 'Popularity' },
      { value: 'rating', label: 'Average rating' },
      { value: 'price-asc', label: 'Price: low to high' },
      { value: 'price-desc', label: 'Price: high to low' },
      { value: 'name', label: 'Name: A to Z' },
    ],
  },

  filters: {
    title: 'Filters',
    clearAll: 'Clear all',
    priceTitle: 'Price',
    priceUpTo: 'Up to',
    remove: 'Remove filter',
    loadMore: 'Load more products',
    of: 'of',
    showResults: 'Show {count} products',
  },

  sidebar: {
    categoriesTitle: 'Categories',
    allProducts: 'All Products',
  },

  card: {
    /** Card action, carried over from the approved homepage design. */
    viewOptions: 'View Options',
    badges: {
      sale: 'Sale',
      hot: 'Hot',
      new: 'New',
      save: 'Save',
    } as Record<string, string>,
  },

  category: {
    guideDisclaimer: 'General information only, not medical advice.',
    relatedTitle: 'Related Categories',
    faqTitle: 'Frequently Asked Questions',
  },

  product: {
    packSizeTitle: 'Pack Size',
    strengthLabel: 'Strength',
    packsLabel: 'Pack sizes',
    galleryLabel: 'Product images',
    deliveryTitle: 'Delivery & Returns',
    deliveryTime: 'Delivered in 6 to 15 days, with tracking',
    deliveryDiscreet: 'Plain, discreet packaging on every order',
    deliveryReturns: 'Hassle-free returns if something is wrong',
    paymentTitle: 'Secure payment',
    prescriptionNotice:
      'Prescription medicine. Our team will confirm the prescription required for your order before it ships.',
    usageTitle: 'Safety & Usage Information',
    alternativesTitle: 'Same Active Ingredient',
    faqTitle: 'Product FAQs',
    reviewsTitle: 'Customer Ratings',
    stars: 'stars',
    outOf5: 'out of 5',
    stickyCta: 'Add to Cart',
    packHeaderPack: 'Pack',
    packHeaderPrice: 'Price',
    packHeaderUnit: 'Unit Price',
    quantityLabel: 'Quantity',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    inStock: 'In Stock',
    priceRangeLabel: 'Price range',
    selectedTotal: 'Total',
    specsTitle: 'Product Details',
    descriptionTab: 'Description',
    specsTab: 'Additional Information',
    reviewsTab: 'Reviews',
    relatedTitle: 'Related Products',
    reviewsEmpty: 'There are no reviews for this product yet.',
    reviewsSummary: 'based on',
    reviewsSuffix: 'customer ratings',
    categoryLabel: 'Category',
    skuLabel: 'SKU',
  },

  emptyState: 'No products found in this category.',
} as const;

export default labels;
