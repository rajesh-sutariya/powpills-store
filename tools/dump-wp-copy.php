<?php
define('ABSPATH', '/tmp/');
require __DIR__ . '/../backend/wp-content/plugins/powpills-core/includes/class-powpills-content.php';
$all = [
 'settings' => PowPills_Content::settings(),
 'categories' => PowPills_Content::categories(),
 'products' => PowPills_Content::products(),
 'promos' => PowPills_Content::promos(),
 'testimonials' => PowPills_Content::testimonials(),
 'faqs' => PowPills_Content::faqs(),
];
$strings = [];
array_walk_recursive($all, function($v) use (&$strings) { if (is_string($v) && trim($v) !== '') $strings[] = $v; });
$strings = array_values(array_unique($strings));
sort($strings);
file_put_contents(__DIR__ . '/php-strings.txt', implode("\n", $strings) . "\n");
