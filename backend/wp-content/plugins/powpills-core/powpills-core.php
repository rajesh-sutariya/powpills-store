<?php
/**
 * Plugin Name:       PowPills Core
 * Description:       Headless backend for the PowPills storefront: content types, seed data and the REST endpoint consumed by the Next.js frontend.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            PowPills
 * Text Domain:       powpills
 *
 * @package PowPills
 */

defined( 'ABSPATH' ) || exit;

define( 'POWPILLS_VERSION', '1.0.0' );
define( 'POWPILLS_PLUGIN_FILE', __FILE__ );
define( 'POWPILLS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-content.php';
require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-post-types.php';
require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-seeder.php';
require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-rest.php';
require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-admin.php';
require_once POWPILLS_PLUGIN_DIR . 'includes/class-powpills-cli.php';

PowPills_Post_Types::init();
PowPills_REST::init();
PowPills_Admin::init();
PowPills_CLI::init();

/**
 * On activation: register the post types, then seed the storefront content
 * (without overwriting anything an editor has already changed).
 */
register_activation_hook(
	__FILE__,
	function () {
		PowPills_Post_Types::register_post_types();
		PowPills_Post_Types::register_meta();
		PowPills_Seeder::run( false );
		flush_rewrite_rules();
	}
);

register_deactivation_hook(
	__FILE__,
	function () {
		flush_rewrite_rules();
	}
);
