import Hexagon from "./Hexagon";
import { TERRAIN_TYPE_DIFFICULTY_TABLE, TERRAIN_TYPE_IMG_TABLE } from "./defs";

export default class Terrain extends Hexagon {

    public type: TerrainType;
    public difficulty: number;

    constructor({ terrainType, ...rest }: TerrainProps) {
        super({ ...rest });

        this.type = terrainType;
        this.difficulty = TERRAIN_TYPE_DIFFICULTY_TABLE[terrainType];
        this.image.src = TERRAIN_TYPE_IMG_TABLE[terrainType];
    }

    setType(type: TerrainType) {
        this.type = type;
        this.difficulty = TERRAIN_TYPE_DIFFICULTY_TABLE[type];
        this.image.src = TERRAIN_TYPE_IMG_TABLE[type];
    }
}
