<?php

/* Load CSS and JS files */
add_action('wp_enqueue_scripts', 'load_scripts_and_styles');

/* Create custom REST route */
add_action('rest_api_init', 'custom_get_posts');

/* Disable oEmbeds */
add_action('wp_footer', 'deregister_embed_scripts');

/* Disable Emojis */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');

/* CSS & JS files are updated by webpack on each build */
function load_scripts_and_styles() {
  wp_enqueue_script('scripts', get_theme_file_uri('main.2d195a77383818be7c13.js'), NULL, '1.0', true);
  wp_enqueue_style('styles', get_theme_file_uri('main.2e6cd4b1dd7ebe674bab.css'), NULL);
}

// Sets up event a custom endpoint: /content/posts
function custom_get_posts() {
  register_rest_route('content', 'posts', array(
    'methods'   => WP_REST_SERVER::READABLE,
    'callback'  => 'load_post_data'
  ));
}

// Returns trimmed down post data that's relevant to the front-end
function load_post_data($request) {
  $post_data = new WP_Query(array(
    'post_type' => 'post',
    'posts_per_page' => 5,
    's' => sanitize_text_field($request['q'])
  ));

  $result = array();

  while($post_data->have_posts()) {
    $post_data->the_post();

    array_push($result, array(
      'id'        => get_the_ID(),
      'title'     => get_the_title(),
      'excerpt'   => wp_trim_words(get_the_content(), 25),
      'link'      => get_the_permalink(),
      'tags'      => get_tag_names(get_the_ID()),
      'category'  => get_the_category()[0]->name
    ));
  }

  return $result;
}

// Return an array with the tag names for a provided post id
function get_tag_names($id) {
  $post_tags = get_the_tags($id);
  $tags = array();

  if ($post_tags) {
    foreach($post_tags as $tag) {
      array_push($tags, $tag->name);
    }
  }

  return $tags;
}

function deregister_embed_scripts(){
  wp_deregister_script( 'wp-embed' );
}
