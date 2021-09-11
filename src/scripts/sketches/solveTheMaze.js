import p5 from 'p5';

const CELL_SIZE = 40;

let light, grid, cols, rows;
let gameStarted = false;
let walls = [];

class Wall {
  constructor(p, x1, y1, x2, y2) {
    this.p = p;
    this.start = p.createVector(x1, y1);
    this.end   = p.createVector(x2, y2);
  }

  render() {
    this.p.line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

class Cell {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.current = false;
    this.visited = false;
    this.backtraced = false;
    const i = x * CELL_SIZE;
    const j = y * CELL_SIZE;
    this.i = i;
    this.j = j;
    this.boundaries = {
      top: [i, j, i + CELL_SIZE, j],
      right: [i + CELL_SIZE, j, i + CELL_SIZE, j + CELL_SIZE],
      bottom: [i + CELL_SIZE, j + CELL_SIZE, i, j + CELL_SIZE],
      left: [i, j + CELL_SIZE, i, j]
    };
  }

  getNeighbours() {
    const top = grid.getCell(this.x, this.y - 1);
    const right = grid.getCell(this.x + 1, this.y)
    const bottom = grid.getCell(this.x, this.y + 1)
    const left = grid.getCell(this.x - 1, this.y);

    return [top, right, bottom, left].filter(n => n && !n.visited);
  }

  getBoundaries() {
    return Object.values(this.boundaries);
  }

  getRandomNeighbour() {
    const neighbours = this.getNeighbours();
    const randomIdx = Math.floor(Math.random() * neighbours.length);
    return neighbours[randomIdx];
  }

  next() {
    return this.getRandomNeighbour();
  }

  show() {
    if (this.visited) {
      this.p.noStroke();
      this.p.fill(225);
      // fill(60, 120, 255);
      this.p.rect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    if (this.current || this.backtraced) {
      this.p.noStroke();
      this.p.fill(225);
      // fill(225, 150, 80);
      this.p.rect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    this.p.stroke(25);
    Object.values(this.boundaries).forEach(side => side && this.p.line(...side));
  }
}

class Grid {
  constructor(p, cols, rows) {
    this.p = p;
    this.cols = cols;
    this.rows = rows;
    this.cells = this.createGrid(cols, rows);
    this.currentCell = this.cells[0];
    this.visitedStack = [];
  }

  createGrid(cols, rows) {
    const grid = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(this.p, i, j));
      }
    }
    return grid;
  }

  getCell(x, y) {
    if (x < 0 || x >= cols || y < 0 || y > rows) {
      return false;
    }
    return this.cells[x + y * cols];
  }

  removeWalls(current, next) {
    if (current.x - next.x > 0) {
      current.boundaries.left = null;
      next.boundaries.right = null;
    }
    if (current.x - next.x < 0) {
      current.boundaries.right = null;
      next.boundaries.left = null;
    }
    if (current.y - next.y > 0) {
      current.boundaries.top = null;
      next.boundaries.bottom = null;
    }
    if (current.y - next.y < 0) {
      current.boundaries.bottom = null;
      next.boundaries.top = null;
    }
  }

  update() {
    const next = this.currentCell.next();

    this.currentCell.current = false;
    this.currentCell.visited = true;

    if (next) {
      next.current = true;
      this.visitedStack.push(this.currentCell);
      this.removeWalls(this.currentCell, next);
      this.currentCell = next;
    } else {
      this.backtrack();
    }
  }

  backtrack() {
    if (this.visitedStack.length === 0) {
      // Generate walls from current cell boundaries
      this.cells.forEach(cell => {
        Object.values(cell.boundaries).forEach(boundary => {
          if (boundary) {
            walls.push(new Wall(this.p, ...boundary));
          }
        });
      });

      gameStarted = true;
      return;
    }
    this.currentCell = this.visitedStack.pop();
    this.currentCell.backtraced = true;
  }

  render() {
    this.cells.forEach(cell => cell.show());
  }
}

