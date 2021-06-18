import p5 from 'p5';

let grid, current, next;

let gameSpeed = 30;
const BLOCK_SIZE = 20;
const BOARD_WIDTH = 300;
const BOARD_HEIGHT = 400;
const SCALE_FACTOR = 0.75;

class Tetrimino {
  constructor(p) {
    this.p = p;
    this.pos = p.createVector(140, -80);
    this.angle = 0;
    this.shape = undefined;
    this.color = undefined;
    this.getRandomShapeAndColor();
    this.blocks = this.getBlockCoordinates();
    this.done = false;
  }

  getRandomShapeAndColor() {
    const idx = Math.floor(Math.random() * shapesAndColors.length);
    this.color = shapesAndColors[idx].color;
    this.shape = shapesAndColors[idx].shape;
  }

  getBlockCoordinates(
    position = this.pos,
    angle = this.angle
  ) {

    // Magic number 4 is the size of the tetromino's shape matrix
    const blocks = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.shape[angle][4 * y + x] === 1) {
          blocks.push({
            x: position.x + BLOCK_SIZE * x,
            y: position.y + BLOCK_SIZE * y
          });
        }
      }
    }
    return blocks;
  }

  move(x, y) {
    const nextPosition = this.pos.copy();
    nextPosition.add(x, y);

    const nextBlocks = this.getBlockCoordinates(nextPosition);

    for (let i = 0; i < nextBlocks.length; i++) {

      // Check if block is offscreen on the sides
      if (nextBlocks[i].x < 0 || nextBlocks[i].x >= BOARD_WIDTH) {
        return false;
      }

      // Check if block has reached bottom
      if (nextBlocks[i].y >= BOARD_HEIGHT) {
        this.done = true;
        return false;
      }

      // Check if block hits another block. If y is < 0, the default,
      // then use 0 to avoid errors retrieving non-existing cell
      const cell = grid.getCell(
        nextBlocks[i].x,
        Math.max(nextBlocks[i].y, 0)
      );

      if (cell.occupied) {
        // Falling on top of another block means this one is done
        if (y > 0) {
          this.done = true;
        }
        return false;
      }
    }

    // Finally make the move and return true
    this.pos = nextPosition;
    this.blocks = nextBlocks;

    return true;
  }

  moveToBottom() {
    // Recursively moves down by one until no longer possible
    let moveDownOne = true;
    while (moveDownOne) {
      moveDownOne = this.move(0, BLOCK_SIZE);
    }
  }

  turn() {
    const nextAngle = (this.angle + 1) % 4;
    const nextBlocks = this.getBlockCoordinates(this.pos, nextAngle);

    // TODO: Tidy things up a bit to avoid repited code
    // TODO: Adjust position when going off the edges, if possible
    for (let i = 0; i < nextBlocks.length; i++) {

      // Cannot make turn if a block goes outside of the edges
      if (
        nextBlocks[i].x < 0 ||
        nextBlocks[i].x >= BOARD_WIDTH ||
        nextBlocks[i].y >= BOARD_HEIGHT
      ) {
        return false;
      }

      const cell = grid.getCell(
        nextBlocks[i].x,
        Math.max(nextBlocks[i].y, 0)
      );

      // Cannot make turn if block overlaps an existing block
      if (cell.occupied) {
        return false;
      }
    }

    // Turn is valid, update tetrimino
    this.angle = nextAngle;
    this.blocks = nextBlocks;
  }

  render() {
    this.p.fill(this.color);
    this.blocks.forEach(block => {
      this.p.rect(block.x, block.y, BLOCK_SIZE);
    });
  }

  preview() {
    const previewBlocks = this.getBlockCoordinates({
      x: 30,
      y: 0
    });

    this.p.push();
    this.p.translate(300, 0);

    // Dark background on the side
    this.p.fill(28);
    this.p.noStroke();
    this.p.rect(0, 0, 100, this.p.height);

    // Preview background
    this.p.fill(225);
    this.p.rect(10, 0, 85);

    // Draw the shape
    this.p.fill(this.color);
    this.p.stroke(1);
    previewBlocks.forEach(block => {
      this.p.rect(
        SCALE_FACTOR * block.x,
        SCALE_FACTOR * block.y,
        SCALE_FACTOR * BLOCK_SIZE
      );
    });
    this.p.pop();
  }
}

class Grid {
  constructor(w, h, p) {
    this.cols = w / BLOCK_SIZE;
    this.rows = h / BLOCK_SIZE;
    this.cells = this.createGrid();
    this.p = p;
  }

