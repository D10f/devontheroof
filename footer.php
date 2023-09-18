<?php get_template_part('templates/floating_menu'); ?>

<footer id="contact" class="section__footer">
  <h2 class="section__title mb-2 is-centered transition">Thanks for visiting!</h2>
  <div class="section__footer-content">
    <p>
      Please don't hesitate to contact me if you'd like to talk more.
      You can checkout the rest my work by visiting my GitHub and Codeberg pages.
    </p>
    <ul class="section__footer-icons">
      <li class="tooltip tooltip--top" data-tooltip="GitHub">
        <a href="https://github.com/D10f" target="_blank" rel="noreferrer" aria-label="external link to a github profile">
          <svg aria-hidden="true">
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-github-light' ?>"></use>
          </svg>
        </a>
      </li>

      <li class="tooltip tooltip--top" data-tooltip="Codeberg">
        <a href="https://codeberg.org/D10f" target="_blank" rel="noreferrer" aria-label="external link to a github profile">
          <svg aria-hidden="true">
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-codeberg' ?>"></use>
          </svg>
        </a>
      </li>

      <li class="tooltip tooltip--top" data-tooltip="devsojourn@pm.me">
        <a href="mailto:devsojourn@pm.me" target="_blank" aria-label="link to send an email">
          <svg aria-hidden="true">
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-envelope' ?>"></use>
          </svg>
        </a>
      </li>

      <li class="tooltip tooltip--top" data-tooltip="PGP">
        <a href="<?= get_theme_file_uri('assets/publickey.devsojourn@pm.me.asc'); ?>" download aria-label="downloads a pgp public key file">
          <svg aria-hidden="true">
            <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-key1' ?>"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</footer>

<?php wp_footer(); ?>

</body>

</html>
