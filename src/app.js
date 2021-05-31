import './styles.scss';

import BannerController from './scripts/BannerController';
import CanvasController from './scripts/CanvasController';
import VideoLoader from './scripts/VideoLoader';
import NavbarController from './scripts/NavbarController';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

if (isMobileDevice) {
  let sketch = new CanvasController();
  setTimeout(() => {
    sketch.current.stopLoop();
    sketch = sketch.current.destroy();
  }, 100);
} else {
  new CanvasController();
  new BannerController();
  new NavbarController();
}

new VideoLoader(isMobileDevice);
