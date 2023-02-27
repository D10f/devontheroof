<?php

get_header();

$categories = get_categories();
// $posts_by_category = [];

// foreach ($categories as $category) {
//   $posts_by_category[$category->name] = [];
// }

// while (have_posts()) {
//   the_post();

//   $post_category = get_the_category()[0]->name;
//   $post_data = [
//     "title" => get_the_title(),
//     "permalink" => get_the_permalink(),
//   ];

//   array_push($posts_by_category[$post_category], $post_data);
// }

// Include template: Page Header
// get_template_part('templates/page_header');

?>

<div class="blog">

  <aside class="sidebar">
    <a class="sidebar__link sidebar__link--icon" href="/">
      <svg>
        <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-arrow-left" ?>"/>
      </svg>
      Back to main
    </a>
    <p>Categories:</p>
    <menu class="sidebar__menu">
      <?php
      foreach ($categories as $category) { ?>
      <li class="sidebar__item">
        <a class="sidebar__link sidebar__link--icon" href="#">
          <svg>
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-" . $category->name ?>" />
          </svg>
          <?= $category->name ?> (<?= $category->category_count ?>)
        </a>
        </li>
      <?php } ?>
    </menu>
  </aside>

  <main class="blog__post-list">

    <?php while (have_posts()) {
      the_post();
    ?>

      <article class="blog__post">
        <header class="blog__post-header">
          <h3 class="blog__post-title">
            <a href="<?= the_permalink() ?>"><?= the_title(); ?></a>
          </h3>
        </header>
        <div class="blog__post-excerpt"><?= the_excerpt(); ?></div>
      </article>

    <?php } ?>

  </main>

<?php
  // foreach ($categories as $category) { ?>
    <!-- <article class="blog__category"> -->
    <!--   <header class="blog__category-icon blog__category-icon--<?= $category->name ?>"> -->
    <!--     <svg> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-" . $category->name ?>" /> -->
    <!--     </svg> -->
    <!--   </header> -->

    <!--   <ul class="blog__list"> -->
    <!--     <?php foreach ($posts_by_category[$category->name] as $post) { ?> -->

    <!--       <li class="blog__item"> -->
    <!--         <a class="blog__link" href="<?= $post['permalink']; ?>"> -->
    <!--           <?= $post['title']; ?> -->
    <!--         </a> -->
    <!--       </li> -->

    <!--     <?php } ?> -->
    <!--   </ul> -->

    <!-- </article> -->
  <?php // } ?>
</div>

<?php get_footer(); ?>
