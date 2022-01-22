// Thanks to @Konsti from Coding Train Discord channel for helping out figuring
// out how to project shadows on moving bodies

import p5 from 'p5';
import {
  Engine,
  World,
  Bodies,
  Constraint,
  Mouse,
  MouseConstraint,
} from 'matter-js';

const CANVAS_WALLS = true;
const RENDER_BODIES = false;

// Matter.js physics engine
const engine = Engine.create();
const world = engine.world;

// Created objects in the "world" are stored here
let bodies = [];

// Boxes are items that cast shadow. Their surfaces are
// tracked separately and calculated on every frame.
let boxes = [];
let surfaces = [];

function removeFromWorld(body) {
  World.remove(world, body);
  boxes = boxes.filter(box => box.body.id !== body.id);
  bodies = bodies.filter(currentBody => currentBody.body.id !== body.id);
}

class Ball {
  constructor({ p, x, y, r, options = {} }) {
    this.p = p;
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.c = p.color(225);
    this.noRender = options.noRender || false;
    World.add(world, this.body);
    setTimeout(() => removeFromWorld(this.body), 2000);
  }

  render() {
    if (this.noRender) return;

    this.p.push();
    this.p.ellipse(
      this.body.position.x,
      this.body.position.y,
      this.r * 2
    );
    this.p.pop();
  }
}

class Light {
  constructor({ p, x, y, r, options = {} }) {
    this.p = p;
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.c = p.color(225);
    World.add(world, this.body);
    this.rays = [];
    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(this.body.position, p.radians(i), p));
    }
  }

  render() {
    this.p.push();
    this.p.fill(this.c);
    this.p.stroke(this.c);
    this.p.ellipse(
      this.body.position.x,
      this.body.position.y,
      this.r * 2
    );
    this.p.pop();

    this.rays.forEach(ray => {
      let shortestDist = Infinity;
      let closestPoint = null;

      // Check which surface or wall is closest
      surfaces.forEach(wall => {
        const ip = ray.cast(wall);
        if (!ip) return;

        const distance = this.p.dist(
          this.body.position.x, this.body.position.y,
          ip.x, ip.y
        );


        if (distance < shortestDist) {
          shortestDist = distance;
          closestPoint = ip;
        }
      });

      // If there is an intersection point, draw a line to it.
      if (closestPoint) {
        this.p.push();
        this.c.setAlpha(25);
        this.p.stroke(this.c);
        this.p.line(ray.pos.x, ray.pos.y, closestPoint.x, closestPoint.y);
        this.p.pop();
      }
    });
  }
}

class Pendulum {
  constructor(p, { x, y, body, options = {} }) {
    this.p = p;
    this.sling = Constraint.create({
      pointA: {
        x,
        y
      },
      bodyB: body,
      ...options
    });

    World.add(world, this.sling);
  }

  render() {
    this.p.line(
      this.sling.pointA.x,
      this.sling.pointA.y,
      this.sling.bodyB.position.x,
      this.sling.bodyB.position.y
    );
  }
}

class Ray {
  constructor(pos, angle, p) {
    this.p = p;
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(wall) {
    // Start and end points of the wall
    const x1 = wall.start.x;
    const y1 = wall.start.y;
    const x2 = wall.end.x;
    const y2 = wall.end.y;

    // Ray's current position and direction
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Denominator used to calcualte intersection point between
    // two lines. If it's 0 lines are perfectly parallel.
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    // Check if these two lines intersect at any point, and return that point.
    if (t > 0 && t < 1 && u > 0) {
      const ip = this.p.createVector(
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1)
      );

      return ip;
    }
  }
}

class Surface {
  constructor(x1, y1, x2, y2, p) {
    this.start = p.createVector(x1, y1);
    this.end = p.createVector(x2, y2);
  }
}

class Box {
  constructor(p, {
    x,
    y,
    w,
    h,
    options = {}
  }) {
    this.p = p;
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.noRender = options.noRender || false;
    World.add(world, this.body);
  }

  render() {
    if (this.noRender) return;

    this.p.push();
    this.p.translate(
      this.body.position.x,
      this.body.position.y
    );

    this.p.rotate(this.body.angle);
    this.p.fill(225);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(0, 0, this.w, this.h);
    this.p.pop();
  }
}

class Polygon {
  constructor(p, { x, y, s, r, options = {} }) {
    this.p = p;
    this.body = Bodies.polygon(x, y, s, r, options);
    this.radius = r;
    this.noRender = options.noRender || false;
    World.add(world, this.body);
  }

