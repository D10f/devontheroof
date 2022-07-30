import { Highlighter } from "./modules/Highlighter";
import { SketchController } from "./modules/SketchController";
import { SinglePostController } from "./modules/SinglePostController";
import { SearchController } from "./modules/SearchController";
import { TransitionEffect } from "./modules/TransitionEffect";
// import { pulseAnimation } from "./modules/animations";
import { Masonry } from "./modules/masonry";
import { hasReducedMotion, isMobileDevice } from "./modules/utils";
import { addThemeToggler } from './modules/themeToggler';

import "/styles/index.scss";

function main() {
  loadGlobalScripts();

  // Don't load on mobile devices, or when reduced motion is enabled
  if (!isMobileDevice() && !hasReducedMotion()) {
    new TransitionEffect(".section__title");
  }

  if (window.location.pathname.startsWith("/blog")) {
    return loadBlogScripts();
  }

  if (window.location.pathname === "/") {
    return loadMainScripts();
  }

  loadSinglePostScripts();
}

function loadMainScripts() {
  new Highlighter(".highlight");
  new SketchController();
  // pulseAnimation(".animate-pulse");
}

async function loadBlogScripts() {
  new Masonry(".blog");
}

function loadSinglePostScripts() {
  // new SearchController();
  new SinglePostController();
  // pulseAnimation(".animate-pulse");
}

function loadGlobalScripts() {
  new SearchController();
  addThemeToggler();
}

main();
