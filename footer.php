<?php get_template_part('templates/floating_menu'); ?>

<footer id="contact" class="section__footer">
  <h2 class="section__title transition">Thanks for visiting!</h2>
  <p>
    Please don't hesitate to contact me if you'd like to talk more.
    You can follow my work by visiting my GitHub and Codeberg pages.
  </p>
  <ul class="section__footer-icons">
    <li class="tooltip" data-tooltip="GitHub">
      <a href="https://github.com/D10f" target="_blank" rel="noreferrer" aria-label="external link to a github profile">
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-github-light' ?>"></use>
        </svg>
      </a>
    </li>

    <li class="tooltip" data-tooltip="Codeberg">
      <a href="https://codeberg.org/D10f" target="_blank" rel="noreferrer" aria-label="external link to a github profile">
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-codeberg' ?>"></use>
        </svg>
      </a>
    </li>

    <li class="tooltip" data-tooltip="devsojourn@pm.me">
      <a href="mailto:devsojourn@pm.me" target="_blank" aria-label="link to send an email">
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-envelope' ?>"></use>
        </svg>
      </a>
    </li>

    <li class="tooltip" data-tooltip="PGP">
      <a href="<?= get_theme_file_uri('assets/publickey.devsojourn@pm.me.asc'); ?>" download aria-label="downloads a pgp public key file">
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-key1' ?>"></use>
        </svg>
      </a>
    </li>
  </ul>
</footer>

<?php wp_footer(); ?>
</body>

</html>
