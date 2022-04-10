<?php

  $recent_posts = new WP_Query([
    'post_type' => 'post',
    'posts_per_page' => 6
  ]);

?>

  <ul class="landing__posts-grid">
    <?php while($recent_posts->have_posts()) {
      $recent_posts->the_post();
      $categories = get_the_category();
      $post_category = '';

      if (!empty($categories)) {
        $post_category = esc_html($categories[0]->name);
      }
    ?>

      <li class="blog-card gradient--<?= $post_category ?>">
        <a
          class="blog-card__link"
          href="<?php the_permalink(); ?>"
        >
          <span class="blog-card__text">
            <?php the_title(); ?>
          </span>
        </a>

        <svg>
          <use
            xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-" . $post_category ?>"
          />
        </svg>
      </li>

    <?php } wp_reset_postdata(); ?>

  </ul>
