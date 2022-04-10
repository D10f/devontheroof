<?php

  if (is_single()) {
    $nav_link_location = '/blog';
    $nav_link_label = 'Back To Blog';
  } else {
    $nav_link_location = '/';
    $nav_link_label = 'Back To Main';
  }
?>

<header class="page-header">
  <h1 class="page-header__title">
    <a
      href="<?= site_url($nav_link_location)  ?>"
      aria-label="<?= $nav_link_label ?>"
    >
      <small aria-label="hidden">&larr;</small>
      <?= $nav_link_label ?>
    </a>
  </h1>

  <!-- Include searchbar  -->
  <?php get_template_part('templates/searchbar'); ?>
</header>
