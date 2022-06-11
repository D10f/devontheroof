<form class="search">
  <div class="search__control">
    <input
      class="search__input"
      id="search__input"
      placeholder="What are you looking for?"
    />
    <label
      class="search__label"
      for="search__input"
      aria-label="search input for blog posts"
    >
      <div class="search__icon sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
      <svg class="search__icon" aria-hidden="true">
        <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-magnifying-glass' ?>"></use>
      </svg>
    </label>
  </div>
  <div class="search__output" for="search__input">
    <ul class="search__results"></ul>
  </div>
</form>
