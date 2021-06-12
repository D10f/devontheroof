import { MINIMAP_SCALE_FACTOR } from './constants';
import { grid } from './sketch';

class Player {
  constructor(p) {
    this.p = p;
    this.x = this.p.width / 2;
    this.y = this.p.height / 2;
    this.radius = 5;
    this.facing = p.PI / 2; // current angle the player is facing
    this.turnDirection = 0; // 1 turns right, -1 turns left
    this.walkDirection = 0; // 1 moves forward, -1 moves backward
    this.movementSpeed = 2;
    this.rotationSpeed = 3 * (p.PI / 180);
  }

  update() {
    this.facing += this.turnDirection * this.rotationSpeed;

    // Calculate point for the next step
    const step = this.walkDirection * this.movementSpeed;
    const nextPositionX = this.x + this.p.cos(this.facing) * step;
    const nextPositionY = this.y + this.p.sin(this.facing) * step;

    // Return immediately if next step leads to a wall
    if (grid.containsWall(nextPositionX, nextPositionY)) {
      return false;
    }

    this.x = nextPositionX;
    this.y = nextPositionY;
  }

  render() {
    this.p.push();
    this.p.noStroke();
    this.p.fill(255, 75, 50);
    this.p.ellipse(
      MINIMAP_SCALE_FACTOR * this.x,
      MINIMAP_SCALE_FACTOR * this.y,
      MINIMAP_SCALE_FACTOR * this.radius * 2,
      MINIMAP_SCALE_FACTOR * this.radius * 2
    );
    this.p.pop();
  }
}

export default Player;
