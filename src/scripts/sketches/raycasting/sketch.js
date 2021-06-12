import p5 from 'p5';
import Grid from './Grid';
import Player from './Player';
import Camera from './Camera';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

let player, grid, cam;

export default p => {

  let canvasDOM;
  let timer;

  p.stopLoop = () => {
    p.noLoop();
  };

  p.resumeLoop = () => {
    p.loop();
  };

  p.destroy = () => {
    p.stopLoop();
    p.noCanvas();
    return null;
  };

  p.windowResized = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      p.resizeCanvas(400, 400);
      // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);
      p.draw();
    }, 100);
  };

  p.setup = () => {
    const canvas = p.createCanvas(100, 100);
    canvasDOM = canvas.parent();
    p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    p.stroke(50);
    grid = new Grid(p);
    player = new Player(p);
    cam = new Camera(p, player);
  };

  p.draw = () => {
    p.background(220);
    cam.project();
    cam.createView();
    // cam.rays.forEach(r => r.render());

    player.update();
    player.render();

    grid.render();
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        player.walkDirection = 1;
        break;
      case p.DOWN_ARROW:
        player.walkDirection = -1;
        break;
      case p.LEFT_ARROW:
        player.turnDirection = -1;
        break;
      case p.RIGHT_ARROW:
        player.turnDirection = 1;
        break;
    }
  }

  p.keyReleased = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
      case p.DOWN_ARROW:
        player.walkDirection = 0;
        break;
      case p.LEFT_ARROW:
      case p.RIGHT_ARROW:
        player.turnDirection = 0;
        break;
    }
  };
};

export {
  player,
  grid,
  cam
};
