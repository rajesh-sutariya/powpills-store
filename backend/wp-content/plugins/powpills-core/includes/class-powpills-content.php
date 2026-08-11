<?php
/**
 * Canonical default content for the PowPills storefront.
 *
 * This is the single source of truth on the WordPress side and mirrors
 * frontend/lib/content.ts one-to-one. The seeder writes these values into
 * posts, post meta and options; the REST controller reads them back out.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Content {

	/**
	 * Relative path prefix for the dummy placeholder images that ship with the
	 * Next.js frontend (frontend/public/images). Replace these with absolute
	 * WordPress media URLs once real photography is uploaded.
	 */
	const IMG = '/images';

	/**
	 * Global site copy stored in the `powpills_settings` option.
	 *
	 * @return array
	 */
	public static function settings() {
		$img = self::IMG;

		return array(
			'announcement' => array(
				'items'  => array(
					array( 'icon' => 'shield-check', 'label' => 'Genuine Packaging' ),
					array( 'icon' => 'lock', 'label' => 'Secure Checkout' ),
					array( 'icon' => 'truck', 'label' => 'Trackable Delivery' ),
					array( 'icon' => 'headset', 'label' => '24/7 Customer Support' ),
				),
				'shipTo' => array(
					'label' => 'Delivering to:',
					'value' => 'United States',
				),
			),

			'header'       => array(
				'brand'   => array(
					'name'    => 'PowPills',
					'tagline' => 'Trusted · Affordable · Delivered',
				),
				'search'  => array(
					'placeholder' => 'Search product, ingredient, brand or condition...',
					'buttonLabel' => 'Search',
				),
				'account' => array(
					'title'    => 'My Account',
					'subtitle' => 'Login',
					'href'     => '/account',
				),
				'cart'    => array(
					'title'      => 'Cart',
					'itemsLabel' => '0 items',
					'total'      => '$0.00',
					'href'       => '/cart',
				),
			),

			'nav'          => array(
				'categoriesLabel' => 'Shop by Category',
				'links'           => array(
					array( 'label' => 'Best Sellers', 'href' => '/best-sellers' ),
					array( 'label' => "Men's Health", 'href' => '/category/mens-health' ),
					array( 'label' => "Women's Health", 'href' => '/category/womens-health' ),
					array( 'label' => 'Pain Relief', 'href' => '/category/pain-relief' ),
					array( 'label' => 'Hair Care', 'href' => '/category/hair-care' ),
					array( 'label' => 'Skin Care', 'href' => '/category/skin-care' ),
					array( 'label' => 'Vitamins & Supplements', 'href' => '/category/vitamins-supplements' ),
					array( 'label' => 'All Categories', 'href' => '/categories' ),
				),
			),

			'hero'         => array(
				'title'        => 'Your Trusted Online Pharmacy & Healthcare Store',
				'description'  => 'Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices.',
				'features'     => array(
					array( 'icon' => 'package', 'label' => 'Discreet Packaging' ),
					array( 'icon' => 'lock', 'label' => 'Secure Checkout' ),
					array( 'icon' => 'truck', 'label' => 'Trackable Delivery' ),
					array( 'icon' => 'headset', 'label' => '24/7 Support' ),
				),
				'primaryCta'   => array( 'label' => 'Shop All Meds', 'href' => '/shop' ),
				'secondaryCta' => array( 'label' => 'Browse Categories', 'href' => '/categories' ),
				'image'        => array(
					'src' => $img . '/hero-products.svg',
					'alt' => 'PowPills medicines, supplements and healthcare products',
				),
			),

			'assurances'   => array(
				array(
					'icon'        => 'shield-check',
					'title'       => 'Quality Assured',
					'description' => 'Sourced from trusted suppliers',
				),
				array(
					'icon'        => 'tag',
					'title'       => 'Affordable Prices',
					'description' => 'Best prices on all medicines',
				),
				array(
					'icon'        => 'globe',
					'title'       => 'Worldwide Shipping',
					'description' => 'Delivering to 100+ countries',
				),
				array(
					'icon'        => 'credit-card',
					'title'       => 'Multiple Payment Options',
					'description' => 'Safe & secure payments',
				),
				array(
					'icon'        => 'refresh',
					'title'       => 'Easy Returns',
					'description' => 'Hassle-free return policy',
				),
			),

			'sectionTitles' => array(
				'categoryTitle'      => 'Shop by Category',
				'categorySubtitle'   => 'Find the right healthcare and wellness products for you',
				'popularTitle'       => 'Popular Products Across Our Store',
				'popularViewAll'     => 'View All Products',
				'popularViewAllHref' => '/shop',
				'popularTabs'        => array(
					'All Products',
					'Best Sellers',
					'New Arrivals',
					"Men's Health",
					'Pain Relief',
					'Skin Care',
					'Wellness',
				),
				'testimonialsTitle'  => 'What Our Customers Say',
				'faqTitle'           => 'Frequently Asked Questions',
				'rows'               => array(
					array(
						'section'     => 'mens_health',
						'title'       => "Best Sellers in Men's Health",
						'viewAll'     => 'View All',
						'viewAllHref' => '/category/mens-health',
					),
					array(
						'section'     => 'wellness',
						'title'       => 'Wellness, Hair & Skin Essentials',
						'viewAll'     => 'View All',
						'viewAllHref' => '/category/vitamins-supplements',
					),
				),
			),

			'stats'        => array(
				'title' => 'Trusted by Thousands of Customers Worldwide',
				'items' => array(
					array( 'value' => '10,000+', 'label' => 'Happy Customers' ),
					array( 'value' => '500+', 'label' => 'Trusted Products' ),
					array( 'value' => '100+', 'label' => 'Countries Served' ),
					array( 'value' => '98%', 'label' => 'Satisfaction Rate' ),
				),
			),

			'reviewCard'   => array(
				'score'      => '4.8',
				'scoreLabel' => 'Excellent',
				'quote'      => 'Excellent service, genuine products and very fast discreet delivery. Highly recommended!',
				'author'     => array(
					'name'   => 'Michael R.',
					'role'   => 'Verified Buyer',
					'avatar' => $img . '/avatar-michael.svg',
				),
			),

			'howItWorks'   => array(
				'title'    => 'How It Works',
				'subtitle' => 'Getting your health essentials is simple and secure',
				'steps'    => array(
					array(
						'step'        => '1',
						'icon'        => 'search',
						'title'       => 'Browse & Select',
						'description' => 'Explore our range of trusted products',
					),
					array(
						'step'        => '2',
						'icon'        => 'lock',
						'title'       => 'Secure Checkout',
						'description' => 'Place your order with our safe and encrypted checkout',
					),
					array(
						'step'        => '3',
						'icon'        => 'truck',
						'title'       => 'Fast & Discreet Delivery',
						'description' => 'We pack discreetly and ship right to your doorstep',
					),
					array(
						'step'        => '4',
						'icon'        => 'heart',
						'title'       => 'Stay Healthy',
						'description' => 'Enjoy quality healthcare and live your best life',
					),
				),
			),

			'supportBanner' => array(
				'title'       => "Need Help? We're Here For You",
				'description' => 'Our support team is available 24/7 to assist you with orders, products or any questions.',
				'channels'    => array(
					array( 'icon' => 'chat', 'title' => 'Live Chat', 'detail' => 'Chat with us online' ),
					array( 'icon' => 'mail', 'title' => 'Email Support', 'detail' => 'support@powpills.com' ),
					array( 'icon' => 'phone', 'title' => 'Call Us', 'detail' => '+1 (888) 123-4567' ),
				),
				'image'       => array(
					'src' => $img . '/support-agent.svg',
					'alt' => 'PowPills customer support agent',
				),
			),

			'newsletter'   => array(
				'title'       => 'Stay Healthy, Stay Informed.',
				'description' => 'Subscribe to our newsletter for exclusive offers, health tips and updates.',
				'placeholder' => 'Enter your email address',
				'buttonLabel' => 'Subscribe',
			),

			'footer'       => array(
				'brand'       => array(
					'name'        => 'PowPills',
					'tagline'     => 'Trusted. Affordable. Delivered.',
					'description' => 'Your trusted online pharmacy for medicines, health products and wellness essentials.',
				),
				'socials'     => array(
					array( 'label' => 'Facebook', 'href' => '#' ),
					array( 'label' => 'Twitter', 'href' => '#' ),
					array( 'label' => 'Instagram', 'href' => '#' ),
					array( 'label' => 'YouTube', 'href' => '#' ),
					array( 'label' => 'LinkedIn', 'href' => '#' ),
				),
				'columns'     => array(
					array(
						'title' => 'Customer Service',
						'links' => array(
							array( 'label' => 'Contact Us', 'href' => '/contact' ),
							array( 'label' => 'FAQ', 'href' => '/faq' ),
							array( 'label' => 'Shipping & Delivery', 'href' => '/shipping-delivery' ),
							array( 'label' => 'Returns & Refunds', 'href' => '/returns-refunds' ),
							array( 'label' => 'Order Tracking', 'href' => '/order-tracking' ),
						),
					),
					array(
						'title' => 'My Account',
						'links' => array(
							array( 'label' => 'Login', 'href' => '/account/login' ),
							array( 'label' => 'Register', 'href' => '/account/register' ),
							array( 'label' => 'Address Book', 'href' => '/account/addresses' ),
							array( 'label' => 'Order History', 'href' => '/account/orders' ),
						),
					),
					array(
						'title' => 'Categories',
						'links' => array(
							array( 'label' => "Men's Health", 'href' => '/category/mens-health' ),
							array( 'label' => "Women's Health", 'href' => '/category/womens-health' ),
							array( 'label' => 'Pain Relief', 'href' => '/category/pain-relief' ),
							array( 'label' => 'Hair Care', 'href' => '/category/hair-care' ),
							array( 'label' => 'Skin Care', 'href' => '/category/skin-care' ),
							array( 'label' => 'Vitamins & Supplements', 'href' => '/category/vitamins-supplements' ),
							array( 'label' => 'All Categories', 'href' => '/categories' ),
						),
					),
					array(
						'title' => 'Information',
						'links' => array(
							array( 'label' => 'About Us', 'href' => '/about' ),
							array( 'label' => 'Privacy Policy', 'href' => '/privacy-policy' ),
							array( 'label' => 'Terms & Conditions', 'href' => '/terms-conditions' ),
							array( 'label' => 'Blog', 'href' => '/blog' ),
							array( 'label' => 'Sitemap', 'href' => '/sitemap' ),
						),
					),
				),
				'contact'     => array(
					'title' => 'Contact Us',
					'items' => array(
						array( 'icon' => 'mail', 'label' => 'support@powpills.com' ),
						array( 'icon' => 'phone', 'label' => '+1 (888) 123-4567' ),
						array( 'icon' => 'headset', 'label' => '24/7 Customer Support' ),
						array( 'icon' => 'map-pin', 'label' => '123 Wellness Ave, New York, NY 10001, USA' ),
					),
				),
				'payments'    => array(
					'label'   => 'We Accept',
					'methods' => array( 'Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay' ),
				),
				'secureLabel' => '100% Secure Checkout',
				'copyright'   => '© 2024 PowPills. All rights reserved.',
			),
		);
	}

	/**
	 * Shop-by-category cards (powpills_category post type).
	 *
	 * @return array
	 */
	public static function categories() {
		return array(
			array(
				'slug'     => 'mens-health',
				'name'     => "Men's Health",
				'icon'     => 'male',
				'tone'     => 'sky',
				'ctaLabel' => 'View Products',
				'href'     => '/category/mens-health',
			),
			array(
				'slug'     => 'womens-health',
				'name'     => "Women's Health",
				'icon'     => 'female',
				'tone'     => 'rose',
				'ctaLabel' => 'View Products',
				'href'     => '/category/womens-health',
			),
			array(
				'slug'     => 'pain-relief',
				'name'     => 'Pain Relief',
				'icon'     => 'bandage',
				'tone'     => 'cream',
				'ctaLabel' => 'View Products',
				'href'     => '/category/pain-relief',
			),
			array(
				'slug'     => 'hair-care',
				'name'     => 'Hair Care',
				'icon'     => 'hair',
				'tone'     => 'mint',
				'ctaLabel' => 'View Products',
				'href'     => '/category/hair-care',
			),
			array(
				'slug'     => 'skin-care',
				'name'     => 'Skin Care',
				'icon'     => 'skin',
				'tone'     => 'sky',
				'ctaLabel' => 'View Products',
				'href'     => '/category/skin-care',
			),
			array(
				'slug'     => 'vitamins-supplements',
				'name'     => 'Vitamins & Supplements',
				'icon'     => 'pill',
				'tone'     => 'mint',
				'ctaLabel' => 'View Products',
				'href'     => '/category/vitamins-supplements',
			),
			array(
				'slug'     => 'all-categories',
				'name'     => 'All Categories',
				'icon'     => 'grid',
				'tone'     => 'soft',
				'ctaLabel' => 'View Products',
				'href'     => '/categories',
			),
		);
	}

	/**
	 * Catalogue (powpills_product post type).
	 *
	 * `sections` decides which homepage rail a product appears in:
	 * popular | mens_health | wellness.
	 *
	 * @return array
	 */
	public static function products() {
		$img = self::IMG;

		return array(
			array(
				'slug'         => 'tadapox-10mg',
				'name'         => 'Tadapox 10 mg',
				'subtitle'     => 'Tadalafil Tablets',
				'category'     => "Men's Health",
				'badgeLabel'   => 'Sale',
				'badgeTone'    => 'sale',
				'tabs'         => array( 'Best Sellers', "Men's Health" ),
				'rating'       => 4.8,
				'reviewCount'  => 126,
				'price'        => '$32.00 – $148.00',
				'compareAt'    => '$40.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-tadapox.svg', 'alt' => 'Tadapox 10 mg tablets pack' ),
			),
			array(
				'slug'         => 'minoxidil-5-solution',
				'name'         => 'Minoxidil 5% Solution',
				'subtitle'     => 'Hair Regrowth Treatment',
				'category'     => 'Hair Care',
				'badgeLabel'   => 'Sale',
				'badgeTone'    => 'sale',
				'tabs'         => array( 'Best Sellers', 'Wellness' ),
				'rating'       => 4.7,
				'reviewCount'  => 98,
				'price'        => '$24.00 – $96.00',
				'compareAt'    => '$30.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-minoxidil.svg', 'alt' => 'Minoxidil 5% solution bottle' ),
			),
			array(
				'slug'         => 'beto-400',
				'name'         => 'Beto 400',
				'subtitle'     => 'Paracetamol Tablets',
				'category'     => 'Pain Relief',
				'badgeLabel'   => 'Hot',
				'badgeTone'    => 'hot',
				'tabs'         => array( 'Best Sellers', 'Pain Relief' ),
				'rating'       => 4.6,
				'reviewCount'  => 204,
				'price'        => '$12.00 – $58.00',
				'compareAt'    => '$15.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-beto.svg', 'alt' => 'Beto 400 tablets pack' ),
			),
			array(
				'slug'         => 'biotin-tablets',
				'name'         => 'Biotin Tablets',
				'subtitle'     => 'Hair & Nail Support',
				'category'     => 'Wellness',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'New Arrivals', 'Wellness' ),
				'rating'       => 4.9,
				'reviewCount'  => 152,
				'price'        => '$16.00 – $72.00',
				'compareAt'    => '$20.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-biotin.svg', 'alt' => 'Biotin tablets bottle' ),
			),
			array(
				'slug'         => 'aceclofen-gel',
				'name'         => 'Aceclofen Gel',
				'subtitle'     => 'Topical Pain Relief',
				'category'     => 'Pain Relief',
				'badgeLabel'   => 'New',
				'badgeTone'    => 'new',
				'tabs'         => array( 'New Arrivals', 'Pain Relief' ),
				'rating'       => 4.5,
				'reviewCount'  => 76,
				'price'        => '$9.00 – $42.00',
				'compareAt'    => '$12.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-aceclofen.svg', 'alt' => 'Aceclofen gel tube' ),
			),
			array(
				'slug'         => 'vitamin-c-serum',
				'name'         => 'Vitamin C Serum',
				'subtitle'     => 'Brightening Face Serum',
				'category'     => 'Skin Care',
				'badgeLabel'   => 'New',
				'badgeTone'    => 'new',
				'tabs'         => array( 'New Arrivals', 'Skin Care' ),
				'rating'       => 4.7,
				'reviewCount'  => 88,
				'price'        => '$18.00 – $64.00',
				'compareAt'    => '',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-serum.svg', 'alt' => 'Vitamin C serum bottle' ),
			),
			array(
				'slug'         => 'salicylic-acid-face-wash',
				'name'         => 'Salicylic Acid Face Wash',
				'subtitle'     => 'Acne & Oil Control',
				'category'     => 'Skin Care',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Skin Care', 'Wellness' ),
				'rating'       => 4.6,
				'reviewCount'  => 64,
				'price'        => '$11.00 – $38.00',
				'compareAt'    => '',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-facewash.svg', 'alt' => 'Salicylic acid face wash bottle' ),
			),
			array(
				'slug'         => 'ibuprofen-400mg',
				'name'         => 'Ibuprofen 400 mg',
				'subtitle'     => 'Anti-Inflammatory Tablets',
				'category'     => 'Pain Relief',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Pain Relief', 'Best Sellers' ),
				'rating'       => 4.6,
				'reviewCount'  => 176,
				'price'        => '$8.00 – $34.00',
				'compareAt'    => '',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-ibuprofen.svg', 'alt' => 'Ibuprofen 400 mg tablets pack' ),
			),
			array(
				'slug'         => 'multivitamin-daily',
				'name'         => 'Daily Multivitamin',
				'subtitle'     => 'Complete Wellness Formula',
				'category'     => 'Vitamins & Supplements',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness', 'New Arrivals' ),
				'rating'       => 4.8,
				'reviewCount'  => 142,
				'price'        => '$14.00 – $56.00',
				'compareAt'    => '',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular' ),
				'image'        => array( 'src' => $img . '/product-multivitamin.svg', 'alt' => 'Daily multivitamin bottle' ),
			),
			array(
				'slug'         => 'sildenafil-100mg',
				'name'         => 'Sildenafil 100 mg',
				'subtitle'     => 'Erectile Dysfunction',
				'category'     => "Men's Health",
				'badgeLabel'   => 'Sale',
				'badgeTone'    => 'sale',
				'tabs'         => array( 'Best Sellers', "Men's Health" ),
				'rating'       => 4.9,
				'reviewCount'  => 318,
				'price'        => '$28.00 – $132.00',
				'compareAt'    => '$36.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'popular', 'mens_health' ),
				'image'        => array( 'src' => $img . '/product-sildenafil.svg', 'alt' => 'Sildenafil 100 mg tablets pack' ),
			),
			array(
				'slug'         => 'vardenafil-20mg',
				'name'         => 'Vardenafil 20 mg',
				'subtitle'     => 'Fast Acting Tablets',
				'category'     => "Men's Health",
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( "Men's Health" ),
				'rating'       => 4.7,
				'reviewCount'  => 164,
				'price'        => '$34.00 – $146.00',
				'compareAt'    => '$42.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'mens_health' ),
				'image'        => array( 'src' => $img . '/product-vardenafil.svg', 'alt' => 'Vardenafil 20 mg tablets pack' ),
			),
			array(
				'slug'         => 'finasteride-1mg',
				'name'         => 'Finasteride 1 mg',
				'subtitle'     => 'Hair Loss Treatment',
				'category'     => "Men's Health",
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( "Men's Health" ),
				'rating'       => 4.6,
				'reviewCount'  => 121,
				'price'        => '$19.00 – $88.00',
				'compareAt'    => '$24.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'mens_health' ),
				'image'        => array( 'src' => $img . '/product-finasteride.svg', 'alt' => 'Finasteride 1 mg tablets pack' ),
			),
			array(
				'slug'         => 'dapoxetine-60mg',
				'name'         => 'Dapoxetine 60 mg',
				'subtitle'     => 'Premature Ejaculation',
				'category'     => "Men's Health",
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( "Men's Health" ),
				'rating'       => 4.5,
				'reviewCount'  => 96,
				'price'        => '$26.00 – $118.00',
				'compareAt'    => '$32.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'mens_health' ),
				'image'        => array( 'src' => $img . '/product-dapoxetine.svg', 'alt' => 'Dapoxetine 60 mg tablets pack' ),
			),
			array(
				'slug'         => 'testosterone-booster',
				'name'         => 'Testosterone Booster',
				'subtitle'     => 'Stamina & Strength',
				'category'     => "Men's Health",
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( "Men's Health" ),
				'rating'       => 4.7,
				'reviewCount'  => 134,
				'price'        => '$21.00 – $94.00',
				'compareAt'    => '$26.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'mens_health' ),
				'image'        => array( 'src' => $img . '/product-testosterone.svg', 'alt' => 'Testosterone booster jar' ),
			),
			array(
				'slug'         => 'collagen-peptides',
				'name'         => 'Collagen Peptides',
				'subtitle'     => 'Skin, Hair & Nails',
				'category'     => 'Vitamins & Supplements',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness' ),
				'rating'       => 4.8,
				'reviewCount'  => 188,
				'price'        => '$22.00 – $92.00',
				'compareAt'    => '$28.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'wellness' ),
				'image'        => array( 'src' => $img . '/product-collagen.svg', 'alt' => 'Collagen peptides tub' ),
			),
			array(
				'slug'         => 'vitamin-d3-5000iu',
				'name'         => 'Vitamin D3 5000 IU',
				'subtitle'     => 'Bone & Immunity Support',
				'category'     => 'Vitamins & Supplements',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness' ),
				'rating'       => 4.9,
				'reviewCount'  => 246,
				'price'        => '$13.00 – $52.00',
				'compareAt'    => '$16.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'wellness' ),
				'image'        => array( 'src' => $img . '/product-vitamind3.svg', 'alt' => 'Vitamin D3 5000 IU softgels bottle' ),
			),
			array(
				'slug'         => 'omega-3-1000mg',
				'name'         => 'Omega-3 1000 mg',
				'subtitle'     => 'Heart Health',
				'category'     => 'Vitamins & Supplements',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness' ),
				'rating'       => 4.7,
				'reviewCount'  => 173,
				'price'        => '$17.00 – $68.00',
				'compareAt'    => '$21.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'wellness' ),
				'image'        => array( 'src' => $img . '/product-omega3.svg', 'alt' => 'Omega-3 1000 mg softgels bottle' ),
			),
			array(
				'slug'         => 'ketoconazole-shampoo',
				'name'         => 'Ketoconazole Shampoo',
				'subtitle'     => 'Anti-Dandruff Care',
				'category'     => 'Hair Care',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness' ),
				'rating'       => 4.6,
				'reviewCount'  => 112,
				'price'        => '$15.00 – $58.00',
				'compareAt'    => '$19.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'wellness' ),
				'image'        => array( 'src' => $img . '/product-shampoo.svg', 'alt' => 'Ketoconazole shampoo bottle' ),
			),
			array(
				'slug'         => 'niacinamide-serum',
				'name'         => 'Niacinamide Serum',
				'subtitle'     => 'Blemish & Pore Care',
				'category'     => 'Skin Care',
				'badgeLabel'   => '',
				'badgeTone'    => '',
				'tabs'         => array( 'Wellness', 'Skin Care' ),
				'rating'       => 4.8,
				'reviewCount'  => 129,
				'price'        => '$18.00 – $64.00',
				'compareAt'    => '$23.00',
				'ctaLabel'     => 'View Options',
				'sections'     => array( 'wellness' ),
				'image'        => array( 'src' => $img . '/product-niacinamide.svg', 'alt' => 'Niacinamide serum bottle' ),
			),
		);
	}

	/**
	 * Promo cards (powpills_promo post type).
	 *
	 * @return array
	 */
	public static function promos() {
		$img = self::IMG;

		return array(
			array(
				'slug'        => 'discreet-safe-delivery',
				'title'       => 'Discreet & Safe Delivery',
				'description' => 'Your privacy is our priority. All orders are shipped in plain, discreet packaging with no product information on the outside.',
				'tone'        => 'mint',
				'ctaLabel'    => 'Learn More',
				'href'        => '/shipping-delivery',
				'image'       => array( 'src' => $img . '/promo-delivery.svg', 'alt' => 'Discreet PowPills delivery package' ),
			),
			array(
				'slug'        => 'save-more-bigger-packs',
				'title'       => 'Save More with Bigger Pack Sizes',
				'description' => 'Choose from multiple pack sizes and save more when you buy your favourite products in bulk.',
				'tone'        => 'rose',
				'ctaLabel'    => '',
				'href'        => '',
				'image'       => array( 'src' => $img . '/promo-packs.svg', 'alt' => 'Multiple pack sizes of PowPills products' ),
			),
			array(
				'slug'        => 'need-help-choosing',
				'title'       => 'Need Help Choosing?',
				'description' => 'Our customer support team is here to help you find the right product.',
				'tone'        => 'cream',
				'ctaLabel'    => '',
				'href'        => '',
				'image'       => array( 'src' => $img . '/promo-support.svg', 'alt' => 'Customer support headset' ),
			),
		);
	}

	/**
	 * Testimonials (powpills_testimonial post type).
	 *
	 * @return array
	 */
	public static function testimonials() {
		$img = self::IMG;

		return array(
			array(
				'slug'   => 'daniel-l',
				'quote'  => 'Great prices and fast delivery. The packaging is always discreet and professional.',
				'name'   => 'Daniel L.',
				'role'   => 'Verified Buyer',
				'avatar' => $img . '/avatar-daniel.svg',
			),
			array(
				'slug'   => 'sarah-k',
				'quote'  => 'Excellent customer service and a wide range of products. Highly trusted store.',
				'name'   => 'Sarah K.',
				'role'   => 'Verified Buyer',
				'avatar' => $img . '/avatar-sarah.svg',
			),
			array(
				'slug'   => 'james-t',
				'quote'  => 'Ordering was simple, the medicine arrived quickly and exactly as described.',
				'name'   => 'James T.',
				'role'   => 'Verified Buyer',
				'avatar' => $img . '/avatar-james.svg',
			),
			array(
				'slug'   => 'priya-m',
				'quote'  => 'Everything arrived on time and in perfect condition. Very happy with the service.',
				'name'   => 'Priya M.',
				'role'   => 'Verified Buyer',
				'avatar' => $img . '/avatar-priya.svg',
			),
		);
	}

	/**
	 * FAQ entries (powpills_faq post type). Order matches the two-column layout:
	 * left column takes 1, 3, 5 and the right column takes 2, 4, 6.
	 *
	 * @return array
	 */
	public static function faqs() {
		return array(
			array(
				'slug'     => 'order-information-private',
				'question' => 'Is my order information kept private?',
				'answer'   => 'Yes. Your privacy is our priority. All orders are shipped in plain, discreet packaging with no product information on the outside, and your details are never shared with third parties.',
			),
			array(
				'slug'     => 'products-genuine',
				'question' => 'Are the products genuine?',
				'answer'   => 'Every product we sell is sourced from trusted suppliers and checked before it is dispatched, so you always receive genuine medicines and healthcare products.',
			),
			array(
				'slug'     => 'delivery-time',
				'question' => 'How long does delivery take?',
				'answer'   => 'Delivery times depend on your location. Orders are dispatched quickly and every parcel comes with tracking so you can follow it right to your doorstep.',
			),
			array(
				'slug'     => 'return-or-exchange',
				'question' => 'Can I return or exchange a product?',
				'answer'   => 'Yes. We offer a hassle-free return policy. Contact our support team with your order number and we will help you arrange a return or exchange.',
			),
			array(
				'slug'     => 'ship-internationally',
				'question' => 'Do you ship internationally?',
				'answer'   => 'We deliver to 100+ countries worldwide with trackable shipping and multiple secure payment options at checkout.',
			),
			array(
				'slug'     => 'contact-customer-support',
				'question' => 'How can I contact customer support?',
				'answer'   => 'Our support team is available 24/7 by live chat, by email at support@powpills.com or by phone at +1 (888) 123-4567.',
			),
		);
	}
}
