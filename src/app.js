import './styles.scss';

const isMobileDevice = navigator.userAgent.match(
  /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
);

if (!isMobileDevice) {
  // Import both p5.js and matter.js
  Promise.all([
    import('./scripts/CanvasController'),
    import('./scripts/DOMController')
  ]).then(values => {
    const CanvasController = values[0].default;
    const DOMController = values[1].default;
    new DOMController(CanvasController);
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
