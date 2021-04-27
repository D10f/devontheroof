<?php get_header(); ?>

<main class="blog__main">
  <h2>Latest Posts</h2>
  <div class="blog__latest">
    <?php while(have_posts()) {
      the_post(); ?>
      <article class="post__preview">
        <h3>
          <a class="post__permalink" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        <p><?php the_excerpt(); ?></p>
      </article>
    <?php } ?>
  </div>
</main>

<?php get_footer(); ?>
