import './styles.scss';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

const isNerdModeOn = location.pathname === '/nerd_mode.html';

function init() {
  if (isNerdModeOn) {
    return import('./scripts/NerdMode');
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
//
// if (!isMobileDevice) {
//   // Import p5js, matter.js and three.js sketch
//   Promise.all([
//     import('./scripts/CanvasController'),
//     import('./scripts/DOMController'),
//     // import('./scripts/NerdMode'),
//     // import('./scripts/prism')
//     // import('./scripts/3D')
//   ]).then(values => {
//     const CanvasController = values[0].default;
//     const DOMController = values[1].default;
//     // const NerdMode = values[2].default;
//     new DOMController(CanvasController);
//     // new NerdMode();
//     // const threeJsAnimation = values[2].default;
//     // threeJsAnimation();
//   })
//   .catch(console.error);
//
//   // Will replace images in scripting section for videos
//   import('./scripts/VideoLoader')
//     .then(m => new m.default())
//     .catch(console.error);
//
// } else {
//   // Imports the controller that handles a couple of DOM events only
//   import('./scripts/DOMController')
//     .then(DOMController => new DOMController.default(undefined, isMobileDevice))
//     .catch(console.error);
// }
