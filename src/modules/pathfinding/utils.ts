/**
 * Constrains the value to be between the min and max numbers.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}

/**
 * Calculates the distance between two points.
 */
export const taxicabDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

/**
 * Calculates the distance between two points.
 */
export const euclidianDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

/**
 * Calculates the angle, in radians, between two points.
 */
export const angleBetweenPoints = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1);
};

/**
 * Transforms arbitrary x, y pixel coordinates into nearest Hexagon's x, y
 * coordintes.
 */
export const pixelToHexCoordinates = (
    x: number,
    y: number,
    hexSize: number,
    hexWidth: number,
    hexOffsetX: number,
    hexOffsetY: number,
) => {
    const [col, row] = pixelToHex(x, y, hexSize);
    return {
        x: Math.round(col * hexOffsetX + (hexWidth / 2) * (row % 2)),
        y: Math.round(row * hexOffsetY)
    };
};

/**
 * Transforms offset coordinates (pixel coordinates) to column and row indexes
 * used to obtain a Hexagon out of a HexGrid's 2D array.
 */
export const pixelToHex = (x: number, y: number, hexSize: number) => {
    const q = ((Math.sqrt(3) / 3) * x - (1 / 3 * y)) / hexSize;
    const r = (2 / 3 * y) / hexSize;
    return axialToOffset(axialRound(q, r));
}

/**
 * Helper function to convert axial coordinates to offset coordinates.
 */
export const axialToOffset = ([q, r]: number[]) => {
    const col = q + (r - (r % 2)) / 2;
    const row = r;
    return [ col, row ];
}

/**
 * Helper function to round axial coordinates without converting into cubic
 * coordinates.
 */
export const axialRound = (x: number, y: number) => {
    const xgrid = Math.round(x);
    const ygrid = Math.round(y);
    x -= xgrid;
    y -= ygrid; // remainder
    const dx = Math.round(x + 0.5*y) * (x*x >= y*y ? 1 : 0);
    const dy = Math.round(y + 0.5*x) * (x*x < y*y ? 1 : 0);
    return [xgrid + dx, ygrid + dy];
}

/**
 * Generates a random integer between min and (up to but not including) max.
 */
export const randomInt = (min: number, max: number) => {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Selects a random item from the array
 */
export const randomItem = (arr: any[]) => {
    return arr[randomInt(0, arr.length)];
};

/**
 * Draws a straight line between two Hexagons
 */
export const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.strokeStyle = '#303446';
    ctx.stroke();
}
