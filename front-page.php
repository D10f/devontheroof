<?php get_header(); ?>

<aside class="navigation hide-on-phone">
  <ul class="navigation__links">
    <li class="navigation__item">
      <a class="navigation__link" href="#web-applications">Web Apps</a>
    </li>
    <li class="navigation__item">
      <a class="navigation__link" href="#graphics">Graphics</a>
    </li>
    <li class="navigation__item">
      <a class="navigation__link" href="#scripting">Scripts</a>
    </li>
    <li class="navigation__item">
      <a class="navigation__link" href="#devops">DevOps</a>
    </li>
    <li class="navigation__item">
      <a class="navigation__link" href="#contact">Contact</a>
    </li>
  </ul>

</aside>

<header class="landing__header">

  <!-- Introduction -->
  <section class="landing__introduction">
    <?php the_content(); ?>
    <!--
    <a class="btn--round btn--large btn--light animate-hover animate-pulse hide-on-tablet" href="#web-applications" aria-label="hidden">
      &darr;
    </a>
    -->
  </section>


  <!-- Recent blog entries -->
  <section class="landing__recent-posts">
    <a class="landing__posts-separator" href="<?= site_url('blog'); ?>">BLOG</a>
    <?php get_template_part('templates/recent_posts'); ?>
  </section>

  <!-- <a class="landing__scroller tooltip tooltip--top hide-on-tablet" data-tooltip="See projects" href="#web-applications" aria-label="Scroll down to projects">&darr;</a> -->

</header>

<!-- Projects By Type -->
<main>
  <?php

  $projects = new WP_Query([
    'post_type' => 'project',
  ]);


  $webapp_projects = [];
  $graphics_projects = [];
  $script_projects = [];
  $devops_projects = [];

  while ($projects->have_posts()) {
    $projects->the_post();
    $project_type = get_field('project_type');

    $post_data = [
      "id" => get_the_ID(),
      "name" => get_the_title(),
      "content" => get_the_content(),
      "project_type" => $project_type,
      "project_link" => get_field('project_link'),
      "repo_link" => get_field('repo_link'),
      "tech_stack" => get_field('tech_stack'),
      "sketch" => get_field('sketch')
    ];

    switch ($project_type) {
      case 'webapp':
        array_push($webapp_projects, $post_data);
        break;
      case 'graphics':
        array_push($graphics_projects, $post_data);
        break;
      case 'scripts':
        array_push($script_projects, $post_data);
        break;
      case 'devops':
        array_push($devops_projects, $post_data);
        break;
      default:
        break;
    }
  }
  wp_reset_postdata();

  render_project('Web Applications', $webapp_projects);
  render_project('Graphics', $graphics_projects);
  render_project('Scripting', $script_projects);
  render_project('DevOps', $devops_projects);

  ?>

</main>

<?php get_footer(); ?>
