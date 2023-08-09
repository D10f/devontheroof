// export const ALLOW_DIAGONAL = false;
// export const CELL_SIZE = 30;
// export const COLS = Math.floor(800 / CELL_SIZE);
// export const ROWS = Math.floor(640 / CELL_SIZE);

export const FPS = 30;
export const HEX_WIDTH = 55;
export const HEX_SIZE = HEX_WIDTH / Math.sqrt(3);
export const HEX_OFFSET_X = HEX_WIDTH;
export const HEX_OFFSET_Y = HEX_SIZE * 1.5;

export const COLS = Math.ceil(800 / HEX_WIDTH);
// export const ROWS = Math.floor(640 / HEX_OFFSET_Y);
export const ROWS = COLS;

// export const COLS = 30;
// export const ROWS = 30;

export const ENDPOINT_TOKEN_IMG_TABLE: FlagTypeImageTable = {
    START: 'wp-content/themes/devontheroof/assets/images/startHex.png',
    END: 'wp-content/themes/devontheroof/assets/images/endHex.png',
    // ERROR: 'wp-content/themes/devontheroof/assets/images/errorHex.png'
};

export const TERRAIN_TYPE_IMG_TABLE: TerrainTypeImageTable = {
    DESERT: 'wp-content/themes/devontheroof/assets/images/desertHex.gif',
    GRASS: 'wp-content/themes/devontheroof/assets/images/grassHex.gif',
    MOUNTAIN: 'wp-content/themes/devontheroof/assets/images/mountainHex.gif',
    ORE: 'wp-content/themes/devontheroof/assets/images/oreHex.gif',
    WATER: 'wp-content/themes/devontheroof/assets/images/waterHex.gif',
    WHEAT: 'wp-content/themes/devontheroof/assets/images/wheatHex.gif',
    WOOD: 'wp-content/themes/devontheroof/assets/images/woodHex.gif',
};

export const TERRAIN_TYPE_DIFFICULTY_TABLE: TerrainTypeDifficultyTable = {
    DESERT: 5,
    GRASS: 1,
    MOUNTAIN: 10,
    ORE: 8,
    WATER: Infinity,
    WHEAT: 3,
    WOOD: 7,
};

export const HEXAGON_RELATIVE_POSITION_MODIFIER = {
    // even rows (0) odd rows (1)
    RIGHT: [[+1,  0], [+1,  0]],
    TOP_RIGHT: [[ 0, -1],  [+1, -1]],
    TOP_LEFT: [[-1, -1], [ 0, -1]],
    LEFT: [[-1,  0], [-1,  0]],
    BOTTOM_LEFT: [[-1, +1], [ 0, +1]],
    BOTTOM_RIGHT: [[ 0, +1], [+1, +1]],
};

export enum LAYERS {
    TERRAIN,
    MIDDLE,
    TOP
};

export const mapOr = [
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,1,1,6,6,6,4,4,4,4,1,1,1,4,4],
    [4,1,1,1,6,6,4,4,4,4,5,11,1,4,4],
    [4,1,1,0,1,1,6,6,4,1,1,5,1,4,4],
    [4,1,0,3,0,1,6,1,1,4,5,4,5,4,4],
    [4,1,3,3,0,1,6,1,1,4,4,4,4,4,4],
    [4,1,3,3,3,0,1,6,6,6,4,4,4,4,4],
    [4,1,3,0,0,1,1,2,6,6,6,4,4,4,4],
    [4,1,0,0,1,2,2,2,1,1,6,6,6,4,4],
    [4,1,0,1,1,2,2,1,1,1,1,6,6,4,4],
    [4,1,1,1,1,2,2,1,5,5,1,1,1,4,4],
    [4,1,1,1,1,1,1,1,5,5,1,1,1,4,4],
    [4,1,1,1,1,1,5,5,4,5,21,1,1,4,4],
    [4,1,1,1,1,1,5,1,5,1,1,1,1,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];

export const map2 = [
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,1,1,1,1,0,1,1,4,4,1,1,1,4,4],
    [4,1,3,3,1,1,0,1,4,4,5,1,1,4,4],
    [4,1,3,3,11,5,5,1,4,4,1,5,1,4,4],
    [4,2,3,4,5,5,5,4,4,4,5,4,5,4,4],
    [4,1,2,4,4,6,5,6,4,4,4,4,4,4,4],
    [4,1,6,6,4,4,6,6,4,4,4,4,4,4,4],
    [4,4,6,6,4,4,6,6,4,4,6,4,4,4,4],
    [4,4,2,2,6,2,4,0,4,4,6,6,6,4,4],
    [4,1,2,2,2,2,2,0,4,4,1,6,6,4,4],
    [4,1,1,2,2,2,2,0,4,4,1,1,1,4,4],
    [4,1,5,1,11,0,2,0,4,4,1,1,1,4,4],
    [4,1,5,5,1,0,0,1,4,4,1,1,1,4,4],
    [4,1,1,1,1,1,0,1,4,4,1,1,1,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];

export const map = [
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,0,0,4,4,4,4,1,1,1,4,4],
    [4,4,1,1,0,1,0,4,4,4,5,1,1,4,4],
    [4,1,1,3,1,5,5,4,4,4,1,5,1,4,4],
    [4,1,3,4,5,15,5,4,4,4,5,4,5,4,4],
    [4,0,1,4,4,6,5,6,4,4,4,4,4,4,4],
    [4,0,1,6,4,4,6,6,4,4,4,4,4,4,4],
    [4,4,1,2,6,4,6,6,4,4,6,4,4,4,4],
    [4,4,2,2,4,4,4,6,4,4,6,6,6,4,4],
    [4,1,2,2,4,2,2,6,4,4,1,6,6,4,4],
    [4,1,6,6,2,2,2,4,4,4,1,1,1,4,4],
    [4,1,6,1,1,0,4,4,4,4,1,1,1,4,4],
    [4,1,5,5,21,0,0,1,4,4,1,1,1,4,4],
    [4,4,1,1,1,1,0,1,4,4,1,1,1,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];
