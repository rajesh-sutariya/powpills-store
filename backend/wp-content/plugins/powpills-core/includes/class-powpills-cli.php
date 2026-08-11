<?php
/**
 * WP-CLI commands.
 *
 *   wp powpills seed
 *   wp powpills endpoint
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

class PowPills_CLI {

	/**
	 * Registers the command with WP-CLI when available.
	 */
	public static function init() {
		if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
			return;
		}

		WP_CLI::add_command( 'powpills', __CLASS__ );
	}

	/**
	 * Seeds every storefront content type with the shipped homepage copy.
	 *
	 * ## OPTIONS
	 *
	 * [--skip-existing]
	 * : Leave content that already exists untouched.
	 *
	 * @param array $args       Positional args.
	 * @param array $assoc_args Flags.
	 */
	public function seed( $args, $assoc_args ) {
		$force  = empty( $assoc_args['skip-existing'] );
		$counts = PowPills_Seeder::run( $force );

		foreach ( $counts as $type => $count ) {
			WP_CLI::log( sprintf( '%-14s %d', $type, $count ) );
		}

		WP_CLI::success( 'PowPills content seeded.' );
	}

	/**
	 * Prints the headless homepage endpoint.
	 */
	public function endpoint() {
		WP_CLI::line( rest_url( PowPills_REST::NAMESPACE_V1 . '/homepage' ) );
	}
}
