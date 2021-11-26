import p5 from 'p5';

let font;
let particles = [];
let defaultText = 'Brazil';

class Particle {
  constructor(p, x, y) {
    this.p = p;
    this.pos = p.createVector(p.random(-25, p.width + 25), p.random(-25, p.height + 25));
    this.vel = p.createVector();
    this.acc = p.createVector();
    this.target = p.createVector(x, y); // original position
    this.targetDistance = 0; // distance from target
    this.cursorAllergy = 35; // distance from cursor to move away from it
    this.maxSpeed = 10;
    this.steeringForce = 0.5;
  }

  calculateSpeed() {
    this.targetDistance = p5.Vector.dist(this.target, this.pos);
    return this.p.map(this.targetDistance, 0, 200, 0, this.maxSpeed);
  }

  approachTarget() {
    const targetDirection = p5.Vector.sub(this.target, this.pos);
    targetDirection.setMag(this.calculateSpeed());

    const steer = p5.Vector.sub(targetDirection, this.vel);
    steer.limit(this.steeringForce);

    this.applyForce(steer);
  }

  avoidCursor() {
    if (this.p.dist(this.p.mouseX, this.p.mouseY, this.pos.x, this.pos.y) < this.cursorAllergy) {
      const force = p5.Vector.sub(this.p.createVector(this.p.mouseX, this.p.mouseY), this.pos);
      let distanceSq = force.magSq();
      distanceSq = this.p.constrain(distanceSq, 1, 5);
      force.mult(-1);
      force.setMag(distanceSq);
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.avoidCursor();
    this.approachTarget();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    this.p.stroke(150, 200, 50);
    this.p.point(this.pos.x, this.pos.y);
  }
}

export default (p, customText) => {

  let canvasDOM;
  let timer;
  const text = customText || defaultText;

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
    return null;
  };

  p.windowResized = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    }, 100);
  };

  p.preload = () => {
    font = p.loadFont('https://developersojourn.site/wp-content/themes/sojourn/fonts/PanameraRegular.otf');
  };

  p.setup = () => {
    const canvas = p.createCanvas(100, 100);
    canvasDOM = canvas.parent();
    p.resizeCanvas(600, 400);
    p.strokeWeight(4);
    p.stroke(255);

    font
      .textToPoints(text, 30, 200, 132, { sampleFactor: 0.16 })
      .forEach(({ x, y }) => particles.push(new Particle(p, x, y)));
  };

  p.draw = () => {
    p.background(40, 65, 55);
    particles.forEach(p => {
      p.update();
      p.show();
    });
  };
};
