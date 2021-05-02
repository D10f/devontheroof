<?php get_header(); ?>

<main class="blog__main blog__main--single">
  <aside class="blog__table-of-contents">
  </aside>

  <?php while(have_posts()) {
    the_post(); ?>
    <article class="post__content">
      <h2 class="post__title"><?php the_title(); ?></h2>
      <?php the_content(); ?>
    </article>
  <?php } ?>
</main>

<?php get_footer(); ?>
