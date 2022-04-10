<footer id="contact" class="section__footer">
  <h2 class="section__title transition">Thanks for visiting!</h2>
  <p>
    If you'd like to know more about me or this site please don't hesitate
    to contact me and visit my GitHub page.
  </p>
  <ul class="section__footer-icons">
    <li class="tooltip" data-tooltip="GitHub">
      <a
        href="https://github.com/herokunt"
        target="_blank"
        aria-label="external link to a github profile"
      >
        <svg aria-hidden="true">
          <use
            xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-github-light' ?>"
          ></use>
        </svg>
      </a>
    </li>

    <li class="tooltip" data-tooltip="devsojourn@pm.me">
      <a
        href="mailto:devsojourn@pm.me"
        target="_blank"
        aria-label="link to send an email"
      >
        <svg aria-hidden="true">
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-envelope' ?>"></use>
        </svg>
      </a>
    </li>

    <li class="tooltip" data-tooltip="PGP">
      <a
        href="<?= get_theme_file_uri('assets/publickey.devsojourn@pm.me.asc'); ?>"
        download
        aria-label="downloads a pgp public key file"
      >
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