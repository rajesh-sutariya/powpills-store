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

  product: {
    packSizeTitle: 'Pack Size',
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
