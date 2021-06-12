import { Bodies, World } from 'matter-js';
import { world, renderQueue, bodyColors } from './sketch';

class Polygon {
  constructor(p, { x, y, s, r, c, options = {} }) {
    this.p = p;
    this.body = Bodies.polygon(x, y, s, r, options);
    this.radius = r;
    this.color = c || p.random(bodyColors);
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.radius || x > this.p.width + this.radius || y > this.p.height + this.radius) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  render() {
    this.p.push();
    this.p.fill(this.color);
    this.p.beginShape();
    this.body.vertices.forEach(({ x, y }) => this.p.vertex(x, y));
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  }
}

export default Polygon;
