<?php get_header(); ?>

<body>
  <header id="about" class="section__header">
    <section class="section__header-intro">
      <h1 class="section__title section__header--title">Lorem Ipsum Is Great</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim illum
        est impedit laboriosam dolorem, commodi aliquam quam quis a reiciendis
        beatae, dolor corporis rerum cupiditate consequuntur? Cupiditate
        reiciendis dolores perspiciatis!
      </p>
      <div>
        <a class="section__header-scroll" href="#webapps">&darr;</a>
      </div>
    </section>

    <section class="section__header-blog">
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
    <h2 class="section__title">Web Applications</h2>

    <article class="project">
      <div class="project__preview">
        <img src="<?php echo get_theme_file_uri('images/bytesandpipes.webp'); ?>" alt="Screenshot of a website called bytes and pipes" loading="lazy" />
      </div>
      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-bytes" id="stack-bytes">
        <label class="project__label" tabindex="0" for="stack-bytes">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Bytes And Pipes</h3>
          <p class="project__description">
            A <span class="highlight">file-sharing</span> web application that protects your privacy using
            <span class="highlight">AES-256 bit encryption</span>. Upload files of up to 1GB and share them
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
          <li class="tooltip" data-tooltip="Docker">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-docker" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Jenkins">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-jenkins" ?>"></use>
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
        <label class="project__label" tabindex="0" for="stack-gadget">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Gadget Budget</h3>
          <p class="project__description">
            <span class="highlight">Expense management</span> with support for multiple wallets and currencies.
            Keep track of daily expenses, during holidays, business trips, etc.
            Did I mention it uses <span class="highlight">AES-256 bit encryption?</span>
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
          <li class="tooltip" data-tooltip="Docker">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-docker" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Jenkins">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-jenkins" ?>"></use>
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
        <label class="project__label" tabindex="0" for="stack-prismic">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Prismic Adventures</h3>
          <p class="project__description">
            A <span class="highlight">social network</span> to share pictures of your trips around the
            world. Follow your friends to see their feeds, <span class="highlight">like and comment</span> on
            their publications and keep on living the adventure!
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

  <section class="section__scripting">
    <h2 class="section__title">Scripting</h2>

    <article class="project">
      <div class="project__preview">
        <video aria-label="A terminal window running a Python script" tabindex="-1" class="card__video" preload="none" muted loop src="<?php echo get_theme_file_uri('videos/resizer.mp4'); ?>"></video>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-resizer" id="stack-resizer">
        <label class="project__label" tabindex="0" for="stack-resizer">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Image Batch Resizer</h3>
          <p class="project__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            quidem, eveniet nam expedita voluptatem aspernatur illum labore?
            Odit commodi rerum voluptates blanditiis quam, tempore rem!
          </p>
          <footer class="project__footer">
            <a href="https://github.com/herokunt/python-scripts/blob/main/batch-resizer.py" target="_blank" class="btn">Code</a>
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
        <label class="project__label" tabindex="0" for="stack-password">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Password Checker</h3>
          <p class="project__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            quidem, eveniet nam expedita voluptatem aspernatur illum labore?
            Odit commodi rerum voluptates blanditiis quam, tempore rem!
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

    <article class="project">
      <div class="project__preview">
        <video aria-label="A terminal window running a Python script" tabindex="-1" class="card__video" preload="none" muted loop src="<?php echo get_theme_file_uri('videos/passwords.mp4'); ?>"></video>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-node" id="stack-node">
        <label class="project__label" tabindex="0" for="stack-node">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Oh, Node!</h3>
          <p class="project__description">
            Aren't you curious how many files does your node_modules folder have? How much does it weight? Run
            this script to find out. Fun fact, <span class="highlight">this site is using 13239 files,
            200.78MB in total!</span>
          </p>
          <footer class="project__footer">
            <a href="https://github.com/herokunt/python-scripts/blob/main/oh_node.py" target="_blank" class="btn">Code</a>
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

  <section class="section__graphics">
    <h2 class="section__title">Games & Graphics</h2>

    <article class="project">
      <div class="project__preview">
        <div id="lightbulb" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-lightbulb" id="stack-lightbulb">
        <label class="project__label" tabindex="0" for="stack-lightbulb">
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
            <a href="#" class="btn ml-2">Code</a>
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
        <div id="earth" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-earth" id="stack-earth">
        <label class="project__label" tabindex="0" for="stack-earth">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Earth</h3>
          <p class="project__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            quidem, eveniet nam expedita voluptatem aspernatur illum labore?
            Odit commodi rerum voluptates blanditiis quam, tempore rem!
          </p>
          <footer class="project__footer">
            <button data-id="earth" class="btn">Play</button>
            <a href="#" class="btn ml-2">Code</a>
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
        <div id="steering" class="project__canvas"></div>
      </div>

      <div class="project__info">
        <input class="project__checkbox" type="checkbox" name="stack-particles" id="stack-particles">
        <label class="project__label" tabindex="0" for="stack-particles">
          <svg aria-hidden="true">
            <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-tools" ?>"></use>
          </svg>
        </label>
        <div class="project__content ml-1">
          <h3 class="project__title">Particle Steering Forces</h3>
          <p class="project__description">
            A particle system simulating <span class="highlight">attraction-repulsion forces</span>. These
            particules don't like mouse pointers or cursors, <span class="highlight">try to catch them!</span>
          </p>
          <footer class="project__footer">
            <button data-id="steering" class="btn">Play</button>
            <a href="#" class="btn ml-2">Code</a>
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

  <?php get_footer(); ?>