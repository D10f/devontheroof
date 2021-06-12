import { TILE_SIZE, MINIMAP_SCALE_FACTOR, ROWS, COLS } from './constants';

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
    const i = this.p.floor(x / TILE_SIZE);
    const j = this.p.floor(y / TILE_SIZE);
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

export default Grid;
