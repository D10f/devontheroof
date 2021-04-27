import './styles.scss';

import CanvasController from './scripts/CanvasController';
import VideoLoader from './scripts/VideoLoader';
import Scroller from './scripts/Scroller';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

new CanvasController(isMobileDevice);
new Scroller(isMobileDevice);
new VideoLoader(isMobileDevice);
