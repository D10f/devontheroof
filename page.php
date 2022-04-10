<?php

  get_header();

  // Include template: Page Header
  get_template_part('templates/page_header');

  while(have_posts()) {
     the_post(); ?>

     <main>
       <header>
         <h2>
           <?php the_title(); ?>
         </h2>
         <p>This is a page</p>
       </header>

       <section>
         <aside>
           <p>Published on <time><?php the_time(); ?></time></p>
         </aside>

         <?php the_content(); ?>
       </section>
     </main>

  <?php }

  get_footer();

?>
