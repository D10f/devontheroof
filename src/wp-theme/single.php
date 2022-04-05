<?php get_header(); ?>

<body class="post">

  <header class="header">
    <h1 class="title">
      <a href="<?php echo site_url('blog'); ?>" aria-label="Back to blog">
        <small aria-label="hidden">&larr;</small>
        Back To Blog
      </a>
    </h1>

    <?php include 'templates/search.php'; ?>
  </header>

  <section class="single-post">
    <?php while(have_posts()) {
      the_post();
      $categories = get_the_category();
      $post_category = '';
      if ( ! empty( $categories ) ) {
        $post_category = $post_category . esc_html( $categories[0]->name );
      }
    ?>

    <header class="single-post__header <?php echo "gradient--" . $post_category ?>">
      <h2 class="single-post__title">
        <?php the_title(); ?>
      </h2>

      <nav class="single-post__index">
        <svg aria-hidden="true">
          <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-hamburger' ?>"></use>
        </svg>
        <ul class="dropdown"></ul>
      </nav>
    </header>

    <main class="single-post__content mt-3">
      <?php the_content(); ?>
    </main>

    <?php } ?>
  </section>

<?php get_footer(); ?>
