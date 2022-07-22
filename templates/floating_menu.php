<aside class="floating-menu">
  <ul class="floating-menu__menu">
    <li class="floating-menu__item">
      <a href="#">
        &uarr;
      </a>
    </li>

    <li class="floating-menu__item">
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