  render() {
    if (this.noRender) return;
    this.p.push();
    this.p.beginShape();
    this.body.vertices.forEach(({ x, y }) => this.p.vertex(x, y));
    this.p.endShape(CLOSE);
    this.p.pop();
  }
}

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
    bodies = [];
    boxes = [];
    surfaces = [];

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
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    // create the ground
    const ground = new Box(p, {
      x: p.width / 2,
      y: p.height + 50,
      w: p.width * 2,
      h: 100,
      options: {
        isStatic: true,
        friction: 0.5,
        restitution: 0.9
      }
    });

    // create the ball
    const light = new Light({
      p: p,
      x: p.width / 2 + 100,
      y: 100,
      r: 10,
      options: {
        restitution: 0.4,
        friction: 0.3
      }
    });

    // create the pendulum
    const pendulum = new Pendulum(p, {
      x: p.width / 2,
      y: 70,
      body: light.body,
      options: {
        stiffness: 0.5,
        length: 100
      }
    });

    // Create a few objects that project shadows...
    const ball1 = new Ball({
      p: p,
      x: 150,
      y: 50,
      r: 10,
      options: {
        noRender: !RENDER_BODIES,
        restitution: 0.55,
        friction: 0.1
      }
    });

    const box1 = new Box(p, {
      x: 120,
      y: 100,
      w: 75,
      h: 75,
      options: {
        noRender: !RENDER_BODIES,
        isStatic: true,
        angle: 1
      }
    });

    const poly1 = new Polygon(p, {
      x: 180,
      y: 240,
      s: 6,
      r: 50,
      options: {
        noRender: !RENDER_BODIES,
        isStatic: true,
        angle: Math.PI + 0.2
      }
    });

    const poly2 = new Polygon(p, {
      x: 400,
      y: 250,
      s: 6,
      r: 40,
      options: {
        noRender: !RENDER_BODIES,
        isStatic: true
      }
    });

    const box2 = new Box(p, {
      x: 470,
      y: 100,
      w: 75,
      h: 75,
      options: {
        noRender: !RENDER_BODIES,
        isStatic: true,
        angle: 1.8
      }
    });


    // ...and add them to the world
    bodies.push(ball1, box1, box2, poly1, poly2);
    boxes.push(ball1, box1, box2, poly1, poly2);

    // create mouse object and constraint
    const mouse = Mouse.create(canvas.elt);
    const mouseconstraint = MouseConstraint.create(engine, {
      mouse
    });
    mouse.pixelRatio = p.pixelDensity();

    // Events.on(mouseconstraint, 'mousedown', (e) => {
    //   // changes color of the light on every click
    //   light.c = p.color(
    //     p.random(100, 255),
    //     p.random(100, 255),
    //     p.random(100, 255)
    //   );
    // });

    if (CANVAS_WALLS) {
      surfaces.push(new Surface(0, 0, p.width, 0, p));
      surfaces.push(new Surface(p.width, 0, p.width, p.height, p));
      surfaces.push(new Surface(p.width, p.height, 0, p.height, p));
      surfaces.push(new Surface(0, p.height, 0, 0, p));
    }

    World.add(world, mouseconstraint);
    bodies.push(ground, pendulum, light);
  };

  p.draw = () => {
    p.background(50);

    // new ball every 60 frames
    if (p.frameCount % 80 === 0) {
      const ball = new Ball({
        p: p,
        x: p.random(150, p.width - 150),
        y: -20,
        r: 10,
        options: {
          noRender: !RENDER_BODIES,
          restitution: 0.55,
          friction: 0.1
        }
      });

      bodies.push(ball);
      boxes.push(ball);
    }

    // run the engine
    Engine.update(engine);

    boxes.forEach(box => {
      box.body.vertices.forEach((vertex, idx, arr) => {
        const nextVertex = (idx + 1) % arr.length;
        surfaces.push(new Surface(
          vertex.x, vertex.y,
          arr[nextVertex].x, arr[nextVertex].y,
          p
        ));
      });
    });

    bodies.forEach(body => body.render());

    if (CANVAS_WALLS) {
      surfaces.splice(4);
    } else {
      surfaces = [];
    }
  };

  p.keyPressed = () => {
    if (p.keyCode !== 80) return;
    p.paused ? p.resumeLoop() : p.stopLoop();
  }
};
