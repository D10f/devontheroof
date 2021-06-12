import { GRID_SIZE } from './constants';
import { cols } from './sketch';

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

export default Particle;
