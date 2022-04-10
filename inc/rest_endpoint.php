<?php

function create_rest_endpoint() {
  register_rest_route('content', 'posts', [
    'methods'   => WP_REST_SERVER::READABLE,
    'callback'  => 'get_post_data'
  ]);
}

function get_post_data($request) {
  
  $post_data = new WP_Query([
    'post_type' => 'post',
    'posts_per_page' => 5,
    's' => sanitize_text_field($request['q'])
  ]);

  $results = [];

  while($post_data->have_posts()) {
    $post_data->the_post();

    array_push($results, [
      'id'        => get_the_ID(),
      'title'     => get_the_title(),
      'link'      => get_the_permalink(),
      'category'  => get_the_category()[0]->name
    ]);
  }

  return $results;
}