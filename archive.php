<?php

  get_header();

  // Include template: Page Header
  get_template_part('templates/page_header');

?>

  <main>
    <header>
      <h2>
        <?php the_archive_title(); ?>
      </h2>
      <p><?php the_archive_description(); ?></p>
    </header>

    <section>
      <aside>
        <p>Published on <time><?php the_time(); ?></time></p>
      </aside>

      <?php the_content(); ?>
    </section>
  </main>

<?php get_footer(); ?>
