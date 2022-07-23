<?php

get_header();

$categories = get_categories();
$posts_by_category = [];

foreach ($categories as $category) {
  $posts_by_category[$category->name] = [];
}

while (have_posts()) {
  the_post();

  $post_category = get_the_category()[0]->name;
  $post_data = [
    "title" => get_the_title(),
    "permalink" => get_the_permalink(),
  ];

  array_push($posts_by_category[$post_category], $post_data);
}

// Include template: Page Header
get_template_part('templates/page_header');

?>

<main class="blog">

  <?php

  foreach ($categories as $category) { ?>
    <article class="blog__category">
      <header class="blog__category-icon blog__category-icon--<?= $category->name ?>">
        <svg>
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-" . $category->name ?>" />
        </svg>
      </header>

      <ul class="blog__list">
        <?php foreach ($posts_by_category[$category->name] as $post) { ?>

          <li class="blog__item">
            <a class="blog__link" href="<?= $post['permalink']; ?>">
              <?= $post['title']; ?>
            </a>
          </li>

        <?php } ?>
      </ul>

    </article>
  <?php } ?>
</main>

<?php get_footer(); ?>
