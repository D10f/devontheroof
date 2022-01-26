<form class="search">
  <div class="search__control">
    <input
      class="search__input"
      id="search__input"
    />
    <label
      class="search__label"
      for="search__input"
      aria-label="search input for blog posts"
    >
      <svg aria-hidden="true">
        <use xlink:href="<?php echo get_theme_file_uri('images/sprite.svg') . '#icon-magnifying-glass' ?>"></use>
      </svg>
    </label>
  </div>
  <div class="search__output" for="search__input">
    <ul class="search__results"></ul>
  </div>
</form>
<!-- <aside>
</aside> -->