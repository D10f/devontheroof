import { SearchController } from "./scripts/SearchController";
import { SinglePostController } from "./scripts/SinglePostController";
import { SectionTitleTransitioner } from "./scripts/SectionTitleTransitioner";
import { SketchController } from "./scripts/SketchController";
import { VideoController } from "./scripts/VideoController";
import { ProjectController } from "./scripts/ProjectController";

// @ts-ignore
import Masonry from 'masonry-layout';

import "./styles.scss";

const POST_REGEXP = new RegExp(/^\/\w+/i);

function main() {
  if (
    window.location.pathname === "/blog" ||
    window.location.pathname === "/blog/"
  ) {
    return loadBlogJS();
  }

  if (POST_REGEXP.test(window.location.pathname)) {
    return loadSinglePostJS();
  }

  return loadMainJS();
}

function loadMainJS() {
  const hasReducedMotionEnabled = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobileDevice = navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
  );

  // Don't load on mobile devices, or with reduced motion enabled
  if (!isMobileDevice || !hasReducedMotionEnabled) {
    new SectionTitleTransitioner();
  }

  new ProjectController();
  new SketchController();
  new VideoController();
}

function loadBlogJS() {
  new SearchController();
  const grid = document.querySelector('.blog__categories');

  const test = new Masonry(grid, {
    itemSelector: '.blog__list',
    columnWidth: 26,
    gutter: 3
  });

  console.log(test);
}

function loadSinglePostJS() {
  new SearchController();
  new SinglePostController();
  // @ts-ignore
  import("./scripts/prism.js"); // syntax highlighter
}

main();
