import p5 from 'p5';

const COLS = 15;
const ROWS = 11;
const TILE_SIZE = 40;

const CANVAS_WIDTH = COLS * TILE_SIZE;
const CANVAS_HEIGHT = ROWS * TILE_SIZE;

const MINIMAP_PREVIEW = true;
const MINIMAP_SCALE_FACTOR = MINIMAP_PREVIEW ? 0.25 : 1;
const CORRECT_FISH_EYE_EFFECT = true;

let player, grid, cam;

class Grid {
  constructor(p) {
    this.p = p;
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 1],
      [1, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 4, 0, 1, 3, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  containsWall(x, y) {
    if (x < 0 || x > this.p.width || y < 0 || y > this.p.height) {
      return true;
    }

    // checks if passed coordinates are a wall or not
    const i = Math.floor(x / TILE_SIZE);
    const j = Math.floor(y / TILE_SIZE);
    return this.grid[j][i] > 0;
  }

  reflectedColor(x, y) {
    switch (this.grid[y][x]) {
      case 4:
        return this.p.color(50, 50, 255);
      case 3:
        return this.p.color(100, 200, 100);
      case 2:
        return this.p.color(225, 75, 75);
      case 1:
        return this.p.color(50);
      default:
        return this.p.color(255, 50);
    }
  }

  render() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const tileX = j * TILE_SIZE;
        const tileY = i * TILE_SIZE;
        this.p.fill(this.reflectedColor(j, i));
        this.p.rect(
          MINIMAP_SCALE_FACTOR * tileX,
          MINIMAP_SCALE_FACTOR * tileY,
          MINIMAP_SCALE_FACTOR * TILE_SIZE,
          MINIMAP_SCALE_FACTOR * TILE_SIZE
        );
      }
    }
  }
}

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
    const nextPositionX = this.x + Math.cos(this.facing) * step;
    const nextPositionY = this.y + Math.sin(this.facing) * step;

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

class Camera {
  constructor(p, player) {
    this.p = p;
    this.player = player;
    this.projectionThickness = 3;
    this.totalRays = p.width / this.projectionThickness;
    this.FOV = 60 * (this.p.PI / 180);
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
      const projectionPlaneDistance = (this.p.width / 2) / Math.tan(this.FOV / 2);

      // Get the corrected ray length
      const rayLength = CORRECT_FISH_EYE_EFFECT
        ? ray.length * Math.cos(ray.angle - this.player.facing)
        : ray.length;

      // Find the height of the projection per strip
      const projectionHeight = (TILE_SIZE / rayLength) * projectionPlaneDistance;

      // Draw the projection
      // fill(
      //   225, 150, 50,
      //   ray.verticalOrigin ? 210: 180
      // );
      this.p.fill(grid.reflectedColor(
        Math.floor(ray.targetX / TILE_SIZE),
        Math.floor(ray.targetY / TILE_SIZE))
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

    this.facingSouth = this.angle > 0 && this.angle < this.p.PI;
    this.facingNorth = !this.facingSouth;

    this.facingEast  = this.angle < this.p.HALF_PI || this.angle > this.p.PI + this.p.HALF_PI;
    this.facingWest  = !this.facingEast;
  }

  normalizeAngle(angle) {
    let a = angle % this.p.TWO_PI;
    if (a < 0) {
      a += this.p.TWO_PI;
    }
    return a;
  }

  cast() {
    let xintersect, yintersect, xstep, ystep;

    /*** HORIZONTAL RAY-GRID INTERSECTION ***/
    let hasHorizontalTarget, horizontalTargetX, horizontalTargetY;

    yintersect = this.facingSouth
      ? Math.floor(this.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : Math.floor(this.y / TILE_SIZE) * TILE_SIZE;

    xintersect = this.x + (yintersect - this.y) / Math.tan(this.angle);

    ystep = this.facingNorth ? -TILE_SIZE : TILE_SIZE;
    xstep = TILE_SIZE / Math.tan(this.angle);

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
      ? Math.floor(this.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE
      : Math.floor(this.x / TILE_SIZE) * TILE_SIZE;

    yintersect = this.y + (xintersect - this.x) * Math.tan(this.angle);

    xstep = this.facingWest ? -TILE_SIZE : TILE_SIZE;
    ystep = TILE_SIZE * Math.tan(this.angle);

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
    return null;
  };

  p.windowResized = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    }, 100);
  };

  p.setup = () => {
    const canvas = p.createCanvas(100, 100);
    canvasDOM = canvas.parent();
    p.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    p.stroke(50);

    grid = new Grid(p);
    player = new Player(p);
    cam = new Camera(p, player);
  };

  p.draw = () => {
    p.background(220);
    cam.project();
    cam.createView();
    // cam.rays.forEach(r => r.render());

    player.update();
    player.render();

    grid.render();
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        player.walkDirection = 1;
      break;
        case p.DOWN_ARROW:
        player.walkDirection = -1;
      break;
        case p.LEFT_ARROW:
        player.turnDirection = -1;
      break;
        case p.RIGHT_ARROW:
        player.turnDirection = 1;
      break;
    }
  }

  p.keyReleased = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
      case p.DOWN_ARROW:
        player.walkDirection = 0;
      break;
      case p.LEFT_ARROW:
      case p.RIGHT_ARROW:
        player.turnDirection = 0;
      break;
    }
  }
};
