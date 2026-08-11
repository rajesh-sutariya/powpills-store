<?php
/**
 * Seeds WordPress with the PowPills homepage content.
 *
 * Idempotent: posts are matched on slug, so re-running updates the existing
 * entries instead of creating duplicates.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Seeder {

	const SETTINGS_OPTION = 'powpills_settings';
	const SEEDED_OPTION   = 'powpills_seeded_version';

	/**
	 * Runs the full seed.
	 *
	 * @param bool $force Overwrite content that already exists.
	 * @return array Counts per content type.
	 */
	public static function run( $force = true ) {
		$counts = array(
			'settings'     => self::seed_settings( $force ),
			'categories'   => self::seed_categories( $force ),
			'products'     => self::seed_products( $force ),
			'promos'       => self::seed_promos( $force ),
			'testimonials' => self::seed_testimonials( $force ),
			'faqs'         => self::seed_faqs( $force ),
		);

		update_option( self::SEEDED_OPTION, POWPILLS_VERSION );

		return $counts;
	}

	/**
	 * Stores the global copy option.
	 *
	 * @param bool $force Overwrite existing option.
	 * @return int
	 */
	private static function seed_settings( $force ) {
		$existing = get_option( self::SETTINGS_OPTION );

		if ( $existing && ! $force ) {
			return 0;
		}

		update_option( self::SETTINGS_OPTION, PowPills_Content::settings() );

		return 1;
	}

	/**
	 * @param bool $force Overwrite existing posts.
	 * @return int
	 */
	private static function seed_categories( $force ) {
		$count = 0;

		foreach ( PowPills_Content::categories() as $index => $category ) {
			$post_id = self::upsert(
				PowPills_Post_Types::CATEGORY,
				$category['slug'],
				$category['name'],
				'',
				$index + 1,
				$force
			);

			if ( ! $post_id ) {
				continue;
			}

			self::save_meta(
				$post_id,
				array(
					'icon'      => $category['icon'],
					'tone'      => $category['tone'],
					'cta_label' => $category['ctaLabel'],
					'href'      => $category['href'],
				)
			);

			$count++;
		}

		return $count;
	}

	/**
	 * @param bool $force Overwrite existing posts.
	 * @return int
	 */
	private static function seed_products( $force ) {
		$count = 0;

		foreach ( PowPills_Content::products() as $index => $product ) {
			$post_id = self::upsert(
				PowPills_Post_Types::PRODUCT,
				$product['slug'],
				$product['name'],
				'',
				$index + 1,
				$force
			);

			if ( ! $post_id ) {
				continue;
			}

			self::save_meta(
				$post_id,
				array(
					'subtitle'     => $product['subtitle'],
					'category'     => $product['category'],
					'badge_label'  => $product['badgeLabel'],
					'badge_tone'   => $product['badgeTone'],
					'tabs'         => $product['tabs'],
					'rating'       => $product['rating'],
					'review_count' => $product['reviewCount'],
					'price'        => $product['price'],
					'compare_at'   => $product['compareAt'],
					'cta_label'    => $product['ctaLabel'],
					'sections'     => $product['sections'],
					'image_src'    => $product['image']['src'],
					'image_alt'    => $product['image']['alt'],
				)
			);

			$count++;
		}

		return $count;
	}

	/**
	 * @param bool $force Overwrite existing posts.
	 * @return int
	 */
	private static function seed_promos( $force ) {
		$count = 0;

		foreach ( PowPills_Content::promos() as $index => $promo ) {
			$post_id = self::upsert(
				PowPills_Post_Types::PROMO,
				$promo['slug'],
				$promo['title'],
				'',
				$index + 1,
				$force
			);

			if ( ! $post_id ) {
				continue;
			}

			self::save_meta(
				$post_id,
				array(
					'description' => $promo['description'],
					'tone'        => $promo['tone'],
					'cta_label'   => $promo['ctaLabel'],
					'href'        => $promo['href'],
					'image_src'   => $promo['image']['src'],
					'image_alt'   => $promo['image']['alt'],
				)
			);

			$count++;
		}

		return $count;
	}

	/**
	 * @param bool $force Overwrite existing posts.
	 * @return int
	 */
	private static function seed_testimonials( $force ) {
		$count = 0;

		foreach ( PowPills_Content::testimonials() as $index => $testimonial ) {
			$post_id = self::upsert(
				PowPills_Post_Types::TESTIMONIAL,
				$testimonial['slug'],
				$testimonial['name'],
				'',
				$index + 1,
				$force
			);

			if ( ! $post_id ) {
				continue;
			}

			self::save_meta(
				$post_id,
				array(
					'quote'  => $testimonial['quote'],
					'role'   => $testimonial['role'],
					'avatar' => $testimonial['avatar'],
				)
			);

			$count++;
		}

		return $count;
	}

	/**
	 * @param bool $force Overwrite existing posts.
	 * @return int
	 */
	private static function seed_faqs( $force ) {
		$count = 0;

		foreach ( PowPills_Content::faqs() as $index => $faq ) {
			$post_id = self::upsert(
				PowPills_Post_Types::FAQ,
				$faq['slug'],
				$faq['question'],
				'',
				$index + 1,
				$force
			);

			if ( ! $post_id ) {
				continue;
			}

			self::save_meta( $post_id, array( 'answer' => $faq['answer'] ) );

			$count++;
		}

		return $count;
	}

	/**
	 * Creates or updates a post by slug.
	 *
	 * @param string $post_type Post type.
	 * @param string $slug      Post slug.
	 * @param string $title     Post title.
	 * @param string $content   Post content.
	 * @param int    $order     Menu order.
	 * @param bool   $force     Update when the post already exists.
	 * @return int|false Post ID, or false when skipped.
	 */
	private static function upsert( $post_type, $slug, $title, $content, $order, $force ) {
		$existing = get_posts(
			array(
				'post_type'        => $post_type,
				'name'             => $slug,
				'post_status'      => 'any',
				'numberposts'      => 1,
				'suppress_filters' => false,
			)
		);

		$args = array(
			'post_type'    => $post_type,
			'post_name'    => $slug,
			'post_title'   => $title,
			'post_content' => $content,
			'post_status'  => 'publish',
			'menu_order'   => $order,
		);

		if ( $existing ) {
			if ( ! $force ) {
				return false;
			}

			$args['ID'] = $existing[0]->ID;

			return wp_update_post( $args );
		}

		return wp_insert_post( $args );
	}

	/**
	 * Writes prefixed meta values.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $fields  key => value pairs (unprefixed keys).
	 */
	private static function save_meta( $post_id, array $fields ) {
		foreach ( $fields as $key => $value ) {
			update_post_meta( $post_id, '_powpills_' . $key, $value );
		}
	}
}
