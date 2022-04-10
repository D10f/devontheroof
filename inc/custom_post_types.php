<?php

function create_post_types() {
  register_post_type('project', [
    'public' => true,
    'show_in_rest' => true,
    'has_archive' => true,
    'supports' => [
      'title',
      'editor',
      'excerpt',
      'thumbnail'
    ],
    'rewrite' => [
      'slug' => 'projects'
    ],
    'labels' => array(
      'name' => 'Projects',
      'add_new_item' => 'Add New Project',
      'edit_item' => 'Edit Project',
      'all_items' => 'All Projects',
      'singular_name' => 'Project'
    ),
    'menu_icon' => 'dashicons-hammer'
  ]);
}