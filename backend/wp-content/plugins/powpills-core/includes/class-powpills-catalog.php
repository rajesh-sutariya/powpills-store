<?php
/**
 * Catalogue data source.
 *
 * The live powpills.com store runs WooCommerce, so this resolves the catalogue
 * from the best source available, in order:
 *
 *   1. WooCommerce  — real products and product_cat terms, when Woo is active.
 *                     This is what makes the frontend work against the real store.
 *   2. Custom CPTs  — the seeded powpills_product / powpills_category posts,
 *                     editable in wp-admin when Woo is not installed.
 *   3. catalog.json — the file shipped with the plugin, so the REST API always
 *                     returns something even on a bare install.
 *
 * All three paths return the identical shape, matching the CatalogProduct and
 * CatalogCategory TypeScript types on the frontend.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Catalog {

	/**
	 * Memoised catalog.json contents.
	 *
	 * @var array|null
	 */
	private static $json = null;

	/**
	 * Is WooCommerce available to read from?
	 *
	 * @return bool
	 */
	public static function has_woocommerce() {
		return class_exists( 'WooCommerce' ) && function_exists( 'wc_get_products' );
	}

	/**
	 * Reads the bundled catalogue file.
	 *
	 * @return array
	 */
	public static function json() {
		if ( null !== self::$json ) {
			return self::$json;
		}

		$path = POWPILLS_PLUGIN_DIR . 'data/catalog.json';

		if ( ! file_exists( $path ) ) {
			self::$json = array(
				'categories' => array(),
				'products'   => array(),
			);

			return self::$json;
		}

		$decoded = json_decode( (string) file_get_contents( $path ), true );

		self::$json = is_array( $decoded )
			? $decoded
			: array(
				'categories' => array(),
				'products'   => array(),
			);

		return self::$json;
	}

	/**
	 * Presentation hints (icon, tone) keyed by category slug. WooCommerce has no
	 * concept of these, so they always come from the JSON.
	 *
	 * @return array
	 */
	private static function category_style() {
		$style = array();

		foreach ( self::json()['categories'] as $category ) {
			$style[ $category['slug'] ] = array(
				'icon' => isset( $category['icon'] ) ? $category['icon'] : 'grid',
				'tone' => isset( $category['tone'] ) ? $category['tone'] : 'soft',
			);
		}

		return $style;
	}

	/**
	 * Categories, in menu order.
	 *
	 * @return array
	 */
	public static function categories() {
		if ( self::has_woocommerce() ) {
			$woo = self::categories_from_woocommerce();

			if ( $woo ) {
				return $woo;
			}
		}

		$cpt = self::categories_from_cpt();

		return $cpt ? $cpt : self::json()['categories'];
	}

	/**
	 * @return array
	 */
	private static function categories_from_woocommerce() {
		$terms = get_terms(
			array(
				'taxonomy'   => 'product_cat',
				'hide_empty' => false,
				'orderby'    => 'menu_order',
			)
		);

		if ( is_wp_error( $terms ) || empty( $terms ) ) {
			return array();
		}

		$style      = self::category_style();
		$categories = array();

		foreach ( $terms as $term ) {
			if ( 'uncategorized' === $term->slug ) {
				continue;
			}

			$categories[] = array(
				'slug'         => $term->slug,
				'name'         => $term->name,
				'icon'         => isset( $style[ $term->slug ]['icon'] ) ? $style[ $term->slug ]['icon'] : 'grid',
				'tone'         => isset( $style[ $term->slug ]['tone'] ) ? $style[ $term->slug ]['tone'] : 'soft',
				'description'  => wp_strip_all_tags( (string) $term->description ),
				'href'         => '/product-category/' . $term->slug,
				'productCount' => (int) $term->count,
			);
		}

		return $categories;
	}

	/**
	 * @return array
	 */
	private static function categories_from_cpt() {
		$posts = get_posts(
			array(
				'post_type'   => PowPills_Post_Types::CATEGORY,
				'post_status' => 'publish',
				'numberposts' => 100,
				'orderby'     => 'menu_order',
				'order'       => 'ASC',
			)
		);

		if ( empty( $posts ) ) {
			return array();
		}

		$categories = array();

		foreach ( $posts as $post ) {
			$slug         = $post->post_name;
			$categories[] = array(
				'slug'         => $slug,
				'name'         => $post->post_title,
				'icon'         => PowPills_Post_Types::meta( $post->ID, 'icon', 'grid' ),
				'tone'         => PowPills_Post_Types::meta( $post->ID, 'tone', 'soft' ),
				'description'  => PowPills_Post_Types::meta( $post->ID, 'description', '' ),
				'href'         => '/product-category/' . $slug,
				'productCount' => count( self::products( $slug ) ),
			);
		}

		return $categories;
	}

	/**
	 * Products, optionally filtered to one category slug.
	 *
	 * @param string $category_slug Category slug, or '' for everything.
	 * @return array
	 */
	public static function products( $category_slug = '' ) {
		if ( self::has_woocommerce() ) {
			$woo = self::products_from_woocommerce( $category_slug );

			if ( $woo ) {
				return $woo;
			}
		}

		$cpt = self::products_from_cpt( $category_slug );

		if ( $cpt ) {
			return $cpt;
		}

		$products = self::json()['products'];

		if ( ! $category_slug ) {
			return $products;
		}

		return array_values(
			array_filter(
				$products,
				function ( $product ) use ( $category_slug ) {
					return in_array( $category_slug, (array) $product['categories'], true );
				}
			)
		);
	}

	/**
	 * One product by slug.
	 *
	 * @param string $slug Product slug.
	 * @return array|null
	 */
	public static function product( $slug ) {
		foreach ( self::products() as $product ) {
			if ( $product['slug'] === $slug ) {
				return $product;
			}
		}

		return null;
	}

	/**
	 * Maps WooCommerce products onto the shared shape.
	 *
	 * Variable products contribute their variations as the pack ladder and their
	 * min/max price as the displayed range, which is exactly how the live store
	 * presents pack sizes.
	 *
	 * @param string $category_slug Category slug filter.
	 * @return array
	 */
	private static function products_from_woocommerce( $category_slug = '' ) {
		$args = array(
			'status' => 'publish',
			'limit'  => 200,
			'return' => 'objects',
		);

		if ( $category_slug ) {
			$args['category'] = array( $category_slug );
		}

		$found = wc_get_products( $args );

		if ( empty( $found ) ) {
			return array();
		}

		$products = array();

		foreach ( $found as $wc_product ) {
			$slugs = wp_get_post_terms( $wc_product->get_id(), 'product_cat', array( 'fields' => 'slugs' ) );
			$slugs = is_wp_error( $slugs ) ? array() : $slugs;

			$products[] = array(
				'slug'            => $wc_product->get_slug(),
				'name'            => $wc_product->get_name(),
				'subtitle'        => self::woo_attribute( $wc_product, 'active-ingredient' ),
				'form'            => self::woo_attribute( $wc_product, 'form' ),
				'categories'      => array_values( $slugs ),
				'primaryCategory' => isset( $slugs[0] ) ? $slugs[0] : '',
				'priceMin'        => (float) wc_get_price_to_display( $wc_product, array( 'price' => $wc_product->get_price() ) ),
				'priceMax'        => (float) self::woo_max_price( $wc_product ),
				'priceLabel'      => wp_strip_all_tags( $wc_product->get_price_html() ),
				'packs'           => self::woo_packs( $wc_product ),
				'rating'          => (float) $wc_product->get_average_rating(),
				'reviewCount'     => (int) $wc_product->get_review_count(),
				'badge'           => $wc_product->is_on_sale() ? 'sale' : '',
				'description'     => wp_strip_all_tags( $wc_product->get_description() ),
				'specs'           => self::woo_specs( $wc_product ),
				'href'            => '/product/' . $wc_product->get_slug(),
				'image'           => array(
					'src' => wp_get_attachment_image_url( $wc_product->get_image_id(), 'large' ) ?: '',
					'alt' => $wc_product->get_name(),
				),
			);
		}

		return $products;
	}

	/**
	 * @param WC_Product $product Product.
	 * @param string     $name    Attribute slug.
	 * @return string
	 */
	private static function woo_attribute( $product, $name ) {
		$value = $product->get_attribute( $name );

		return $value ? wp_strip_all_tags( $value ) : '';
	}

	/**
	 * @param WC_Product $product Product.
	 * @return float
	 */
	private static function woo_max_price( $product ) {
		if ( $product->is_type( 'variable' ) ) {
			return (float) $product->get_variation_price( 'max', true );
		}

		return (float) $product->get_price();
	}

	/**
	 * Variations become the pack ladder.
	 *
	 * @param WC_Product $product Product.
	 * @return array
	 */
	private static function woo_packs( $product ) {
		if ( ! $product->is_type( 'variable' ) ) {
			$price = (float) $product->get_price();

			return array(
				array(
					'label'      => $product->get_name(),
					'units'      => 1,
					'price'      => $price,
					'priceLabel' => wp_strip_all_tags( wc_price( $price ) ),
					'unitLabel'  => wp_strip_all_tags( wc_price( $price ) ) . ' / unit',
				),
			);
		}

		$packs = array();

		foreach ( $product->get_available_variations() as $variation ) {
			$label = implode( ', ', array_filter( array_values( (array) $variation['attributes'] ) ) );
			$price = (float) $variation['display_price'];
			$units = max( 1, (int) filter_var( $label, FILTER_SANITIZE_NUMBER_INT ) );

			$packs[] = array(
				'label'      => $label ? $label : $product->get_name(),
				'units'      => $units,
				'price'      => $price,
				'priceLabel' => wp_strip_all_tags( wc_price( $price ) ),
				'unitLabel'  => wp_strip_all_tags( wc_price( $price / $units ) ) . ' / unit',
			);
		}

		return $packs;
	}

	/**
	 * Product attributes become the spec sheet.
	 *
	 * @param WC_Product $product Product.
	 * @return array
	 */
	private static function woo_specs( $product ) {
		$specs = array();

		foreach ( $product->get_attributes() as $attribute ) {
			$label = wc_attribute_label( $attribute->get_name(), $product );
			$value = $product->get_attribute( $attribute->get_name() );

			if ( $label && $value ) {
				$specs[ $label ] = wp_strip_all_tags( $value );
			}
		}

		if ( $product->get_sku() ) {
			$specs['SKU'] = $product->get_sku();
		}

		return $specs;
	}

	/**
	 * Products stored as the plugin's own CPT.
	 *
	 * @param string $category_slug Category slug filter.
	 * @return array
	 */
	private static function products_from_cpt( $category_slug = '' ) {
		$posts = get_posts(
			array(
				'post_type'   => PowPills_Post_Types::PRODUCT,
				'post_status' => 'publish',
				'numberposts' => 300,
				'orderby'     => 'menu_order',
				'order'       => 'ASC',
			)
		);

		if ( empty( $posts ) ) {
			return array();
		}

		$products = array();

		foreach ( $posts as $post ) {
			$categories = (array) PowPills_Post_Types::meta( $post->ID, 'categories', array() );

			if ( $category_slug && ! in_array( $category_slug, $categories, true ) ) {
				continue;
			}

			$packs = PowPills_Post_Types::meta( $post->ID, 'packs', '' );
			$specs = PowPills_Post_Types::meta( $post->ID, 'specs', '' );

			$products[] = array(
				'slug'            => $post->post_name,
				'name'            => $post->post_title,
				'subtitle'        => PowPills_Post_Types::meta( $post->ID, 'subtitle', '' ),
				'form'            => PowPills_Post_Types::meta( $post->ID, 'form', '' ),
				'categories'      => array_values( $categories ),
				'primaryCategory' => isset( $categories[0] ) ? $categories[0] : '',
				'priceMin'        => (float) PowPills_Post_Types::meta( $post->ID, 'price_min', 0 ),
				'priceMax'        => (float) PowPills_Post_Types::meta( $post->ID, 'price_max', 0 ),
				'priceLabel'      => PowPills_Post_Types::meta( $post->ID, 'price_label', '' ),
				'packs'           => is_string( $packs ) ? (array) json_decode( $packs, true ) : (array) $packs,
				'rating'          => (float) PowPills_Post_Types::meta( $post->ID, 'rating', 0 ),
				'reviewCount'     => (int) PowPills_Post_Types::meta( $post->ID, 'review_count', 0 ),
				'badge'           => PowPills_Post_Types::meta( $post->ID, 'badge', '' ),
				'description'     => PowPills_Post_Types::meta( $post->ID, 'description', '' ),
				'specs'           => is_string( $specs ) ? (array) json_decode( $specs, true ) : (array) $specs,
				'href'            => '/product/' . $post->post_name,
				'image'           => array(
					'src' => self::image_src( $post ),
					'alt' => PowPills_Post_Types::meta( $post->ID, 'image_alt', $post->post_title ),
				),
			);
		}

		return $products;
	}

	/**
	 * Prefers a real featured image, falling back to the placeholder path.
	 *
	 * @param WP_Post $post Post.
	 * @return string
	 */
	private static function image_src( $post ) {
		$thumbnail = get_the_post_thumbnail_url( $post->ID, 'full' );

		return $thumbnail ? $thumbnail : PowPills_Post_Types::meta( $post->ID, 'image_src', '' );
	}
}
