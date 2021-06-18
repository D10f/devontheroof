import p5 from 'p5';

let gameSpeed = 12;
let snake, food, cols, rows;

class Snake {
  constructor(p) {
    this.p = p;
    this.pos = p.createVector(p.width / 2, p.height / 2);
    this.dir = p.createVector(10, 0);
    this.history = [];
    this.tail = 0;
  }

  edgeDetection() {
    if (
      this.pos.x == this.p.width ||
      this.pos.x < 0 ||
      this.pos.y == this.p.height ||
      this.pos.y < 0
    ) {
      this.p.noLoop();
    }
  }

  turn(x, y) {
    this.dir.x = x;
    this.dir.y = y;
  }

  grow() {
    this.tail++;
    this.p.frameRate(gameSpeed++);

    // increase speed every 3 foods eaten
    // if (this.tail % 3 === 0) {
    //   this.p.frameRate(gameSpeed++);
    // }
  }

  renderTail() {
    this.history.forEach(position => {
      this.p.fill(100, 225, 100);
      this.p.rect(position.x, position.y, 10);

      // Check if snake's head collides with it's tail
      if (p5.Vector.dist(position, this.pos) === 0) {
        this.p.noLoop();
      }
    });
  }

  update() {
    // Maintain a history of current position
    this.history.push(this.pos.copy());

    // History is only as long as snake's tail
    if (this.history.length > this.tail) {
      this.history.shift();
    }

    // Move snake and check position against borders
    this.pos.add(this.dir);
    this.edgeDetection();

    // If snake reaches food, it grows
    if (p5.Vector.dist(this.pos, food.pos) < 10) {
      food.setup();
      this.grow();
    }
  }

  render() {
    this.p.fill(120, 200, 70);
    this.p.rect(this.pos.x, this.pos.y, 10);
    this.renderTail();
  }
}

class Food {
  constructor(p) {
    this.p = p;
    this.setup();
  }

  setup() {
    // Randomize position, within predefined grid
    this.pos = this.p.createVector(
      Math.floor(Math.random() * cols) * 10,
      Math.floor(Math.random() * rows) * 10
    );

    // Don't allow food to spawn at snake's tail
    snake.history.forEach(tail => {
      if (p5.Vector.dist(tail, this.pos) < 10) {
        this.setup();
      }
    });
  }

  render() {
    this.p.fill(255, 100, 100);
    this.p.rect(this.pos.x, this.pos.y, 10);
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
    gameSpeed = 12;
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

    p.frameRate(gameSpeed);
    cols = p.width / 10;
    rows = p.height / 10;
    snake = new Snake(p);
    food = new Food(p);
  };

  p.draw = () => {
    p.background(220);
    snake.update();
    snake.render();
    food.render();
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        snake.turn(0, -10);
        break;
      case p.RIGHT_ARROW:
        snake.turn(10, 0);
        break;
      case p.DOWN_ARROW:
        snake.turn(0, 10);
        break;
      case p.LEFT_ARROW:
        snake.turn(-10, 0);
        break;
    }
  }
};
