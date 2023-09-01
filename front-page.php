<?php get_header(); ?>

<!-- <aside class="navigation hide-on-phone"> -->
<!--   <ul class="navigation__links"> -->
<!--     <!-1- <li class="navigation__item"> -1-> -->
<!--     <!-1-   <a class="navigation__link" href="#web-applications">Web Apps</a> -1-> -->
<!--     <!-1- </li> -1-> -->
<!--     <!-1- <li class="navigation__item"> -1-> -->
<!--     <!-1-   <a class="navigation__link" href="#graphics">Graphics</a> -1-> -->
<!--     <!-1- </li> -1-> -->
<!--     <!-1- <li class="navigation__item"> -1-> -->
<!--     <!-1-   <a class="navigation__link" href="#scripting">Scripts</a> -1-> -->
<!--     <!-1- </li> -1-> -->
<!--     <!-1- <li class="navigation__item"> -1-> -->
<!--     <!-1-   <a class="navigation__link" href="#devops">DevOps</a> -1-> -->
<!--     <!-1- </li> -1-> -->
<!--     <li class="navigation__item"> -->
<!--       <a class="navigation__link" href="#web-applications">Projects</a> -->
<!--     </li> -->
<!--     <li class="navigation__item"> -->
<!--       <a class="navigation__link" href="/blog">Blog</a> -->
<!--     </li> -->
<!--     <li class="navigation__item"> -->
<!--       <a class="navigation__link" href="#contact">About</a> -->
<!--     </li> -->
<!--   </ul> -->
<!-- </aside> -->

<header class="landing__header">

  <!-- Introduction -->
  <section class="landing__introduction">

    <?php the_content(); ?>
    <p class="landing__introduction--whoami">I'm a Web Developer from Spain who enjoys making and learning new things, especially in the realm of the web, retrogaming and open source technologies.</p>
    <p class="landing__introduction--whoami">This website is where I write useful notes for my future self and things I find interesting about technology. I also use it to showcase some of my favorite projects that I've worked on.</p>
    <p class="landing__introduction--whoami">Checkout some of my projects below, how I setup my development environment, my GitHub and Codeberg pages and get in touch.</p>

    <!-- <ul> -->
    <!--   <p>Who am I, you ask? I'm...</p> -->
    <!--   <li class="landing__introduction--whoami"> -->
    <!--     <svg aria-hidden="true"> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-code' ?>"></use> -->
    <!--     </svg> -->
    <!--     A Full-Stack Developer. -->
    <!--   </li> -->
    <!--   <li class="landing__introduction--whoami"> -->
    <!--     <svg aria-hidden="true"> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-badge' ?>"></use> -->
    <!--     </svg> -->
    <!--     Linux Foundation Certified System Administrator. -->
    <!--   </li> -->
    <!--   <li class="landing__introduction--whoami"> -->
    <!--     <svg aria-hidden="true"> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-cloud' ?>"></use> -->
    <!--     </svg> -->
    <!--     Passionate about all things web and cloud. -->
    <!--   </li> -->
    <!--   <li class="landing__introduction--whoami"> -->
    <!--     <svg aria-hidden="true"> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-location' ?>"></use> -->
    <!--     </svg> -->
    <!--     Based in Spain. -->
    <!--   </li> -->
    <!--   <li class="landing__introduction--whoami"> -->
    <!--     <svg aria-hidden="true"> -->
    <!--       <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-talk' ?>"></use> -->
    <!--     </svg> -->
    <!--     Available, let's talk. -->
    <!--   </li> -->
    <!-- </ul> -->
  </section>


  <!-- Recent blog entries -->
  <section class="landing__recent-posts">
    <a class="landing__posts-separator" id="blog-separator" href="<?= site_url('blog'); ?>">BLOG</a>
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

  get_template_part('templates/about');

  ?>

</main>

<?php get_footer(); ?>
