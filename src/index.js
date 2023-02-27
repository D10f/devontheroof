import { Highlighter } from "./modules/Highlighter";
import { SketchController } from "./modules/SketchController";
// import { SinglePostController } from "./modules/SinglePostController";
import { SearchController } from "./modules/SearchController";
import { TransitionEffect } from "./modules/TransitionEffect";
import { FloatingMenuController } from "./modules/FloatingMenuController";
// import { pulseAnimation } from "./modules/animations";
import { Masonry } from "./modules/masonry";
import { hasReducedMotion, isMobileDevice } from "./modules/utils";
// import { addThemeToggler } from './modules/themeToggler';
import { ThemeController } from "./modules/ThemeController";
// import { postIndexToggler } from "./modules/postIndexToggler";

import "/styles/index.scss";

function main() {
  // Don't load on mobile devices, or when reduced motion is enabled
  if (!isMobileDevice() && !hasReducedMotion()) {
    new TransitionEffect(".section__title");
  }

  // Load a different set  of scripts depending on the visited page
  if (window.location.pathname.startsWith("/blog")) {
    loadBlogScripts();
  } else if (window.location.pathname === "/") {
    loadMainScripts();
  } else {
    loadSinglePostScripts();
  }

  // Always load scripts that apply to all pages
  loadGlobalScripts();
}

function loadMainScripts() {
  new Highlighter(".highlight");
  new SketchController();
  // pulseAnimation(".animate-pulse");
}

async function loadBlogScripts() {
  new Masonry(".blog__post-list");
}

function loadSinglePostScripts() {
  // postIndexToggler();
  // new SearchController();
  // new SinglePostController();
  // pulseAnimation(".animate-pulse");
}

function loadGlobalScripts() {
  new SearchController();
  new ThemeController();
  new FloatingMenuController();
  // addThemeToggler();
}

main();
