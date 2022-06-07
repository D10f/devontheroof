<?php

/**
 * Produces a new section of projects categorized by it's project type
 */
function render_project($project_section, $projects) {

  // If there are no projects to render do nothing
  if ( count($projects) == 0 ) {
    return;
  }

  // Converts human-friendly title to CSS-friendly class names and id
  $section_title = str_replace(' ', '-', strtolower($project_section));

?>

  <section
    id="<?= $section_title ?>"
    class="<?= "section section__{$section_title}" ?>"
  >
    <header class="section__title"><?= $project_section  ?></header>

    <?php
    foreach($projects as $project) { ?>
      <article
        class="project"
        <?php if ($project['sketch']) { ?>
        data-sketch="<?= $project['sketch'] ?>"
        <?php } ?>
      >
        <div class="project__preview">
          <?php
          if ($project['project_type'] == 'graphics') { ?>

            <noscript class="project__preview--unavailable">Please enable JavaScript</noscript>
            <div id="<?= $project['sketch'] ?>" class="project__canvas"></div>

          <?php } else {

            echo get_the_post_thumbnail($project['id']);
          } ?>

        </div>

        <div class="project__info">
          <input
            class="project__checkbox"
            type="checkbox"
            id="<?= $project['name'] ?>"
          >

          <label
            class="project__label tooltip tooltip--left"
            data-tooltip="Tech stack"
            tabindex="0"
            for="<?= $project['name'] ?>"
          >
            <svg aria-hidden="true">
              <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-tools" ?>" />
            </svg>
          </label>

          <div class="project__content ml-1">
            <h3 class="project__title transition"><?= $project['name'] ?></h2>

            <?= $project['content'] ?>

            <footer class="project__footer">
              <?php if ($project['project_link']) { ?>
                <a class="btn" href="<?= $project['project_link'] ?>" target="_blank" rel="noreferrer">View</a>
              <?php } else if ( $project['project_type'] == 'webapp' AND ! $project['project_link'] ) { ?>
                <span class="tooltip tooltip--top-right" data-tooltip="Down for maintainance">
                  <button class="btn" disabled>View</button>
                </span>
              <?php } ?>
              
              <?php if ($project['repo_link']) { ?>
                <a class="btn" href="<?= $project['repo_link'] ?>" target="_blank" rel="noreferrer">Code</a>
              <?php } ?>
            </footer>

          </div>

          <ul class="project__stack">
            <?php foreach($project['tech_stack'] as $tech) { ?>
              <li class="tooltip tooltip--bottom" data-tooltip="<?= $tech['label']  ?>">
                <svg aria-hidden="true">
                  <use xlink:href="<?= get_theme_file_uri('assets/images/sprite.svg') . "#icon-{$tech['value']}" ?>"></use>
                </svg>
              </li>
            <?php } ?>
          </ul>
        </div>
      </article>

    <?php } ?>
  </section>

<?php } ?>
