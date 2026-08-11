<?php
/**
 * Custom post types and meta registration.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Post_Types {

	const PRODUCT     = 'powpills_product';
	const CATEGORY    = 'powpills_category';
	const PROMO       = 'powpills_promo';
	const TESTIMONIAL = 'powpills_testimonial';
	const FAQ         = 'powpills_faq';

	/**
	 * Meta schema per post type: key => type.
	 *
	 * @var array<string, array<string, string>>
	 */
	public static function meta_schema() {
		return array(
			self::PRODUCT     => array(
				'subtitle'     => 'string',
				'category'     => 'string',
				'badge_label'  => 'string',
				'badge_tone'   => 'string',
				'tabs'         => 'array',
				'rating'       => 'number',
				'review_count' => 'integer',
				'price'        => 'string',
				'compare_at'   => 'string',
				'cta_label'    => 'string',
				'sections'     => 'array',
				'image_src'    => 'string',
				'image_alt'    => 'string',
			),
			self::CATEGORY    => array(
				'icon'      => 'string',
				'tone'      => 'string',
				'cta_label' => 'string',
				'href'      => 'string',
			),
			self::PROMO       => array(
				'description' => 'string',
				'tone'        => 'string',
				'cta_label'   => 'string',
				'href'        => 'string',
				'image_src'   => 'string',
				'image_alt'   => 'string',
			),
			self::TESTIMONIAL => array(
				'quote'  => 'string',
				'role'   => 'string',
				'avatar' => 'string',
			),
			self::FAQ         => array(
				'answer' => 'string',
			),
		);
	}

	/**
	 * Hook registration.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_post_types' ) );
		add_action( 'init', array( __CLASS__, 'register_meta' ), 11 );
	}

	/**
	 * Registers all storefront content types.
	 */
	public static function register_post_types() {
		$shared = array(
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-heart',
			'supports'     => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
			'has_archive'  => false,
			'rewrite'      => false,
		);

		register_post_type(
			self::PRODUCT,
			array_merge(
				$shared,
				array(
					'labels' => self::labels( 'Product', 'Products' ),
				)
			)
		);

		register_post_type(
			self::CATEGORY,
			array_merge(
				$shared,
				array(
					'labels'   => self::labels( 'Category Card', 'Category Cards' ),
					'supports' => array( 'title', 'page-attributes' ),
				)
			)
		);

		register_post_type(
			self::PROMO,
			array_merge(
				$shared,
				array(
					'labels'   => self::labels( 'Promo Card', 'Promo Cards' ),
					'supports' => array( 'title', 'page-attributes' ),
				)
			)
		);

		register_post_type(
			self::TESTIMONIAL,
			array_merge(
				$shared,
				array(
					'labels'   => self::labels( 'Testimonial', 'Testimonials' ),
					'supports' => array( 'title', 'page-attributes' ),
				)
			)
		);

		register_post_type(
			self::FAQ,
			array_merge(
				$shared,
				array(
					'labels'   => self::labels( 'FAQ', 'FAQs' ),
					'supports' => array( 'title', 'page-attributes' ),
				)
			)
		);
	}

	/**
	 * Registers every meta field so it is readable and writable over the REST API.
	 */
	public static function register_meta() {
		foreach ( self::meta_schema() as $post_type => $fields ) {
			foreach ( $fields as $key => $type ) {
				$is_array = 'array' === $type;

				register_post_meta(
					$post_type,
					'_powpills_' . $key,
					array(
						'type'          => $is_array ? 'array' : $type,
						'single'        => true,
						'default'       => $is_array ? array() : ( 'string' === $type ? '' : 0 ),
						'show_in_rest'  => $is_array
							? array(
								'schema' => array(
									'type'  => 'array',
									'items' => array( 'type' => 'string' ),
								),
							)
							: true,
						'auth_callback' => function () {
							return current_user_can( 'edit_posts' );
						},
					)
				);
			}
		}
	}

	/**
	 * Builds a standard label array.
	 *
	 * @param string $singular Singular label.
	 * @param string $plural   Plural label.
	 * @return array
	 */
	private static function labels( $singular, $plural ) {
		return array(
			'name'          => 'PowPills ' . $plural,
			'singular_name' => $singular,
			'menu_name'     => 'PowPills ' . $plural,
			'add_new_item'  => 'Add New ' . $singular,
			'edit_item'     => 'Edit ' . $singular,
			'all_items'     => 'All ' . $plural,
		);
	}

	/**
	 * Reads a prefixed meta value.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $key     Unprefixed meta key.
	 * @param mixed  $default Fallback.
	 * @return mixed
	 */
	public static function meta( $post_id, $key, $default = '' ) {
		$value = get_post_meta( $post_id, '_powpills_' . $key, true );

		if ( '' === $value || null === $value || array() === $value ) {
			return $default;
		}

		return $value;
	}
}
