<?php

/**
 * Load external php files such as custom functions
 */
require_once( 'inc/clean_headers.php' );
require_once( 'inc/render_project.php' );
require_once( 'inc/rest_endpoint.php' );
require_once( 'inc/custom_post_types.php' );


/**
 * Load theme css and js files
 */
add_action( 'wp_enqueue_scripts', 'load_resources' );


/**
 * Load Title tags, etc
 */
add_action( 'after_setup_theme', 'load_features' );


/**
 * Create new custom post types
 */
add_action( 'init', 'create_post_types' );


/**
 * Create REST endpoint
 * TODO: pagination for rest endpoint
 */
add_action( 'rest_api_init', 'create_rest_endpoint' );


/**
 * Adjust default queries
 */
add_action( 'pre_get_posts', 'customize_queries' );


function load_resources() {
  wp_enqueue_style( 'main_styles', get_theme_file_uri( '/build/index.css' ));
  wp_enqueue_script( 'main_script', get_theme_file_uri( '/build/index.js' ), NULL, '1.0', true );
}


function load_features() {
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
  // add_image_size( 'project_thumbnail', 535, 250, true );
}


function customize_queries($query) {

  /**
   * Updates the main query for blog posts to retrieve all of them.
   */
  if ( ! is_admin() AND $query->is_home() AND $query->is_main_query() ) {
    $query->set( 'posts_per_page', '-1' );
  }
}
