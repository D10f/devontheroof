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
    <p>Categories:</p>
    <menu class="sidebar__menu">
        <?php
        foreach ($categories as $category) { ?>
        <li class="sidebar__item">
            <a class="sidebar__link sidebar__link--icon" href="/category/<?= $category->name ?>">
                <svg>
                    <use xlink:href="<?= $theme_uri . "#icon-" . $category->name ?>" />
                </svg>
                <?= $category->name ?> (<?= $category->category_count ?>)
            </a>
        </li>
        <?php } ?>
    </menu>
</aside>
