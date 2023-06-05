import { Highlighter } from "./modules/Highlighter";
import { SketchController } from "./modules/SketchController";
import { SearchController } from "./modules/SearchController";
import { TransitionEffect } from "./modules/TransitionEffect";
import { FloatingMenuController } from "./modules/FloatingMenuController";
import { Masonry } from "./modules/masonry";
import { ThemeController } from "./modules/ThemeController";
import { hasReducedMotion, isMobileDevice } from "./modules/utils";

import "/styles/index.scss";

// Do not load on mobile devices of when reduced motion is enabled
if (!isMobileDevice() && !hasReducedMotion()) {
  new TransitionEffect('.section__title');
}

if (location.pathname.startsWith('/blog')) {
  new Masonry('.blog__post-list');
}

if (location.pathname === '/') {
  new Highlighter(".highlight");
  new SketchController();
}

new SearchController();
new ThemeController();
new FloatingMenuController();
