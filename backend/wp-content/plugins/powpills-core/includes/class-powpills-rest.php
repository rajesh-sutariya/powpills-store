<?php
/**
 * REST API: assembles the whole homepage into one JSON document that matches
 * the `HomepageContent` TypeScript contract used by the Next.js frontend.
 *
 * GET  /wp-json/powpills/v1/homepage
 * GET  /wp-json/powpills/v1/products?section=popular|mens_health|wellness
 * POST /wp-json/powpills/v1/newsletter   { "email": "..." }
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_REST {

	const NAMESPACE_V1        = 'powpills/v1';
	const SUBSCRIBERS_OPTION  = 'powpills_newsletter_subscribers';

	/**
	 * Hook registration.
	 */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'allow_frontend_origin' ), 15 );
	}

	/**
	 * Registers the storefront routes.
	 */
	public static function register_routes() {
		register_rest_route(
			self::NAMESPACE_V1,
			'/homepage',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_homepage' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			self::NAMESPACE_V1,
			'/products',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_products_route' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'section' => array(
						'type'     => 'string',
						'required' => false,
					),
				),
			)
		);

		register_rest_route(
			self::NAMESPACE_V1,
			'/newsletter',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( __CLASS__, 'subscribe' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'email' => array(
						'type'     => 'string',
						'required' => true,
					),
				),
			)
		);
	}

	/**
	 * Lets the Next.js origin read the API from the browser.
	 */
	public static function allow_frontend_origin() {
		$origin = defined( 'POWPILLS_FRONTEND_ORIGIN' ) ? POWPILLS_FRONTEND_ORIGIN : 'http://localhost:3000';

		add_filter(
			'rest_pre_serve_request',
			function ( $served ) use ( $origin ) {
				header( 'Access-Control-Allow-Origin: ' . $origin );
				header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
				header( 'Access-Control-Allow-Headers: Content-Type' );

				return $served;
			}
		);
	}

	/**
	 * Builds the full homepage payload.
	 *
	 * @return WP_REST_Response
	 */
	public static function get_homepage() {
		$settings = wp_parse_args(
			(array) get_option( PowPills_Seeder::SETTINGS_OPTION, array() ),
			PowPills_Content::settings()
		);

		$titles = $settings['sectionTitles'];

		$payload = array(
			'announcement'    => $settings['announcement'],
			'header'          => $settings['header'],
			'nav'             => $settings['nav'],
			'hero'            => $settings['hero'],
			'assurances'      => $settings['assurances'],
			'categorySection' => array(
				'title'      => $titles['categoryTitle'],
				'subtitle'   => $titles['categorySubtitle'],
				'categories' => self::get_categories(),
			),
			'popularProducts' => array(
				'title'        => $titles['popularTitle'],
				'viewAllLabel' => $titles['popularViewAll'],
				'viewAllHref'  => $titles['popularViewAllHref'],
				'tabs'         => $titles['popularTabs'],
				'products'     => self::get_products( 'popular' ),
			),
			'promos'          => self::get_promos(),
			'stats'           => $settings['stats'],
			'reviewCard'      => $settings['reviewCard'],
			'howItWorks'      => $settings['howItWorks'],
			'productRows'     => array_map(
				function ( $row ) {
					return array(
						'title'        => $row['title'],
						'viewAllLabel' => $row['viewAll'],
						'viewAllHref'  => $row['viewAllHref'],
						'products'     => self::get_products( $row['section'] ),
					);
				},
				$titles['rows']
			),
			'supportBanner'   => $settings['supportBanner'],
			'testimonials'    => array(
				'title' => $titles['testimonialsTitle'],
				'items' => self::get_testimonials(),
			),
			'faq'             => array(
				'title' => $titles['faqTitle'],
				'items' => self::get_faqs(),
			),
			'newsletter'      => $settings['newsletter'],
			'footer'          => $settings['footer'],
		);

		return rest_ensure_response( $payload );
	}

	/**
	 * REST handler for the products route.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public static function get_products_route( $request ) {
		$section = $request->get_param( 'section' );

		return rest_ensure_response( self::get_products( $section ? $section : '' ) );
	}

	/**
	 * Category cards.
	 *
	 * @return array
	 */
	private static function get_categories() {
		$posts = self::query( PowPills_Post_Types::CATEGORY );

		return array_map(
			function ( $post ) {
				return array(
					'name'     => $post->post_title,
					'icon'     => PowPills_Post_Types::meta( $post->ID, 'icon', 'grid' ),
					'tone'     => PowPills_Post_Types::meta( $post->ID, 'tone', 'soft' ),
					'ctaLabel' => PowPills_Post_Types::meta( $post->ID, 'cta_label', 'View Products' ),
					'href'     => PowPills_Post_Types::meta( $post->ID, 'href', '#' ),
				);
			},
			$posts
		);
	}

	/**
	 * Products, optionally filtered to a homepage rail.
	 *
	 * @param string $section popular | mens_health | wellness.
	 * @return array
	 */
	private static function get_products( $section = '' ) {
		$posts   = self::query( PowPills_Post_Types::PRODUCT );
		$results = array();

		foreach ( $posts as $post ) {
			$sections = (array) PowPills_Post_Types::meta( $post->ID, 'sections', array() );

			if ( $section && ! in_array( $section, $sections, true ) ) {
				continue;
			}

			$badge_label = PowPills_Post_Types::meta( $post->ID, 'badge_label', '' );
			$compare_at  = PowPills_Post_Types::meta( $post->ID, 'compare_at', '' );

			$product = array(
				'id'          => $post->post_name,
				'name'        => $post->post_title,
				'subtitle'    => PowPills_Post_Types::meta( $post->ID, 'subtitle', '' ),
				'category'    => PowPills_Post_Types::meta( $post->ID, 'category', '' ),
				'tabs'        => array_values( (array) PowPills_Post_Types::meta( $post->ID, 'tabs', array() ) ),
				'rating'      => (float) PowPills_Post_Types::meta( $post->ID, 'rating', 0 ),
				'reviewCount' => (int) PowPills_Post_Types::meta( $post->ID, 'review_count', 0 ),
				'price'       => PowPills_Post_Types::meta( $post->ID, 'price', '' ),
				'ctaLabel'    => PowPills_Post_Types::meta( $post->ID, 'cta_label', 'View Options' ),
				'href'        => '/product/' . $post->post_name,
				'image'       => array(
					'src' => self::image_src( $post, 'image_src' ),
					'alt' => PowPills_Post_Types::meta( $post->ID, 'image_alt', $post->post_title ),
				),
			);

			if ( $badge_label ) {
				$product['badge'] = array(
					'label' => $badge_label,
					'tone'  => PowPills_Post_Types::meta( $post->ID, 'badge_tone', 'sale' ),
				);
			}

			if ( $compare_at ) {
				$product['compareAtPrice'] = $compare_at;
			}

			$results[] = $product;
		}

		return $results;
	}

	/**
	 * Promo cards.
	 *
	 * @return array
	 */
	private static function get_promos() {
		$posts = self::query( PowPills_Post_Types::PROMO );

		return array_map(
			function ( $post ) {
				$card = array(
					'title'       => $post->post_title,
					'description' => PowPills_Post_Types::meta( $post->ID, 'description', '' ),
					'tone'        => PowPills_Post_Types::meta( $post->ID, 'tone', 'mint' ),
					'image'       => array(
						'src' => self::image_src( $post, 'image_src' ),
						'alt' => PowPills_Post_Types::meta( $post->ID, 'image_alt', $post->post_title ),
					),
				);

				$cta  = PowPills_Post_Types::meta( $post->ID, 'cta_label', '' );
				$href = PowPills_Post_Types::meta( $post->ID, 'href', '' );

				if ( $cta && $href ) {
					$card['ctaLabel'] = $cta;
					$card['href']     = $href;
				}

				return $card;
			},
			$posts
		);
	}

	/**
	 * Testimonials.
	 *
	 * @return array
	 */
	private static function get_testimonials() {
		$posts = self::query( PowPills_Post_Types::TESTIMONIAL );

		return array_map(
			function ( $post ) {
				return array(
					'quote'  => PowPills_Post_Types::meta( $post->ID, 'quote', '' ),
					'name'   => $post->post_title,
					'role'   => PowPills_Post_Types::meta( $post->ID, 'role', 'Verified Buyer' ),
					'avatar' => self::image_src( $post, 'avatar' ),
				);
			},
			$posts
		);
	}

	/**
	 * FAQ entries.
	 *
	 * @return array
	 */
	private static function get_faqs() {
		$posts = self::query( PowPills_Post_Types::FAQ );

		return array_map(
			function ( $post ) {
				return array(
					'question' => $post->post_title,
					'answer'   => PowPills_Post_Types::meta( $post->ID, 'answer', '' ),
				);
			},
			$posts
		);
	}

	/**
	 * Stores a newsletter signup.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function subscribe( $request ) {
		$email = sanitize_email( (string) $request->get_param( 'email' ) );

		if ( ! is_email( $email ) ) {
			return new WP_Error(
				'powpills_invalid_email',
				'Please enter a valid email address.',
				array( 'status' => 400 )
			);
		}

		$subscribers = (array) get_option( self::SUBSCRIBERS_OPTION, array() );

		if ( ! isset( $subscribers[ $email ] ) ) {
			$subscribers[ $email ] = current_time( 'mysql' );
			update_option( self::SUBSCRIBERS_OPTION, $subscribers );
		}

		return rest_ensure_response(
			array(
				'subscribed' => true,
				'email'      => $email,
			)
		);
	}

	/**
	 * Ordered query helper.
	 *
	 * @param string $post_type Post type.
	 * @return WP_Post[]
	 */
	private static function query( $post_type ) {
		return get_posts(
			array(
				'post_type'        => $post_type,
				'post_status'      => 'publish',
				'numberposts'      => 100,
				'orderby'          => array(
					'menu_order' => 'ASC',
					'date'       => 'ASC',
				),
				'suppress_filters' => false,
			)
		);
	}

	/**
	 * Prefers a real featured image, falls back to the meta path (dummy image).
	 *
	 * @param WP_Post $post     Post.
	 * @param string  $meta_key Unprefixed meta key holding the fallback path.
	 * @return string
	 */
	private static function image_src( $post, $meta_key ) {
		$thumbnail = get_the_post_thumbnail_url( $post->ID, 'full' );

		if ( $thumbnail ) {
			return $thumbnail;
		}

		return PowPills_Post_Types::meta( $post->ID, $meta_key, '' );
	}
}
