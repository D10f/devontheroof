<?php

get_header();

// Get post information to process before output
while (have_posts()) {
  the_post();
  $content = get_the_content();
  $title = get_the_title();
}

// Extract h3 elements to build table of contents
preg_match_all('/<h3.*>(.*)<\/h3>/', $content, $headings);
?>

<div class="single-post">

  <aside class="sidebar">
    <a class="sidebar__link sidebar__link--icon" href="/blog">
      <svg>
        <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-arrow-left" ?>"/>
      </svg>
      Back to blog
    </a>
    <p>Table of contents:</p>
    <menu class="sidebar__menu">
      <?php
        foreach ($headings[1] as $heading) {
          $filtered_heading = preg_replace('/[\?\-\.\(\)!:,]/', '', strtolower($heading))
        ?>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#<?= preg_replace('/\s/', '-', $filtered_heading) ?>">
              <?= $heading ?>
            </a>
          </li>
      <?php } ?>
    </menu>
  </aside>

  <main class="single-post__content">
    <h2 class="single-post__title"><?= $title ?></h2>
    <?= $content ?>
  </main>

</div>

<!-- get_template_part('templates/page_header'); -->


<!--  while (have_posts()) { -->
<!--    the_post(); -->
<!--    $categories = get_the_category(); -->
<!--    $post_category = ''; -->

<!--    if (!empty($categories)) { -->
<!--      $post_category = esc_html($categories[0]->name); -->
<!--    } -->

<!--  ?> -->

  <!-- <main class="single-post"> -->

  <!--   <section class="single-post__content"> -->
  <!--     <header class="single-post__header"> -->
  <!--       <h2 class="single-post__title"> -->
  <!--         <?php the_title(); ?> -->
  <!--       </h2> -->

  <!--       <!-1- Inject post index here using JavaScript (Mobile version) -1-> -->
  <!--       <!-1- <nav class="single-post__index"> -->
  <!--       <svg aria-hidden="true"> -->
  <!--         <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-hamburger' ?>" /> -->
  <!--       </svg> -->

  <!--       <ul class="dropdown"></ul> -->
  <!--     </nav> -1-> -->
  <!--     </header> -->

  <!--     <?php the_content(); ?> -->
  <!--   </section> -->
  <!-- </main> -->

<?php // }

get_footer();

?>
