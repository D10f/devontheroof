import Ray from './Ray';
import { CORRECT_FISH_EYE_EFFECT, TILE_SIZE } from './constants';
import { grid } from './sketch';

class Camera {
  constructor(p, player) {
    this.p = p;
    this.player = player;
    this.projectionThickness = 3;
    this.totalRays = p.width / this.projectionThickness;
    this.FOV = 60 * (p.PI / 180);
    this.rays = [];
  }

  createView() {
    this.rays = [];

    // start first ray subtracting half of the FOV
    let rayAngle = this.player.facing - (this.FOV / 2);

    for (let i = 0; i < this.totalRays; i++) {
      const ray = new Ray(this.p, this.player.x, this.player.y, rayAngle);
      this.rays.push(ray);
      ray.cast();
      ray.render();

      // increase angle based on perception and casted rays
      rayAngle += this.FOV / this.totalRays;
    }
  }

  project() {
    this.rays.forEach((ray, idx) => {

      // Find distance to projection plane
      const projectionPlaneDistance = (this.p.width / 2) / this.p.tan(this.FOV / 2);

      // Get the corrected ray length
      const rayLength = CORRECT_FISH_EYE_EFFECT
        ? ray.length * this.p.cos(ray.angle - this.player.facing)
        : ray.length;

      // Find the height of the projection per strip
      const projectionHeight = (TILE_SIZE / rayLength) * projectionPlaneDistance;

      // Draw the projection
      // fill(
      //   225, 150, 50,
      //   ray.verticalOrigin ? 210: 180
      // );
      this.p.fill(grid.reflectedColor(
        this.p.floor(ray.targetX / TILE_SIZE),
        this.p.floor(ray.targetY / TILE_SIZE))
      );
      this.p.noStroke();
      this.p.rect(
        idx * this.projectionThickness,
        (this.p.height / 2) - (projectionHeight / 2),
        this.projectionThickness,
        projectionHeight
      );
    });
  }
}

export default Camera;
