import { Highlighter } from "./modules/Highlighter";
import { SketchController } from "./modules/SketchController";
import { SinglePostController } from "./modules/SinglePostController";
import { SearchController } from "./modules/SearchController";
import { TransitionEffect } from "./modules/TransitionEffect";
import { pulseAnimation } from "./modules/animations";
import { hasReducedMotion, isMobileDevice } from "./modules/utils";

import "/styles/index.scss";

function main() {
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
  pulseAnimation(".animate-pulse");
}

async function loadBlogScripts() {
  new SearchController();
}

function loadSinglePostScripts() {
  new SearchController();
  new SinglePostController();
  pulseAnimation(".animate-pulse");
}

main();
