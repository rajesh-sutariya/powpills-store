<?php
/**
 * Dumps every copy string from the WordPress side so
 * tools/check-copy-parity.py can compare it against frontend/lib/content.ts.
 *
 * Only homepage copy is dumped. Products and categories deliberately live in
 * the shared data/catalog.json (compared separately by a byte-for-byte check),
 * so they are not part of this comparison.
 *
 * Usage:  php tools/dump-wp-copy.php
 */

define( 'ABSPATH', '/tmp/' );

require __DIR__ . '/../backend/wp-content/plugins/powpills-core/includes/class-powpills-content.php';

$all = array(
	'settings'     => PowPills_Content::settings(),
	'promos'       => PowPills_Content::promos(),
	'testimonials' => PowPills_Content::testimonials(),
	'faqs'         => PowPills_Content::faqs(),
);

$strings = array();
array_walk_recursive(
	$all,
	function ( $value ) use ( &$strings ) {
		if ( is_string( $value ) && '' !== trim( $value ) ) {
			$strings[] = $value;
		}
	}
);

$strings = array_values( array_unique( $strings ) );
sort( $strings );

file_put_contents( __DIR__ . '/php-strings.txt', implode( "\n", $strings ) . "\n" );

echo count( $strings ), " strings dumped\n";
