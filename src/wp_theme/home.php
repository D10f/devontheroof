<?php get_header(); ?>

<body>
  <header id="about" class="section__header">
    <h1 class="section__title section__header--title">Developer Sojourn</h1>
    <div class="section__header-intro">
      <h2>Lorem Ipsum Is Great</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim illum
        est impedit laboriosam dolorem, commodi aliquam quam quis a reiciendis
        beatae, dolor corporis rerum cupiditate consequuntur? Cupiditate
        reiciendis dolores perspiciatis!
      </p>
      <div>
        <a href="#webapps" class="btn mt-1">Take A Look Around</a>
        <a href="#contact" class="btn ml-2">Contact Me</a>
      </div>
    </div>

    <div class="section__header-blog">
      <ul class="blog-list">
        <?php
          $latestPosts = new WP_Query(array(
            'post_type' => 'post',
            'posts_per_page' => 6
          ));

          while($latestPosts->have_posts()) {
            $latestPosts->the_post();
            $categories = get_the_category();
            $post_category = '';
            if ( ! empty( $categories ) ) {
              $post_category = $post_category . esc_html( $categories[0]->name );
            }
          ?>
          
            <li class="<?php echo 'blog-item blog-item--' . $post_category ?>">
              <a class="blog-link" href="<?php the_permalink(); ?>">
                <span class="blog-link--text"><?php the_title(); ?> </span>
              </a>
              <svg aria-hidden="true">
                <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-' .$post_category ?>"></use>
              </svg>
            </li>
          <?php } wp_reset_postdata();
        ?>
      </ul>
    </div>
  </header>

  <section id="webapps" class="section__webapps">
    <h2 class="section__title">Web Applications</h2>

    <article class="project">
      <div class="project__preview">
        <img
          src="<?php echo get_theme_file_uri('images/bytesandpipes.webp'); ?>"
          alt="Screenshot of a website called bytes and pipes"
          loading="lazy"
        />
      </div>
      <div class="project__description">
        <h3 class="project__title">Bytes And Pipes</h3>
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
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-express" ?>"
              ></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="MongoDB">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mongo" ?>"></use>
            </svg>
          </li>
        </ul>
        <p>
          A file-sharing web application that protects your privacy using
          AES-256 bit encryption. Upload files of up to 1GB and share them
          easily with a link. Is that simple!
        </p>
        <a href="https://bytesandpipes.com" target="_blank" class="btn mt-2"
          >Visit Page</a
        >
        <a
          href="https://github.com/herokunt/bytes-and-pipes"
          target="_blank"
          class="btn ml-2"
          >Source Code</a
        >
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <img
          src="<?php echo get_theme_file_uri('images/budget.webp'); ?>"
          alt="Screenshot of a website called bytes and pipes"
          loading="lazy"
        />
      </div>

      <div class="project__description">
        <h3 class="project__title">Gadget Budget</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="TypeScript">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-ts" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Styled Components">
            <svg aria-hidden="true">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-styled" ?>-components"
              ></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="React.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-react" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Redux Saga">
            <svg aria-hidden="true">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-redux" ?>-saga"
              ></use>
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
        <p>
          Expense management with support for multiple wallets and currencies.
          Keep track of daily expenses, during holidays, business trips, etc.
          Did I mention it uses AES-256 bit encryption?
        </p>
        <a href="https://pawnsguard.com" target="_blank" class="btn mt-2"
          >Visit Page</a
        >
        <a
          href="https://github.com/herokunt/gadget-budget"
          target="_blank"
          class="btn ml-2"
          >Source Code</a
        >
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <img
          src="<?php echo get_theme_file_uri('images/nomads.webp'); ?>"
          alt="Screenshot of a website called bytes and pipes"
          loading="lazy"
        />
      </div>

      <div class="project__description">
        <h3 class="project__title">Prismic Adventures</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Material UI">
            <svg aria-hidden="true">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-materialui" ?>"
              ></use>
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
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-graphql" ?>"
              ></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="Prisma">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-prisma" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="MariaDB">
            <svg aria-hidden="true">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-mariadb" ?>"
              ></use>
            </svg>
          </li>
        </ul>
        <p>
          A mini-social network to share pictures of your trips around the
          world. Follow your friends to see their feeds, like and comment on
          their publications and keep on living the adventure!
        </p>
        <a
          href="https://prismicadventures.xyz"
          target="_blank"
          class="btn mt-2"
          >Visit Page</a
        >
        <a
          href="https://github.com/herokunt/react-graphql-prisma"
          target="_blank"
          class="btn ml-2"
          >Source Code</a
        >
      </div>
    </article>
  </section>

  <section class="section__scripting">
    <h2 class="section__title">Scripting</h2>

    <article class="project">
      <div class="project__preview">
        <video
          aria-label="A terminal window running a Python script"
          tabindex="-1"
          class="card__video"
          preload="none"
          muted
          loop
          src="<?php echo get_theme_file_uri('videos/resizer.mp4'); ?>"
        ></video>
      </div>

      <div class="project__description">
        <h3 class="project__title">Image Batch Resizer</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Python">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-python" ?>"></use>
            </svg>
          </li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          quidem, eveniet nam expedita voluptatem aspernatur illum labore?
          Odit commodi rerum voluptates blanditiis quam, tempore rem!
        </p>
        <a
          href="https://github.com/herokunt/python-scripts/blob/main/batch-resizer.py"
          target="_blank"
          class="btn mt-2"
          >Source Code</a
        >
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <video
          aria-label="A terminal window running a Python script"
          tabindex="-1"
          class="card__video"
          preload="none"
          muted
          loop
          src="<?php echo get_theme_file_uri('videos/passwords.mp4'); ?>"
        ></video>
      </div>

      <div class="project__description">
        <h3 class="project__title">Password Checker</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Python">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-python" ?>"></use>
            </svg>
          </li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          quidem, eveniet nam expedita voluptatem aspernatur illum labore?
          Odit commodi rerum voluptates blanditiis quam, tempore rem!
        </p>
        <a
          href="https://github.com/herokunt/python-scripts/blob/main/password_checker.py"
          target="_blank"
          class="btn mt-2"
          >Source Code</a
        >
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <video
          aria-label="A terminal window running a Python script"
          tabindex="-1"
          class="card__video"
          preload="none"
          muted
          loop
          src="<?php echo get_theme_file_uri('videos/passwords.mp4'); ?>"
        ></video>
      </div>

      <div class="project__description">
        <h3 class="project__title">Oh, Node!</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Python">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-python" ?>"></use>
            </svg>
          </li>
        </ul>
        <p>
          Aren't you curious how many files does your
          <code>node_modules</code> folder have? How much does it weight? Run
          this script to find out. Fun fact, this site is using 13179 files,
          199.95MB in total!
        </p>
        <a
          href="https://github.com/herokunt/python-scripts/blob/main/oh_node.py"
          target="_blank"
          class="btn mt-2"
          >Source Code</a
        >
      </div>
    </article>
  </section>

  <section class="section__graphics">
    <h2 class="section__title">Games & Graphics</h2>

    <article class="project">
      <div class="project__preview">
        <div id="lightbulb" class="project__canvas"></div>
      </div>

      <div class="project__description">
        <h3 class="project__title">The Hanging Lightbulb</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="p5.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-p5" ?>"></use>
            </svg>
          </li>
          <li class="tooltip" data-tooltip="matter.js">
            <svg aria-hidden="true" class="scale-3 ml-3">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-matterjs" ?>"
              ></use>
            </svg>
          </li>
        </ul>
        <p>
          One of my favorite sketches. It combines a 2D physics engine with a
          raycasting algorithm to project shadows off of moving objects. Feel
          free to use your mouse to move the lightbulb around!
        </p>
        <button id="lightbulb" class="btn mt-2">Play</button>
        <a href="#" class="btn ml-2">Source Code</a>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <div id="earth" class="project__canvas"></div>
      </div>

      <div class="project__description">
        <h3 class="project__title">Earth</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="Three.js">
            <svg aria-hidden="true">
              <use
                xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-threejs" ?>"
              ></use>
            </svg>
          </li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          quidem, eveniet nam expedita voluptatem aspernatur illum labore?
          Odit commodi rerum voluptates blanditiis quam, tempore rem!
        </p>
        <button id="earth" class="btn mt-2">Play</button>
        <a href="#" class="btn ml-2">Source Code</a>
      </div>
    </article>

    <article class="project">
      <div class="project__preview">
        <div id="steering" class="project__canvas"></div>
      </div>

      <div class="project__description">
        <h3 class="project__title">Particle Steering Forces</h3>
        <ul class="project__stack">
          <li class="tooltip" data-tooltip="p5.js">
            <svg aria-hidden="true">
              <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . "#icon-p5" ?>"></use>
            </svg>
          </li>
        </ul>
        <p>
          A particle system simulating attraction-repulsion forces. These
          particules don't like mouse pointers or cursors, try to catch them!
        </p>
        <button id="steering" class="btn mt-2">Play</button>
        <a href="#" class="btn ml-2">Source Code</a>
      </div>
    </article>
  </section>

<?php get_footer(); ?>