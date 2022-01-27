<?php
  get_header();
  
  $allPosts = new WP_Query(array(
    'post_type' => 'post',
    // 'posts_per_page' => 12
  ));

  $categories = get_categories();
  $postsByCategory = array();
  
  foreach($categories as $category) {
    $postsByCategory[$category->name] = [];
  }

  while($allPosts->have_posts()) {
    $allPosts->the_post();
    $postCategory = get_the_category()[0]->name;
    $post_data = array(
      "title" => get_the_title(),
      "permalink" => get_the_permalink(),
    );

    array_push($postsByCategory[$postCategory], $post_data);
  }
  
  wp_reset_postdata();
?>

<body class="post">

  <header class="header">
    <h1 class="title">
      <a href="<?php echo site_url(''); ?>" aria-label="Back to blog">
        <small aria-label="hidden">&larr;</small>
        Back To Main Page
      </a>
    </h1>

    <?php include 'templates/search.php'; ?>
  </header>

  <section class="blog">
    <main class="blog__categories">
      <?php
        foreach($categories as $category) { ?>
          <ul class="blog__list">
            <li class="blog__item blog__item--icon" aria-label="<?php echo $category->name; ?>">
              <svg aria-hidden="true">
                <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-" . $category->name ?>"></use>
              </svg>
            </li>

            <?php
              foreach($postsByCategory[$category->name] as $post) { ?>
                <li class="blog__item">
                  <a class="blog__link" href="<?php echo $post['permalink']; ?>">
                    <?php echo $post['title']; ?>
                  </a>
                </li>
            <?php } ?>

          </ul>
        <?php } ?>
    </main>
  </section>

  <?php get_footer(); ?>