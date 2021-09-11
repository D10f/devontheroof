import p5 from 'p5';
import {
  Engine,
  World,
  Constraint,
  Composites,
  Mouse,
  MouseConstraint,
  Events
} from 'matter-js';

import RenderQueue from './RenderQueue';
import Polygon from './Polygon';
import Box from './Box';
import Slingshot from './Slingshot';

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are queued for render here
let renderQueue = new RenderQueue();

let bodyColors = [];

export { world, renderQueue, bodyColors };

export default p => {

  let canvasDOM;
  let timer;

  p.paused = false;

  p.stopLoop = () => {
    p.paused = true;
    p.noLoop();
  };

  p.resumeLoop = () => {
    p.paused = false;
    p.loop();
  };

  p.destroy = () => {
    p.stopLoop();
    p.noCanvas();

    // Destroy also Matter.js bodies
    World.clear(engine.world);
    Engine.clear(engine);

    bodyColors = [];

    return null;
  };

  p.windowResized = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      p.resizeCanvas(600, 400);
      // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);
      p.draw();
    }, 100);
  };

  p.setup = () => {
    const canvas = p.createCanvas(100, 100);
    canvasDOM = canvas.parent();
    p.resizeCanvas(600, 400);

    // Define colors to be picked at random when creating a new body
    bodyColors.push(
      p.color('#c7f464'),
      p.color('#4ecdc4'),
      p.color('#b64751'),
      p.color('#006ba6'),
      p.color('#ffbc42'),
      p.color('#d81159'),
      p.color('#8f2d56'),
      p.color('#0496ff'),
      p.color('#006ba6'),
      p.color('#76f09b')
    );

    // create the ground
    const ground = new Box(p, {
      x: p. width / 2,
      y: p.height,
      w: p.width * 2,
      h: 20,
      c: 50,
      options: { isStatic: true }
    });

    // create initial slingshot projectile
    const poly = new Polygon(p, {
      x: 150,
      y: p.height * 0.66,
      s: Math.floor(p.random(5,10)),
      c: p.color(50, 150, 200),
      r: 10,
      options: {
        restitution: 0.8,
        density: 0.01,
        friction: 1
      }
    });

    const slingshot = new Slingshot(p, poly.body, { stiffness: 1, length: 0 });

    /*
     * pixelDensity is a p5.js method that returns the density of the pixels
     * which depends on the physical screen. By adjusting the pixelRatio matter.js
     * knows where a body is clicked on accurately regardless of the screen.
    **/
    const mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = p.pixelDensity();

    const mouseconstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2
      }
    });

    // action taken after releasing the sling
    Events.on(mouseconstraint, "enddrag", (e) => {
      if (e.body.id === slingshot.body.id) {
        slingshot.release();
      }
    });

    // Setup a stack of targets
    const sides = 8;
    const size = p.random(10, 15);
    const cols = p.random(3, 5);
    const rows = p.random(4, 6);
    const stack = Composites.stack(p.width / 2, p.height - 200, cols, rows, 0, 0, (x ,y) => {
      const poly = new Polygon(p, { x, y, s: sides, r: size, options: { friction: 1 } });
      return poly.body;
    });

    // randmoly create a floating platform with some targets on top
    //if (random(1) > 0.75) {
      const rwidth = p.width * 0.75;
      const rheight = p.height * 0.45;

      const platform = new Box(p, {
        x: rwidth,
        y: rheight,
        w: 300,
        h: 10,
        c: 50,
        options: { isStatic: true, friction: 1 }
      });

      const platformToRebounce = new Box(p, {
        x: p.width * 0.2,
        y: rheight - 100,
        w: 75,
        h: 20,
        c: 50,
        options: { isStatic: true, angle: -0.8, restitution: 0.8 }
      });

      const sidess = p.random([8,12]);
      const pyramid = Composites.pyramid(rwidth - 120, rheight - 130, 5, 4, 0, 0, (x, y) => {
        const poly = new Polygon(p, { x, y, s: sidess, r: 15});
        return poly.body;
      });
    //}

    World.add(world, [mouseconstraint]);
    renderQueue.add(slingshot);
  };

  p.draw = () => {
    p.background(240);
    // run the engine
    Engine.update(engine);
    renderQueue.render();
  };
};