  createGrid() {
    const grid = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {

        const cell = {
          x: x * BLOCK_SIZE,
          y: y * BLOCK_SIZE,
          occupied: false,
          color: undefined
        };

        grid.push(cell);
      }
    }
    return grid;
  }

  checkFinishedRows() {
    const finishedRows = [];

    for (let i = 0; i < this.rows; i++) {

      // Take subset of the grid, a row, and check if it's full
      const row = this.cells.slice(this.cols * i, this.cols * i + this.cols);
      const rowFinished = row.every(cell => cell.occupied);

      // Take note of which rows are full, and clear them
      if (rowFinished) {
        const rowNumber = BLOCK_SIZE * i;
        finishedRows.push(rowNumber);
        row.forEach(cell => cell.occupied = false);
      }
    }

    if (finishedRows.length > 0) {

      // Loop the grid backwards, from bottom to top
      for (let i = this.cells.length - 1; i > 0; i--) {

        // increase game speed for each finished row
        this.p.frameRate(gameSpeed++);

        const cell = this.cells[i];

        // Cells above the finished row are pushed down by however many
        // rows were completed.
        if (cell.occupied && cell.y < this.p.max(finishedRows)) {
          cell.occupied = false;
          this.occupyCell(
            cell.x,
            cell.y + BLOCK_SIZE * finishedRows.length,
            cell.color
          );
        }
      }
    }
  }

  getCell(x, y) {
    const xIdx = x / BLOCK_SIZE;
    const yIdx = y / BLOCK_SIZE;
    return this.cells[this.cols * yIdx + xIdx];
  }

  occupyCell(x, y, c) {
    const cell = this.getCell(x, y);
    cell.occupied = true;
    cell.color = c;
  }

  render() {
    this.cells.forEach(cell => {
      if (cell.occupied) {
        this.p.fill(cell.color);
        this.p.rect(cell.x, cell.y, BLOCK_SIZE);
      }
    });
  }
}

// Tetris shapes actually have different names. Find more about it here:
// https://www.joe.co.uk/gaming/tetris-block-names-221127

const smashboy = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0
  ]
};

const hero = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 1
  ],
  1: [
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 1
  ],
  3: [
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ]
};

const rhodeIslandZ = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    1, 1, 0, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 0,
    1, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0
  ]
};

const clevelandZ = {
  0: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 0, 0,
    0, 1, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ]
};

const teewee = {
  0: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    1, 1, 1, 0,
    0, 0, 0, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 0,
    0, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    1, 1, 0, 0,
    0, 1, 0, 0
  ]
};

const orangeRicky = {
  0: [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 1, 1,
    0, 1, 0, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 0, 1, 0,
    0, 0, 1, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    1, 1, 1, 0
  ]
};

const blueRicky = {
  0: [
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 1, 0,
    0, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 0, 0, 0,
    1, 1, 1, 0
  ],
  2: [
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 0, 0,
    0, 1, 0, 0
  ],
  3: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 0,
    0, 0, 1, 0
  ]
};

const shapesAndColors = [
  {
    color: [225, 225, 0],
    shape: smashboy
  },
  {
    color: [100, 175, 225],
    shape: hero
  },
  {
    color: [180, 50, 170],
    shape: rhodeIslandZ
  },
  {
    color: [100, 50, 125],
    shape: clevelandZ
  },
  {
    color: [80, 205, 125],
    shape: teewee
  },
  {
    color: [225, 125, 0],
    shape: orangeRicky
  },
  {
    color: [0, 125, 225],
    shape: blueRicky
  }
];

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
    gameSpeed = 30;
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
    p.frameRate(gameSpeed);
    // p.resizeCanvas(canvasDOM.clientWidth, canvasDOM.clientHeight);

    grid = new Grid(BOARD_WIDTH, BOARD_HEIGHT, p);
    current = new Tetrimino(p);
    next = new Tetrimino(p);
  };

  p.draw = () => {
    p.background(225);

    if (p.frameCount % 30 === 0) {
      current.move(0, BLOCK_SIZE);
    }

    if (current.done) {
      current.blocks.forEach(block => {
        grid.occupyCell(block.x, block.y, current.color);
      });

      current = next;
      next = new Tetrimino(p);

      grid.checkFinishedRows();
    }

    grid.render();
    current.render();
    next.preview();
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        current.turn();
        break;
      case p.LEFT_ARROW:
        current.move(-BLOCK_SIZE, 0);
        break;
      case p.RIGHT_ARROW:
        current.move(BLOCK_SIZE, 0);
        break;
      case p.DOWN_ARROW:
        current.move(0, BLOCK_SIZE);
        break;
      case 32:
        current.moveToBottom();
        break;
    }
  }
};
