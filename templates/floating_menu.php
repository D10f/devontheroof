<aside class="site-options">
  <ul class="site-options__menu">
    <li class="site-options__item">
      <a href="#">
        &uarr;
      </a>
    </li>

    <li class="site-options__item">
      <input type="checkbox" id="theme-switcher" />
      <label for="theme-switcher">
        <svg>
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-moon" ?>" />
        </svg>
        <svg>
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-sun" ?>" />
        </svg>
      </label>
    </li>
  </ul>
</aside>
