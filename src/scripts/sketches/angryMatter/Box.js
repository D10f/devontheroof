import { Bodies, World } from 'matter-js';
import { world, renderQueue, bodyColors } from './sketch';

class Box {
  constructor(p, { x, y, w, h, c, options = {} }) {
    this.p = p;
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.width = w;
    this.height = h;
    this.color = c || p.random(bodyColors);
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.width || x > this.p.width + this.width ||
      y < 0 - this.height || y > this.p.height + this.height) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  render() {
    this.p.push();
    this.p.translate(this.body.position.x, this.body.position.y);
    this.p.rotate(this.body.angle);
    this.p.fill(this.color);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(0, 0, this.width, this.height);
    this.p.pop();
  }
}

export default Box;
