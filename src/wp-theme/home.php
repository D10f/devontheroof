<?php get_header(); ?>

<body>
  <header id="about" class="section__header">
    <section class="section__header-intro">
      <div class="section__header-description">
        <h1 class="section__header-title">Lorem Ipsum</h1>

        <p class="section__header-whoami">
          Hi! I'm a <span class="highlight">Web developer</span> based in Spain.
        </p>

        <p class="section__header-whoami">
          Interested in <span class="highlight">all things web</span>, <span class="highlight">DevOps</span> and <span class="highlight">cybersecurity</span>.
        </p>

        <p class="section__header-whoami">
          Currently learning: <span class="highlight">Docker</span>, Ansible, Jenkins.
        </p>

      </div>


      <a class="section__header-scroll" href="#webapps">&darr;</a>
    </section>

    <section class="section__header-blog">
      <a class="blog-separator" href="<?php echo site_url('blog'); ?>">BLOG</a>
      <ul class="blog-list">
        <?php
        $latestPosts = new WP_Query(array(
          'post_type' => 'post',
          'posts_per_page' => 6
        ));

        while ($latestPosts->have_posts()) {
          $latestPosts->the_post();
          $categories = get_the_category();
          $post_category = '';
          if (!empty($categories)) {
            $post_category = $post_category . esc_html($categories[0]->name);
          }
        ?>

          <li class="<?php echo 'blog-item blog-item--' . $post_category ?>">
            <a class="blog-link" href="<?php the_permalink(); ?>">
              <span class="blog-link--text"><?php the_title(); ?> </span>
            </a>
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-' . $post_category ?>"></use>
            </svg>
          </li>
        <?php }
        wp_reset_postdata();
        ?>
      </ul>
    </section>
  </header>

  <section id="webapps" class="section__webapps">
    <h2 class="section__title transition">Web Applications</h2>

    <article class="project">
      <div class="project__preview">
        <img src="<?php echo get_theme_file_uri('images/bytesandpipes.webp'); ?>" alt="Screenshot of a website called bytes and pipes" loading="lazy" />
      </div>
      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-bytes" id="stack-bytes">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-bytes">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Bytes And Pipes</h3>
          <p class="project__description">
            A <span class="highlight">file-sharing</span> web application that protects your privacy by using
            <span class="highlight">AES256-bit encryption</span>. Upload files of up to 1GB and share them
            easily with a link. Is that simple!
          </p>

          <footer class="project__footer">
            <a href="https://bytesandpipes.com" target="_blank" class="btn">View</a>
            <a href="https://github.com/herokunt/bytes-and-pipes" target="_blank" class="btn ml-2">Code</a>
          </footer>
        </div>

        <ul class="project__stack">
          <li class="tooltip" data-tooltip="TypeScript">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-ts" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="SASS">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-sass" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="React.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-react" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Redux">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-redux" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Node.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-node" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Express.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-express" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="MongoDB">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mongo" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <img src="<?php echo get_theme_file_uri('images/budget.webp'); ?>" alt="Screenshot of a website called bytes and pipes" loading="lazy" />
      </div>
      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-gadget" id="stack-gadget">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-gadget">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Gadget Budget</h3>
          <p class="project__description">
            <span class="highlight">Expense management</span> web application
            with support for multiple wallets to keep your budget under control
            in every situation, a <span class="highlight">visual dashboard
            </span> to make sense of your spending habits, and complete privacy
            using <span class="highlight">AES256-bit encryption.</span>
          </p>

          <footer class="project__footer">
            <a href="https://pawnsguard.com" target="_blank" class="btn">View</a>
            <a href="https://github.com/herokunt/gadget-budget" target="_blank" class="btn ml-2">Code</a>
          </footer>

        </div>

        <ul class="project__stack">
          <li class="tooltip" data-tooltip="TypeScript">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-ts" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Styled Components">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-styled" ?>-components"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="React.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-react" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Redux">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-redux" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Node.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-node" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Nest.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-nest" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="MongoDB">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mongo" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <img src="<?php echo get_theme_file_uri('images/nomads.webp'); ?>" alt="Screenshot of a website called bytes and pipes" loading="lazy" />
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-prismic" id="stack-prismic">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-prismic">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Prismic Adventures</h3>
          <p class="project__description">
            Share all the pictures of your trips on this <span class="highlight">social network</span>.
            Get a notification when you receive a <span class="highlight">follow,</span>
            <span class="highlight">like</span> or <span class="highlight">comment</span> on your posts,
            and stay up to date with your friends with an <span class="highlight">infinite scrolling</span> feed.
          </p>
          <footer class="project__footer">
            <a href="https://prismicadventures.xyz" target="_blank" class="btn">View</a>
            <a href="https://github.com/herokunt/react-graphql-prisma" target="_blank" class="btn ml-2">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Material UI">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-materialui" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="React.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-react" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Apollo Server/Client">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-apollo" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="GraphQL">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-graphql" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Prisma">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-prisma" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="MariaDB">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mariadb" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>
  </section>

  <section class="section__graphics">
    <h2 class="section__title transition">Graphics</h2>

    <article class="project">
      <div class="project__preview">
        <noscript class="project__preview--unavailable">Please enable JavaScript</noscript>
        <div id="lightbulb" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-lightbulb" id="stack-lightbulb">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-lightbulb">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">The Hanging Lightbulb</h3>
          <p class="project__description">
            One of my favorite sketches. It combines a <span class="highlight">2D physics engine</span> with a
            <span class="highlight">raycasting algorithm</span> to project shadows off of moving objects. Feel
            free to use your mouse to move the lightbulb around!
          </p>
          <footer class="project__footer">
            <button data-id="lightbulb" class="btn">Play</button>
            <a href="https://github.com/herokunt/javascript_ramblings/blob/main/2D/hanging_lightbulb.js" class="btn ml-2">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="p5.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-p5" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="matter.js">
            <svg aria-hidden="true" class="scale-3 ml-3">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-matterjs" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <noscript class="project__preview--unavailable">Please enable JavaScript</noscript>
        <div id="earth" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-earth" id="stack-earth">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-earth">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Earth</h3>
          <p class="project__description">
            A beautiful model of the <span class="highlight">Earth rotating in 3D</span> that
            reacts to the mouse movement to alter it's behavior.
          </p>
          <footer class="project__footer">
            <button data-id="earth" class="btn">Play</button>
            <a href="https://github.com/herokunt/javascript_ramblings/tree/main/3D" class="btn ml-2">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Three.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-threejs" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <noscript class="project__preview--unavailable">Please enable JavaScript</noscript>
        <div id="steering" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-particles" id="stack-particles">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-particles">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Steering Forces</h3>
          <p class="project__description">
            An <span class="highlight">interactive particle system</span> showcasing
            steering behaviors with attraction-repulsion forces. These particules
            don't like mouse pointers or cursors, <span class="highlight">try to catch them!</span>
          </p>
          <footer class="project__footer">
            <button data-id="steering" class="btn">Play</button>
            <a href="https://github.com/herokunt/javascript_ramblings/blob/main/2D/steering_behavior.js" class="btn ml-2">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="p5.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-p5" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>
  </section>

  <section class="section__scripting">
    <h2 class="section__title transition">Scripting</h2>

    <article class="project">
      <div class="project__preview">
        <video aria-label="A terminal window running a Python script" tabindex="-1" class="card__video" preload="none" muted loop src="<?php echo get_theme_file_uri('videos/passwords.mp4'); ?>"></video>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-node" id="stack-node">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-node">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">SCW Cloud Utility</h3>
          <p class="project__description">
            Wrapper bash script around the official Scaleway CLI. <span class="highlight">Manage your cloud instances</span> effectively, start up or tear down any number of servers <span class="highlight">within seconds</span>.
          </p>
          <footer class="project__footer">
            <a href="https://github.com/herokunt/shell_scripts/blob/master/scw_utils.sh" target="_blank" class="btn">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Bash">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-bash" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Scaleway CLI">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-scw" ?>"></use>
            </svg>
          </li>
        </ul>

      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <video aria-label="A terminal window running a Python script" tabindex="-1" class="card__video" preload="none" muted loop src="<?php echo get_theme_file_uri('videos/resizer.mp4'); ?>"></video>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-resizer" id="stack-resizer">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-resizer">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Image Batch Resizer</h3>
          <p class="project__description">
            Run this handy utility script to <span class="highlight">
            resize your image files</span> to different sizes. Choose between
            any of the <span class="highlight">multiple formats</span> available.
            It uses <span class="highlight">parallel processing</span> to work
            on hundreds of image files with ease.
          </p>
          <footer class="project__footer">
            <a href="https://github.com/herokunt/python-scripts/tree/main/batch_resizer" target="_blank" class="btn">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Python">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-python" ?>"></use>
            </svg>
          </li>
        </ul>

      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <video aria-label="A terminal window running a Python script" tabindex="-1" class="card__video" preload="none" muted loop src="<?php echo get_theme_file_uri('videos/passwords.mp4'); ?>"></video>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-password" id="stack-password">
        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-password">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Password Checker</h3>
          <p class="project__description">
            <span class="highlight">Verify your passwords</span> against the
            increasing threat of online data braches. It compares a
            <span class="highlight">computed hash</span> of your passwords to
            privately check the popular "Have I Been Pwned" website. It is
            <span class="highlight">compatible with CSV exports</span> from your password manager.
          </p>
          <footer class="project__footer">
            <a href="https://github.com/herokunt/python-scripts/blob/main/password_checker.py" target="_blank" class="btn">Code</a>
          </footer>
        </div>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Python">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-python" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>
    </article>
  </section>

  <section id="devops" class="section__devops">
    <h2 class="section__title transition">DevOps</h2>

    <article class="project">

      <div class="project__preview">
        <img
          class="project__preview--fullwidth"
          src="<?php echo get_theme_file_uri('images/ansible.png'); ?>"
          alt="Screenshot of a code editor showing an ansible playbook"
          loading="lazy"
        />
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-config-mgn" id="stack-config-mgn">

        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack"" tabindex="0" for="stack-config-mgn">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>

        <div class="project__content ml-1">
          <h3 class="project__title">Configuration Management</h3>
          <p class="project__description">
            <span class="highlight">Automated configuration</span> on cloud servers and desktop machines, including firewall rules, intrusion detection systems, private networks, monitoring, container clusters and more.
          </p>

          <footer class="project__footer">
            <a href="https://codeberg.org/unsafe-aluminum-gap/server-iac/src/branch/master/ansible" target="_blank" class="btn">Code</a>
          </footer>
        </div>

        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Ansible">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-ansible" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>

    </article>

    <article class="project">

      <div class="project__preview">
        <img
          class="project__preview--fullwidth"
          src="<?php echo get_theme_file_uri('images/docker.png'); ?>"
          alt="Screenshot of a code editor showing an ansible playbook"
          loading="lazy"
        />
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-containers" id="stack-containers">

        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack" tabindex="0" for="stack-containers">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>

        <div class="project__content ml-1">
          <h3 class="project__title">Containerization</h3>
          <p class="project__description">
            Modern workflow using container technologies to <span class="highlight">create predictable environments</span> locally, while testing and in <span class="highlight">orchestrated deployments</span>.
          </p>

          <footer class="project__footer">
            <a href="https://codeberg.org/unsafe-aluminum-gap/server-iac/src/branch/master/services/devontheroof/docker-compose.yml" target="_blank" class="btn">Code</a>
          </footer>
        </div>

        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Docker">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-docker" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>

    </article>
    
    <article class="project">

      <div class="project__preview">
        <img
          class="project__preview--fullwidth"
          src="<?php echo get_theme_file_uri('images/metrics.webp'); ?>"
          alt="Screenshot of a code editor showing an ansible playbook"
          loading="lazy"
        />
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-metrics" id="stack-metrics">

        <label class="project__label tooltip tooltip--left" data-tooltip="Tech stack" tabindex="0" for="stack-metrics">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>

        <div class="project__content ml-1">
          <h3 class="project__title">Monitoring</h3>
          <p class="project__description">
            Timeseries data collection, <span class="highlight">monitoring</span>, <span class="highlight">alerting</span> and <span class="highlight">visualization</span>.
          </p>

          <footer class="project__footer">
            <a href="https://codeberg.org/unsafe-aluminum-gap/server-iac/src/branch/master/services/metrics/docker-compose.yml" target="_blank" class="btn">Code</a>
          </footer>
        </div>

        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Telegraf">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-telegraf" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="InfluxDB">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-influxdb" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Grafana">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-grafana" ?>"></use>
            </svg>
          </li>
        </ul>
      </div>

    </article>

  </section>

  <?php get_footer(); ?>
