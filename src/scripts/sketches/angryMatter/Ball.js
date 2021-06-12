import { Bodies, World } from 'matter-js';

class Ball {
  constructor({ x, y, r, c = random(bodyColors), options = {} }) {
    this.body = Bodies.circle(x, y, r, options);
    this.radius = r;
    this.color = c;
    World.add(world, this.body);
    renderQueue.add(this);
  }

  update() {
    const { x, y } = this.body.position;

    // Checks if body is out of canvas
    if (x < 0 - this.radius || x > width + this.radius || y > height + this.radius) {
      World.remove(world, this.body);
      renderQueue.remove(this.body.id);
    }
  }

  // Checks if a point (i, j) exists within the body
  contains(i, j) {
    const { x, y } = this.body.position;
    return (
      i > x - this.radius && i < x + this.radius &&
      j > y - this.radius && j < y + this.radius
    );
  }

  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    fill(this.color);
    ellipse(0, 0, this.radius * 2);
    pop();
  }
}
