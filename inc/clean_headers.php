<?php

// Removes support for emoticons
remove_action( 'wp_head', 'print_emoji_detection_script', 10 );
remove_action( 'wp_print_styles', 'print_emoji_styles', 10 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script', 10 );
remove_action( 'admin_print_styles', 'print_emoji_styles', 10 );

// Remove support for Really Simple Discovery and Windows Live Writer
remove_action( 'wp_head', 'rsd_link', 10 );
remove_action( 'wp_head', 'wlwmanifest_link', 10 );

// Remove WordPress.org DNS prefetch. Use if all resources are from same domain.
remove_action( 'wp_head', 'wp_resource_hints', 10 );

// Removes generator meta tag that exposes WP version
remove_action( 'wp_head', 'wp_generator', 10 );

// Disables RSS feeds
remove_action( 'wp_head', 'feed_links', 10 );
remove_action( 'wp_head', 'feed_links_extra', 10 );

// Disable oEmbeds
add_action( 'wp_footer', 'deregister_embed_scripts', 10 );

function deregister_embed_scripts(){
  wp_deregister_script( 'wp-embed' );
}
