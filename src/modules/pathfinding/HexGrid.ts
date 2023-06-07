import Hexagon from "./Hexagon";
import Terrain from "./Terrain";
import { ROWS, COLS, HEX_OFFSET_X, HEX_OFFSET_Y, HEX_WIDTH, TERRAIN_TYPE_IMG_TABLE, HEXAGON_RELATIVE_POSITION_MODIFIER } from "./defs";
import { taxicabDistance } from "./utils";

type HexGridProps = {
    map: number[][];
    topography: 'TERRAIN' | 'EVENTS' | 'FLAGS';
};

export default class HexGrid {

    private _grid: Hexagon[];

    constructor(props?: HexGridProps) {
        if (props && props.topography === 'TERRAIN') {
            this._grid = this.generateTerrain(props.map);
        } else if (props && props.topography === 'FLAGS') {
            this._grid = this.generateEndpoints(props.map);
        } else {
            this._grid = [];
        }
    }

    get grid() {
        return this._grid;
    }

    set grid(newGrid: Hexagon[]) {
        this._grid = newGrid;
    }

    getDistance(h1: Hexagon, h2: Hexagon) {
        return taxicabDistance(h1.x, h1.y, h2.x, h2.y);
    }

    getNeighbors(hex: Hexagon) {
        const { col, row } = hex;

        return [
            this.getHexagonAt(col, row, 'RIGHT'),
            this.getHexagonAt(col, row, 'TOP_RIGHT'),
            this.getHexagonAt(col, row, 'TOP_LEFT'),
            this.getHexagonAt(col, row, 'LEFT'),
            this.getHexagonAt(col, row, 'BOTTOM_LEFT'),
            this.getHexagonAt(col, row, 'BOTTOM_RIGHT')
        ].filter((hex): hex is Hexagon => Boolean(hex));
    }

    private getHexagonAt(col: number, row: number, direction: HexagonRelativePosition) {

        const [colModifier, rowModifier] =
            HEXAGON_RELATIVE_POSITION_MODIFIER[direction][row % 2];

        col = col + colModifier
        row = row + rowModifier;

        if (col < 0 || col >= ROWS || row < 0 || row >= COLS) return null;

        // return this.grid[col][row];
        return this._grid[row + col * COLS];
    }

    private generateTerrain(map: number[][]) {
        const terrainTypes = Object.keys(TERRAIN_TYPE_IMG_TABLE);

        const grid: Hexagon[] = [];

        for (let i = 0; i < ROWS; i++) {

            for (let j = 0; j < COLS; j++) {
                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);

                let mapIdx = map[i][j];

                if (mapIdx > 20) mapIdx -= 20;
                else if (mapIdx > 10) mapIdx -= 10;

                const hex = new Terrain({
                    x,
                    y,
                    col: i,
                    row: j,
                    terrainType: terrainTypes[mapIdx] as TerrainType
                });

                grid.push(hex);
            }
        }

        return grid;
    }

    private generateEndpoints(map: number[][]) {
        const grid: Hexagon[] = [];

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {

                const mapIdx = map[i][j];

                if (mapIdx < 10) continue;

                const x = Math.round(i * HEX_OFFSET_X + (HEX_WIDTH / 2) * (j % 2));
                const y = Math.round(j * HEX_OFFSET_Y);

                if (mapIdx > 20) {
                    grid.push(new Hexagon({
                        x,
                        y,
                        id: 'END',
                        image: 'wp-content/themes/devontheroof/assets/images/endHex.png'
                    }));
                } else if (mapIdx > 10) {
                    grid.push(new Hexagon({
                        x,
                        y,
                        id: 'START',
                        image: 'wp-content/themes/devontheroof/assets/images/startHex.png'
                    }));
                }
            }
        }

        return grid;
    }

    render(ctx: CanvasRenderingContext2D) {
        this._grid.forEach(hex => hex.render(ctx));
    }
}
