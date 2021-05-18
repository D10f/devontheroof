<?php get_header(); ?>

<main class="blog__main">
  <h2>Latest Posts</h2>
  <div class="blog__latest margin-top">
    <?php while(have_posts()) {
      the_post(); ?>
      <article class="post__preview">
        <h3>
          <a class="post__permalink" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        <p><?php echo wp_trim_words(get_the_content(), 55) ?></p>
      </article>
    <?php } ?>
  </div>
</main>

<?php get_footer(); ?>
