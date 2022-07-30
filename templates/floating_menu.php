<aside class="floating-menu">
  <ul class="floating-menu__menu">

    <li class="floating-menu__item">
      <a class="floating-menu__button" href="#">
        &uarr;
      </a>
    </li>

    <li class="floating-menu__item">
      <input type="checkbox" id="search-box" />

      <label tabindex="0" class="floating-menu__button" for="search-box">
        <svg>
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-search' ?>"></use>
        </svg>

        <svg>
          <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-x' ?>"></use>
        </svg>
      </label>

      <!-- Include the actual modal displayed to perform the search -->
      <?php get_template_part('templates/searchbar'); ?>
    </li>

    <!-- INSTERTED DYNAMICALLY WITH JS -->
    <!-- <li class="floating-menu__item">
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
    -->
  </ul>
</aside>
