import { TILE_SIZE, MINIMAP_SCALE_FACTOR } from './constants';
import { grid } from './sketch';

class Ray {
  constructor(p, x, y, angle) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = this.normalizeAngle(angle);
    this.targetX = Infinity;
    this.targetY = Infinity;
    this.length = 0;
    // this.verticalOrigin = false;

    this.facingSouth = this.angle > 0 && this.angle < p.PI;
    this.facingNorth = !this.facingSouth;

    this.facingEast  = this.angle < (p.PI / 2) || this.angle > p.PI + (p.PI / 2);
    this.facingWest  = !this.facingEast;
  }

  normalizeAngle(angle) {
    let a = angle % this.p.PI * 2;
    if (a < 0) {
      a += this.p.PI * 2;
    }
    return a;
  }

  cast() {
    let xintersect, yintersect, xstep, ystep;

    /*** HORIZONTAL RAY-GRID INTERSECTION ***/
    let hasHorizontalTarget, horizontalTargetX, horizontalTargetY;

    yintersect = this.facingSouth
      ? this.p.floor(this.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : this.p.floor(this.y / TILE_SIZE) * TILE_SIZE;

    xintersect = this.x + (yintersect - this.y) / this.p.tan(this.angle);

    ystep = this.facingNorth ? -TILE_SIZE : TILE_SIZE;
    xstep = TILE_SIZE / this.p.tan(this.angle);

    if ((this.facingWest && xstep > 0) || (this.facingEast && xstep < 0)) {
      xstep *= -1;
    }

    while (
      xintersect >= 0 && xintersect <= this.p.width &&
      yintersect >= 0 && yintersect <= this.p.height
    ) {

      const yOffset = this.facingNorth ? yintersect - 1 : yintersect;

      if (grid.containsWall(xintersect, yOffset)) {
        hasHorizontalTarget = true;
        horizontalTargetX = xintersect;
        horizontalTargetY = yOffset;
        break;
      }

      xintersect += xstep;
      yintersect += ystep;
    }

    /*** VERTICAL RAY-GRID INTERSECTION ***/
    let hasVerticalTarget, verticalTargetX, verticalTargetY;

    xintersect = this.facingEast
      ? this.p.floor(this.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : this.p.floor(this.x / TILE_SIZE) * TILE_SIZE;

    yintersect = this.y + (xintersect - this.x) * this.p.tan(this.angle);

    xstep = this.facingWest ? -TILE_SIZE : TILE_SIZE;
    ystep = TILE_SIZE * this.p.tan(this.angle);

    if ((this.facingNorth && ystep > 0) || (this.facingSouth && ystep < 0)) {
      ystep *= -1;
    }

    while (
      xintersect >= 0 && xintersect <= this.p.width &&
      yintersect >= 0 && yintersect <= this.p.height
    ) {

      const xOffset = this.facingWest ? xintersect - 1 : xintersect;

      if (grid.containsWall(xOffset, yintersect)) {
        hasVerticalTarget = true;
        verticalTargetX = xOffset;
        verticalTargetY = yintersect;
        break;
      }

      xintersect += xstep;
      yintersect += ystep;
    }

    // Find distance to horizontal and vertical ray-grid intersection points
    const horizontalDist = hasHorizontalTarget
      ? this.p.dist(this.x, this.y, horizontalTargetX, horizontalTargetY)
      : Infinity;

    const verticalDist = hasVerticalTarget
      ? this.p.dist(this.x, this.y, verticalTargetX, verticalTargetY)
      : Infinity;

    if (horizontalDist < verticalDist) {
      this.length = horizontalDist;
      this.targetX = horizontalTargetX;
      this.targetY = horizontalTargetY;
    } else {
      this.length = verticalDist;
      this.targetX = verticalTargetX;
      this.targetY = verticalTargetY;
      this.verticalOrigin = true;
    }
  }

  render() {
    this.p.push();
    this.p.stroke(255, 125, 125, 100);
    this.p.line(
      MINIMAP_SCALE_FACTOR * this.x,
      MINIMAP_SCALE_FACTOR * this.y,
      MINIMAP_SCALE_FACTOR * this.targetX,
      MINIMAP_SCALE_FACTOR * this.targetY
    );
    this.p.pop();
  }
}

export default Ray;
