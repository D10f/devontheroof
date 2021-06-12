import { Bodies, Constraint, World } from 'matter-js';
import { world } from './sketch';
import Polygon from './Polygon';

class Slingshot {
  constructor(p, body, options = {}) {
    this.p = p;
    this.sling = Constraint.create({
      pointA: { x: body.position.x, y: body.position.y },
      bodyB: body,
      ...options
    });

    this.body = body;
    World.add(world, this.sling);
  }

  release() {
    setTimeout(() => {
      this.sling.bodyB = null;
    }, 0);
  }

  update() {
    if (this.sling.bodyB == null) {
      const newPoly = new Polygon(this.p, {
        x: 150,
        y: this.p.height * 0.66,
        s: Math.floor(this.p.random(5,10)),
        r: 15,
        options: { density: 1 }
      });
      this.sling.bodyB = newPoly.body;
      this.body = newPoly.body;
    }
  }

  render() {
    if (this.sling.bodyB) {
      this.p.line(
        this.sling.pointA.x, this.sling.pointA.y,
        this.sling.bodyB.position.x, this.sling.bodyB.position.y
      );
    }
  }
}

export default Slingshot;
