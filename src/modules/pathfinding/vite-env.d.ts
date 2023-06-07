/// <reference types="vite/client" />

type HexagonRelativePosition =
    'RIGHT'
    | 'TOP_RIGHT'
    | 'TOP_LEFT'
    | 'LEFT'
    | 'BOTTOM_LEFT'
    | 'BOTTOM_RIGHT';

type HexagonLookupTable = {
    [key in HexagonRelativePosition]: number[][]
}

type HexagonProps = {
    x: number;
    y: number;
    size?: number;
    color?: string;
    image?: string;
    imageAngle?: number;
    col?: number;
    row?: number;
    id?: string;
};

type TerrainProps = HexagonProps & {
    terrainType: TerrainType;
};

type EventCallback = (data?: any) => void;

type TerrainType =
    'DESERT'
    | 'GRASS'
    | 'MOUNTAIN'
    | 'ORE'
    | 'WATER'
    | 'WHEAT'
    | 'WOOD';

type FlagType =
'START'
| 'END';

type TerrainTypeImageTable = {
    [key in TerrainType]: string;
};

type TerrainTypeDifficultyTable = {
    [key in TerrainType]: number;
};

type FlagTypeImageTable = {
    [key in FlagType]: string;
};

type CursorEvent = {
    cursor: Hexagon;
    tile: TerrainType | FlagType | null;
}
