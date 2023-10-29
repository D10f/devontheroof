<?php

$categories = get_categories();
$theme_uri = get_theme_file_uri('assets/images/sprite.svg');
?>

<aside class="sidebar">
    <a class="sidebar__link sidebar__link--icon" href="/">
        <svg>
            <use xlink:href="<?= $theme_uri . "#icon-arrow-left" ?>"/>
        </svg>
        Back to main
    </a>

    <input type="checkbox" id="sidebar__checkbox" />

    <button class="sidebar__button show-on-tablet" aria-label="Toggle table of contents">
        <label tabindex="0" for="sidebar__checkbox">
            <svg>
                <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-hamburger' ?>"></use>
            </svg>

            <svg>
                <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . '#icon-x' ?>"></use>
            </svg>
        </label>
    </button>

    <menu class="sidebar__menu">

        <p>Categories:</p>

        <?php foreach ($categories as $category) {
            $is_active = is_category($category->name);
        ?>

        <li class="sidebar__item">
            <a
                class="sidebar__link sidebar__link--icon <?php echo $is_active ? 'sidebar__link--active' : ''; ?>"
                href='<?php echo $is_active ? '/blog' : "/category/$category->name" ?>'
            >
                <svg>
                    <use xlink:href="<?= $theme_uri . "#icon-" . $category->name ?>" />
                </svg>
                <?= $category->name ?> (<?= $category->category_count ?>)
                <?php echo $is_active ? '<span>&times;</span>' : '' ?>
            </a>
        </li>

        <?php } ?>
    </menu>
</aside>
