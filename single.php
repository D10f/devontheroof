<?php

get_header();

get_template_part('templates/page_header');

while (have_posts()) {
  the_post();
  $categories = get_the_category();
  $post_category = '';

  if (!empty($categories)) {
    $post_category = esc_html($categories[0]->name);
  }

?>

  <main class="single-post">

    <section class="single-post__content">
      <header class="single-post__header">
        <h2 class="single-post__title">
          <?php the_title(); ?>
        </h2>

        <!-- Inject post index here using JavaScript (Mobile version) -->
        <!-- <nav class="single-post__index">
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-hamburger' ?>" />
        </svg>

        <ul class="dropdown"></ul>
      </nav> -->
      </header>

      <?php the_content(); ?>
    </section>
  </main>

<?php }

get_footer();

?>
