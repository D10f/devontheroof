import p5 from 'p5';

const NOISE_OFFSET = 0.07;
const GRID_SIZE = 10;
const MAX_PARTICLES = 1000;
const SHOW_FIELD = false;
const FRAME_RATE = 40;

let cols, rows, xoff, yoff, zoff, particles, flowField;

class Particle {
  constructor(p) {
    this.p = p;
    this.pos = p.createVector(
      Math.floor(Math.random() * p.width),
      Math.floor(Math.random() * p.height)
    );
    this.vel = p.createVector();
    this.acc = p.createVector();
    this.maxSpeed = 4;
    this.prev = this.pos.copy();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    const x = Math.floor(this.pos.x / GRID_SIZE);
    const y = Math.floor(this.pos.y / GRID_SIZE);
    const index = x + y * cols;
    this.applyForce(vectors[index]);
  }

  updatePrevious() {
    this.prev = this.pos.copy();
  }

  edgeDetection() {
    if (this.pos.x > this.p.width) {
      this.pos.x = 0;
      this.updatePrevious()
    } else if (this.pos.x < 0) {
      this.pos.x = this.p.width;
      this.updatePrevious()
    }

    if (this.pos.y > this.p.height) {
      this.pos.y = 0;
      this.updatePrevious()
    } else if (this.pos.y < 0) {
      this.pos.y = this.p.height;
      this.updatePrevious()
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.edgeDetection();
    this.acc.set(0, 0);
  }

  show() {
    this.p.strokeWeight(1);
    this.p.stroke(75, 155, 135, 5);
    this.p.line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }
}

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
    flowField = [];
    particles = [];
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
    p.resizeCanvas(600, 400);
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    p.background(0, 0);
    p.frameRate(FRAME_RATE);

    cols = p.width / GRID_SIZE;
    rows = p.height / GRID_SIZE;

    flowField = [];
    particles = [];

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles[i] = new Particle(p);
    }

    zoff = 0;
  };

  p.draw = () => {
    p.background(5, 0);

    yoff = 0;
    for (let x = 0; x < cols; x++) {
      xoff = 0;
      for (let y = 0; y < rows; y++) {
        const index = x + y * cols;
        const r = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2;
        const v = p5.Vector.fromAngle(r);

        flowField[index] = v;

        if (SHOW_FIELD) {
          p.push();
          p.translate(x * GRID_SIZE, y * GRID_SIZE);
          p.rotate(v.heading());
          p.stroke(210);
          p.line(0, 0, GRID_SIZE, 0);
          p.pop();
        }

        xoff += NOISE_OFFSET;
      }
      yoff += NOISE_OFFSET;
    }
    zoff += 0.008;

    particles.forEach(particle => {
      particle.follow(flowField);
      particle.update();
      particle.show();
      particle.updatePrevious();
    });
  };
};
