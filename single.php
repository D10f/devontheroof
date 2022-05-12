<?php

  get_header();

  // Include template: Page Header
  get_template_part('templates/page_header');

  while(have_posts()) {
    the_post();
    $categories = get_the_category();
    $post_category = '';

    if (!empty($categories)) {
      $post_category = esc_html($categories[0]->name);
    }

    ?>

    <main class="single-post">
      <header class="single-post__header mb-2 gradient--<?= $post_category ?>">
        <h2 class="single-post__title">
          <?php the_title(); ?>
        </h2>

        <nav class="single-post__index">
          <svg aria-hidden="true">
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-hamburger' ?>"></use>
          </svg>

          <ul class="dropdown"></ul>

        </nav>
      </header>

      <!-- https://wordpress.org/support/article/formatting-date-and-time/#format-string-examples -->
      <!-- F j, Y g:i a – November 6, 2010 12:50 am -->
      <aside class="single-post__meta">
        <p>
          Published on <time><?php the_time('F j, Y g:i a'); ?></time>
        </p>
        <?php if (get_the_time() !== get_the_modified_time()) { ?>
        <p>
          Last updated on <time><?php the_modified_time('F j, Y g:i a'); ?></time>
        </p>
        <?php } ?>
      </aside>

      <section class="single-post__content">
        <?php the_content(); ?>
      </section>

      <aside class="floating">
        <a class="btn--round btn--large btn--dark animate-pulse" href="#">&uarr;</a>
      </aside>
    </main>

  <?php }

  get_footer();

?>
