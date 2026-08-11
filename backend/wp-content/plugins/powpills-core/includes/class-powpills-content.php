<?php
/**
 * Homepage copy for the PowPills storefront.
 *
 * Mirrors frontend/lib/content.ts one-to-one; tools/check-copy-parity.py fails
 * the build if the two drift apart.
 *
 * Products and categories are NOT defined here — they come from the shared
 * catalogue (data/catalog.json) via PowPills_Catalog, so there is exactly one
 * source of truth for the shop.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Content {

	/**
	 * Placeholder image folder shipped with the Next.js frontend.
	 * Replace with absolute WordPress media URLs once real artwork is uploaded.
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
			'announcement'  => array(
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

			'header'        => array(
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

			'nav'           => array(
				'categoriesLabel' => 'Shop by Category',
				'links'           => array(
					array( 'label' => 'Best Sellers', 'href' => '/shop' ),
					array( 'label' => 'Erectile Dysfunction', 'href' => '/product-category/erectile-dysfunction' ),
					array( 'label' => 'Premature Ejaculation', 'href' => '/product-category/premature-ejaculation' ),
					array( 'label' => 'Hair Loss', 'href' => '/product-category/hair-loss' ),
					array( 'label' => 'Skin Care', 'href' => '/product-category/skin-care' ),
					array( 'label' => "Women's Health", 'href' => '/product-category/womens-health' ),
					array( 'label' => 'Pain Relief', 'href' => '/product-category/pain' ),
					array( 'label' => 'All Categories', 'href' => '/all-categories' ),
				),
			),

			'hero'          => array(
				'title'        => 'Your Trusted Online Pharmacy & Healthcare Store',
				'description'  => 'Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices.',
				'features'     => array(
					array( 'icon' => 'package', 'label' => 'Discreet Packaging' ),
					array( 'icon' => 'lock', 'label' => 'Secure Checkout' ),
					array( 'icon' => 'truck', 'label' => 'Trackable Delivery' ),
					array( 'icon' => 'headset', 'label' => '24/7 Support' ),
				),
				'primaryCta'   => array( 'label' => 'Shop All Meds', 'href' => '/shop' ),
				'secondaryCta' => array( 'label' => 'Browse Categories', 'href' => '/all-categories' ),
				'image'        => array(
					'src' => $img . '/hero-products.svg',
					'alt' => 'PowPills medicines, supplements and healthcare products',
				),
			),

			'assurances'    => array(
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
				'categoryCta'        => 'View Products',
				'popularTitle'       => 'Popular Products Across Our Store',
				'popularViewAll'     => 'View All Products',
				'popularViewAllHref' => '/shop',
				'popularTabs'        => array(
					'All Products',
					'Erectile Dysfunction',
					'Premature Ejaculation',
					'Hair Loss',
					'Skin Care',
					'Pain Relief',
					'Diabetes',
				),
				'popularSlugs'       => array(
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
				),
				'testimonialsTitle'  => 'What Our Customers Say',
				'faqTitle'           => 'Frequently Asked Questions',
				'rows'               => array(
					array(
						'section'     => 'erectile-dysfunction',
						'title'       => 'Best Sellers in Erectile Dysfunction',
						'viewAll'     => 'View All',
						'viewAllHref' => '/product-category/erectile-dysfunction',
					),
					array(
						'section'     => 'skin-care',
						'title'       => 'Hair & Skin Care Essentials',
						'viewAll'     => 'View All',
						'viewAllHref' => '/product-category/skin-care',
					),
				),
			),

			'stats'         => array(
				'title' => 'Trusted by Thousands of Customers Worldwide',
				'items' => array(
					array( 'value' => '10,000+', 'label' => 'Happy Customers' ),
					array( 'value' => '500+', 'label' => 'Trusted Products' ),
					array( 'value' => '100+', 'label' => 'Countries Served' ),
					array( 'value' => '98%', 'label' => 'Satisfaction Rate' ),
				),
			),

			'reviewCard'    => array(
				'score'      => '4.8',
				'scoreLabel' => 'Excellent',
				'quote'      => 'Excellent service, genuine products and very fast discreet delivery. Highly recommended!',
				'author'     => array(
					'name'   => 'Michael R.',
					'role'   => 'Verified Buyer',
					'avatar' => $img . '/avatar-michael.svg',
				),
			),

			'howItWorks'    => array(
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

			'newsletter'    => array(
				'title'       => 'Stay Healthy, Stay Informed.',
				'description' => 'Subscribe to our newsletter for exclusive offers, health tips and updates.',
				'placeholder' => 'Enter your email address',
				'buttonLabel' => 'Subscribe',
			),

			'footer'        => array(
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
							array( 'label' => 'Erectile Dysfunction', 'href' => '/product-category/erectile-dysfunction' ),
							array( 'label' => 'Premature Ejaculation', 'href' => '/product-category/premature-ejaculation' ),
							array( 'label' => 'Hair Loss', 'href' => '/product-category/hair-loss' ),
							array( 'label' => 'Skin Care', 'href' => '/product-category/skin-care' ),
							array( 'label' => "Women's Health", 'href' => '/product-category/womens-health' ),
							array( 'label' => 'Pain Relief', 'href' => '/product-category/pain' ),
							array( 'label' => 'All Categories', 'href' => '/all-categories' ),
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
	 * FAQ entries (powpills_faq post type).
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