class Ray {
  constructor(p, pos, angle) {
    this.p = p;
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  cast(wall) {

    // Start and end points of the wall
    const x1 = wall.start.x;
    const y1 = wall.start.y;
    const x2 = wall.end.x;
    const y2 = wall.end.y;

    // Ray's current position and direction
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // Denominator used to calcualte intersection point between
    // two lines. If it's 0 lines are perfectly parallel.
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return false;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    // Check if these two lines intersect at any point, and return that point.
    if (t > 0 && t < 1 && u > 0) {
      const ip = this.p.createVector(
        x1 + t * (x2 - x1),
        y1 + t * (y2 - y1)
      );

      return ip;
    }
  }
}

class Light {
  constructor(p, x, y, c) {
    this.p = p;
    this.pos = p.createVector(x, y);
    this.vel = p.createVector();
    this.rays = [];
    this.color = c || p.color(255);
    this.r = CELL_SIZE / 4; // radius
    // this.currentCell = this.getCurrentCell();
    // this.boundaries = this.getBoundaries();

    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(p, this.pos, p.radians(i)));
    }
  }

  getCurrentCell() {
    return grid.getCell(
      Math.floor((this.pos.x / this.p.width) * cols),
      Math.floor((this.pos.y / this.p.height) * rows)
    );
  }

  getBoundaries(cell) {
    return cell.getBoundaries();
  }

  move(x, y) {
    if (this.pos.y + y - this.r <= 0 ||
        this.pos.y + y + this.r >= this.p.height ||
        this.pos.x + x + this.r >= this.p.width ||
        this.pos.x + x - this.r <= 0
       ) {
      return this.vel.set(0, 0);
    }

    const currentCell = this.getCurrentCell();
    const [top, right, bottom, left] = this.getBoundaries(currentCell);

    // horizontal movement
    if (y === 0) {
      if (left && this.pos.x + x <= currentCell.i ||
          right && this.pos.x + x >= currentCell.i + CELL_SIZE) {
        return this.vel.set(0, 0);
      }
    } else {
      // vertical movement
      if (top && this.pos.y + y <= currentCell.j ||
          bottom && this.pos.y + y >= currentCell.j + CELL_SIZE) {
        return this.vel.set(0, 0);
      }
    }

    this.vel.set(x, y);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x >= this.p.width - CELL_SIZE &&
        this.pos.y >= this.p.height - CELL_SIZE) {
      resetGame(this.p);
    }
  }

  render() {
    this.p.fill(225);
    this.p.ellipse(this.pos.x, this.pos.y, CELL_SIZE / 2, CELL_SIZE / 2);
    this.p.stroke(this.color);
    this.color.setAlpha(50);

    this.rays.forEach(ray => {
      let shortestDist = Infinity;
      let closestPoint = Infinity;

      // Check which wall is closest
      walls.forEach(wall => {
        const ip = ray.cast(wall);
        if (!ip) return;

        const distance = p5.Vector.dist(this.pos, ip);
        if (distance < shortestDist) {
          shortestDist = distance;
          closestPoint = ip;
        }
      });

      this.p.line(ray.pos.x, ray.pos.y, closestPoint.x, closestPoint.y);
    });
  }
}

function resetGame(p) {
  gameStarted = false;
  walls = [];
  grid = new Grid(p, cols, rows);
  light.pos.set(CELL_SIZE / 3, CELL_SIZE / 2);
}

export default p => {

  let canvasDOM;
  let timer;

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
      p.resizeCanvas(400, 400);
      // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);
      p.draw();
    }, 100);
  };

  p.setup = () => {
    const canvas = p.createCanvas(100, 100);
    canvasDOM = canvas.parent();
    p.resizeCanvas(400, 400);
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    p.stroke(255);

    cols = Math.floor(p.width  / CELL_SIZE);
    rows = Math.floor(p.height / CELL_SIZE);
    grid = new Grid(p, cols, rows);
    light = new Light(p, CELL_SIZE / 3, CELL_SIZE / 2);
  };

  p.draw = () => {
    p.background(50);

    if (gameStarted) {
      // Draw starting position
      p.push();
      p.fill(225, 150, 80);
      p.rect(0, 0, CELL_SIZE);

      // Draw finish cell
      p.fill(80, 225, 150);
      p.rect(p.width - CELL_SIZE, p.height - CELL_SIZE, CELL_SIZE);
      p.pop();

      checkControls();
      light.update();
      light.render();
    } else {
      grid.render();
      grid.update();
    }
  };

  function checkControls() {
    if (p.keyIsDown(p.RIGHT_ARROW)) {
    light.move(2, 0);
    }
    if (p.keyIsDown(p.LEFT_ARROW)) {
      light.move(-2, 0);
    }
    if (p.keyIsDown(p.UP_ARROW)) {
      light.move(0, -2);
    }
    if (p.keyIsDown(p.DOWN_ARROW)) {
      light.move(0, 2);
    }
  }

  p.keyReleased = () => {

    // Prevents updating current move while paused
    if (p.paused && p.keyCode !== 80) return;

    switch (p.keyCode) {
      case 80: // P for pause
        p.paused ? p.resumeLoop() : p.stopLoop();
        break;
      case p.UP_ARROW:
      case p.RIGHT_ARROW:
      case p.DOWN_ARROW:
      case p.LEFT_ARROW:
        light.vel.set(0);
    }
  }
};
