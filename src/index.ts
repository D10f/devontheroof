import { SearchController } from "./scripts/SearchController";
import { SinglePostController } from "./scripts/SinglePostController";
import { SectionTitleTransitioner } from "./scripts/SectionTitleTransitioner";
import { SketchController } from "./scripts/SketchController";
import { VideoController } from "./scripts/VideoController";
import "./styles.scss";

// const BLOG_REGEXP = new RegExp(/\/blog(\/)?/i);
const POST_REGEXP = new RegExp(/^\/\w+/i);

function main() {
  // if (BLOG_REGEXP.test(window.location.pathname)) {
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
  const isNotReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isNotMobileDevice = !navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
  );

  // Don't load on mobile devices or with reduced motion enabled
  if (isNotMobileDevice && isNotReducedMotion) {
    new SectionTitleTransitioner();
  }
  
  new SketchController();
  new VideoController();
}

function loadBlogJS() {
  new SearchController();
}

function loadSinglePostJS() {
  new SearchController();
  new SinglePostController();
  // @ts-ignore
  import('./scripts/prism.js');
}

main();
