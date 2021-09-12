import './styles.scss';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

const isNerdModeOn = location.pathname === '/nerd_mode.html';

function init() {
  if (isNerdModeOn) {
    return import('./scripts/prism');
  }

  if (isMobileDevice) {
    return import('./scripts/DOMController')
      .then(DOMController => new DOMController.default(undefined, isMobileDevice))
      .catch(console.error);
  }

  Promise.all([
    import('./scripts/CanvasController'),
    import('./scripts/DOMController'),
    import('./scripts/VideoLoader')
  ]).then(scripts => {
    const [ CanvasController, DOMController, VideoLoader ] = scripts;
    new DOMController.default(CanvasController.default);
    new VideoLoader.default();
  })
  .catch(console.error);
}

init();
