import './styles.scss';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

if (!isMobileDevice) {
  // Import p5js, matter.js and three.js sketch
  Promise.all([
    import('./scripts/CanvasController'),
    import('./scripts/DOMController'),
    import('./scripts/3D')
  ]).then(values => {
    const CanvasController = values[0].default;
    const DOMController = values[1].default;
    const threeJsAnimation = values[2].default;

    new DOMController(CanvasController);
    threeJsAnimation();
  })
  .catch(console.error);

  // Will replace images in scripting section for videos
  import('./scripts/VideoLoader')
    .then(m => new m.default())
    .catch(console.error);

} else {
  // Imports the controller that handles a couple of DOM events only
  import('./scripts/DOMController')
    .then(DOMController => new DOMController.default(undefined, isMobileDevice))
    .catch(console.error);
}
