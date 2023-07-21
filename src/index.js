import RaycastingSketch from './sketches/Raycasting.ts';
import PathfindingSketch from './sketches/Pathfinding.ts';
import CodeBlocksController from './modules/CodeBlocksController';
import { Highlighter } from "./modules/Highlighter";
import { SearchController } from "./modules/SearchController";
import { TransitionEffect } from "./modules/TransitionEffect";
import { FloatingMenuController } from "./modules/FloatingMenuController";
import { Masonry } from "./modules/masonry";
import { ThemeController } from "./modules/ThemeController";
import { hasReducedMotion, isMobileDevice } from "./modules/utils";

import "/styles/index.scss";

// Do not load on mobile devices or when reduced motion is enabled
if (!isMobileDevice() && !hasReducedMotion()) {
  new TransitionEffect('.section__title');
}

// Apply Masonry on post listing pages eg., blog, category, archives, etc.
if (location.pathname.match(/^\/(blog|category)/)) {
  new Masonry('.blog__post-list');
} else if (location.pathname.match(/^\/[\w-]+/)) {
  document.addEventListener('DOMContentLoaded', CodeBlocksController, { once: true });
}

if (location.pathname === '/') {
  new Highlighter(".highlight");
  new RaycastingSketch();
  new PathfindingSketch();
}

new SearchController();
new ThemeController();
new FloatingMenuController();
