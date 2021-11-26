<?php get_header(); ?>

<body class="post">
  <header id="about" class="section__header">
    <h1 class="section__title section__header--title">
      <a aria-label="Back to main page" href="<?php echo site_url('blog'); ?>">
        <small aria-label="hidden">&larr;</small>
        Developer Sojourn</a
      >
    </h1>
    <aside class="section__header-search">
      <form class="search-form">
        <input
          class="search-form__input"
          id="search-posts"
          name="text-input"
          type="text"
          placeholder="You know what to do."
        />
        <label
          class="search-form__label"
          for="search-posts"
          aria-label="search input for blog posts"
        ></label>
        <output class="search-form__results"></output>
      </form>
    </aside>
  </header>

  <section class="section__post mt-2">
    <aside class="post-index"></aside>

    <?php while(have_posts()) {
      the_post();
      $categories = get_the_category();
      $post_category = '';
      if ( ! empty( $categories ) ) {
        $post_category = $post_category . esc_html( $categories[0]->name );
      }
    ?>
      <main class="post-content">
        <header class="<?php echo 'post-header post-header--' . $post_category ?>">
          <h2 class="post-title"> <?php the_title(); ?> </h2>
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-' . $post_category ?>"></use>
          </svg>
        </header>
        <?php the_content(); ?>
      </main>
    <?php } ?>

  </section>

<?php get_footer(); ?>
