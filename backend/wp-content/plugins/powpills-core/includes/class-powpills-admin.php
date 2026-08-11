<?php
/**
 * Admin UI: dashboard page, re-seed action, newsletter list and editable
 * meta boxes for every PowPills content type.
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_Admin {

	const PAGE_SLUG = 'powpills';

	/**
	 * Hook registration.
	 */
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_menu' ) );
		add_action( 'admin_post_powpills_seed', array( __CLASS__, 'handle_seed' ) );
		add_action( 'add_meta_boxes', array( __CLASS__, 'register_meta_boxes' ) );
		add_action( 'save_post', array( __CLASS__, 'save_meta_boxes' ), 10, 2 );
	}

	/**
	 * Adds the top-level PowPills menu.
	 */
	public static function register_menu() {
		add_menu_page(
			'PowPills',
			'PowPills',
			'manage_options',
			self::PAGE_SLUG,
			array( __CLASS__, 'render_page' ),
			'dashicons-heart',
			3
		);
	}

	/**
	 * Renders the dashboard page.
	 */
	public static function render_page() {
		$endpoint    = rest_url( PowPills_REST::NAMESPACE_V1 . '/homepage' );
		$subscribers = (array) get_option( PowPills_REST::SUBSCRIBERS_OPTION, array() );
		$seeded      = get_option( PowPills_Seeder::SEEDED_OPTION );
		?>
		<div class="wrap">
			<h1>PowPills</h1>

			<?php if ( isset( $_GET['seeded'] ) ) : ?>
				<div class="notice notice-success is-dismissible">
					<p>Storefront content has been re-seeded.</p>
				</div>
			<?php endif; ?>

			<h2>Headless endpoint</h2>
			<p>The Next.js frontend reads the entire homepage from this URL:</p>
			<p><code><?php echo esc_html( $endpoint ); ?></code></p>
			<p>
				<a class="button" href="<?php echo esc_url( $endpoint ); ?>" target="_blank" rel="noreferrer">
					Open endpoint
				</a>
			</p>

			<hr />

			<h2>Content</h2>
			<p>
				Seeded plugin version:
				<strong><?php echo $seeded ? esc_html( $seeded ) : 'not seeded yet'; ?></strong>
			</p>
			<p>
				Re-seeding rewrites every product, category card, promo card, testimonial, FAQ
				and all global copy back to the values shipped with the plugin.
			</p>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="powpills_seed" />
				<?php wp_nonce_field( 'powpills_seed' ); ?>
				<button type="submit" class="button button-primary">Re-seed storefront content</button>
			</form>

			<hr />

			<h2>Newsletter subscribers (<?php echo count( $subscribers ); ?>)</h2>
			<?php if ( empty( $subscribers ) ) : ?>
				<p>No subscribers yet.</p>
			<?php else : ?>
				<table class="widefat striped" style="max-width:620px">
					<thead>
						<tr><th>Email</th><th>Subscribed</th></tr>
					</thead>
					<tbody>
						<?php foreach ( $subscribers as $email => $date ) : ?>
							<tr>
								<td><?php echo esc_html( $email ); ?></td>
								<td><?php echo esc_html( $date ); ?></td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Handles the re-seed form submission.
	 */
	public static function handle_seed() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Insufficient permissions.' );
		}

		check_admin_referer( 'powpills_seed' );

		PowPills_Seeder::run( true );

		wp_safe_redirect( admin_url( 'admin.php?page=' . self::PAGE_SLUG . '&seeded=1' ) );
		exit;
	}

	/**
	 * Adds a meta box with the storefront fields to each content type.
	 */
	public static function register_meta_boxes() {
		foreach ( array_keys( PowPills_Post_Types::meta_schema() ) as $post_type ) {
			add_meta_box(
				'powpills_fields',
				'Storefront fields',
				array( __CLASS__, 'render_meta_box' ),
				$post_type,
				'normal',
				'high'
			);
		}
	}

	/**
	 * Renders the meta box fields.
	 *
	 * @param WP_Post $post Current post.
	 */
	public static function render_meta_box( $post ) {
		$schema = PowPills_Post_Types::meta_schema();
		$fields = isset( $schema[ $post->post_type ] ) ? $schema[ $post->post_type ] : array();

		wp_nonce_field( 'powpills_fields', 'powpills_fields_nonce' );

		echo '<table class="form-table"><tbody>';

		foreach ( $fields as $key => $type ) {
			$value = get_post_meta( $post->ID, '_powpills_' . $key, true );
			$label = ucwords( str_replace( '_', ' ', $key ) );
			$name  = 'powpills_' . $key;

			echo '<tr><th scope="row"><label for="' . esc_attr( $name ) . '">' . esc_html( $label ) . '</label></th><td>';

			if ( 'array' === $type ) {
				$value = is_array( $value ) ? implode( ', ', $value ) : (string) $value;
				printf(
					'<input type="text" class="large-text" id="%1$s" name="%1$s" value="%2$s" /><p class="description">Comma separated.</p>',
					esc_attr( $name ),
					esc_attr( $value )
				);
			} elseif ( in_array( $key, array( 'answer', 'quote', 'description' ), true ) ) {
				printf(
					'<textarea class="large-text" rows="4" id="%1$s" name="%1$s">%2$s</textarea>',
					esc_attr( $name ),
					esc_textarea( (string) $value )
				);
			} else {
				printf(
					'<input type="text" class="large-text" id="%1$s" name="%1$s" value="%2$s" />',
					esc_attr( $name ),
					esc_attr( (string) $value )
				);
			}

			echo '</td></tr>';
		}

		echo '</tbody></table>';
	}

	/**
	 * Persists meta box values.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 */
	public static function save_meta_boxes( $post_id, $post ) {
		$schema = PowPills_Post_Types::meta_schema();

		if ( ! isset( $schema[ $post->post_type ] ) ) {
			return;
		}

		if ( ! isset( $_POST['powpills_fields_nonce'] )
			|| ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['powpills_fields_nonce'] ) ), 'powpills_fields' ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		foreach ( $schema[ $post->post_type ] as $key => $type ) {
			$name = 'powpills_' . $key;

			if ( ! isset( $_POST[ $name ] ) ) {
				continue;
			}

			$raw = wp_unslash( $_POST[ $name ] );

			if ( 'array' === $type ) {
				$parts = array_filter( array_map( 'trim', explode( ',', (string) $raw ) ) );
				update_post_meta( $post_id, '_powpills_' . $key, array_map( 'sanitize_text_field', $parts ) );
				continue;
			}

			if ( 'number' === $type ) {
				update_post_meta( $post_id, '_powpills_' . $key, (float) $raw );
				continue;
			}

			if ( 'integer' === $type ) {
				update_post_meta( $post_id, '_powpills_' . $key, (int) $raw );
				continue;
			}

			$is_long_text = in_array( $key, array( 'answer', 'quote', 'description' ), true );

			update_post_meta(
				$post_id,
				'_powpills_' . $key,
				$is_long_text ? sanitize_textarea_field( (string) $raw ) : sanitize_text_field( (string) $raw )
			);
		}
	}
}
