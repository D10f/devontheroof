<?php get_header(); ?>

<body class="blog post">

  <header class="header">
    <h1 class="title">
      <a href="<?php echo site_url(''); ?>" aria-label="Back to blog">
        <small aria-label="hidden">&larr;</small>
        Back To Main Page
      </a>
    </h1>

    <?php include 'templates/search.php'; ?>
  </header>

  <p>TODO: Masonry layout with categories and posts</p>

  <section class="section__blog-posts">
    <ul class="blog-list">

      <?php
        $latestPosts = new WP_Query(array(
          'post_type' => 'post',
          'posts_per_page' => 12
        ));

        while($latestPosts->have_posts()) {
          $latestPosts->the_post();
          $categories = get_the_category();
          $post_category = '';
          if ( ! empty( $categories ) ) {
            $post_category = $post_category . esc_html( $categories[0]->name );
          }
        ?>
        
          <li class="<?php echo 'blog-item blog-item--' . $post_category ?>">
            <a class="blog-link" href="<?php the_permalink(); ?>">
              <span class="blog-link--text"><?php the_title(); ?> </span>
            </a>
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-' .$post_category ?>"></use>
            </svg>
          </li>
        <?php } wp_reset_postdata();
      ?>

      <!-- <li class="blog-item blog-item--mongo">
        <a class="blog-link" href="#"> MongoDB </a>
        <svg aria-hidden="true">
          <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mongo" ?>"></use>
        </svg>
      </li>
      <li class="blog-item blog-item--wordpress">
        <a class="blog-link" href="#"> Automate WordPress Backups </a>
        <svg aria-hidden="true">
          <use
            xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-wordpress" ?>"
          ></use>
        </svg>
      </li>
      <li class="blog-item blog-item--wordpress">
        <a class="blog-link" href="#"> Debug WordPress REST API Queries </a>
        <svg aria-hidden="true">
          <use
            xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-wordpress" ?>"
          ></use>
        </svg>
      </li>
      <li class="blog-item blog-item--pwa">
        <a class="blog-link" href="#"> Progressive Web Apps </a>
        <svg aria-hidden="true">
          <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-pwa" ?>"></use>
        </svg>
      </li>
      <li class="blog-item blog-item--nginx">
        <a class="blog-link" href="#"> Basic Authentication With Nginx </a>
        <svg aria-hidden="true">
          <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-nginx" ?>"></use>
        </svg>
      </li>
      <li class="blog-item blog-item--bash">
        <a class="blog-link" href="#"> Everyday Shell Scripts </a>
        <svg aria-hidden="true">
          <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-bash" ?>"></use>
        </svg>
      </li> -->
    </ul>
  </section>

  <?php get_footer(); ?>