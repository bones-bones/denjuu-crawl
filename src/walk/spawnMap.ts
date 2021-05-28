import { MonsterType } from '../data';
import { Tile } from './types';

export const getMapForType = (type: MonsterType) => {
    switch (type) {
        case MonsterType.Desert: {
            return getDesert();
        }
        case MonsterType.Mountain: {
            return getMountain();
        }
        case MonsterType.Forest: {
            return getForest();
        }
        case MonsterType.Grassland: {
            return getGrassland();
        }
        case MonsterType.Aquatic: {
            return getAquatic();
        }
        case MonsterType.Sky: {
            return getGrassland();
        }
    }
};

export const getDesert = () => {
    const mapArray: Array<Tile[]> = [[], [], [], [], [], [], [], []];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const grassTiles = [
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.mediumSand,
                tilemap.rockySand,
                tilemap.mediumSandWithRock,
            ];
            const tileToRender =
                grassTiles[Math.floor(Math.random() * grassTiles.length)];
            mapArray[y][x] = tileToRender;
        }
    }
    return mapArray;
};

export const getForest = () => {
    const mapArray: Array<Tile[]> = [[], [], [], [], [], [], [], []];

    const getForestTile = () => {
        const forestTiles = [tilemap.mediumGrass, tilemap.bigTree];
        return forestTiles[Math.floor(Math.random() * forestTiles.length)];
    };

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y == 3) {
                mapArray[y][x] = tilemap.bGrassSquare;
            } else if (y == 4) {
                mapArray[y][x] = tilemap.iGrassSquare;
            }
        }
    }

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (!mapArray[y][x]) {
                while (!mapArray[y][x]) {
                    const proposedTile = getForestTile();
                    let tileFits = true;
                    validityLoop: for (
                        let i = 0;
                        i < (proposedTile.width || 1);
                        i++
                    ) {
                        for (let j = 0; j < (proposedTile.height || 1); j++) {
                            if (
                                y + j >= 8 ||
                                x + i >= 8 ||
                                mapArray[y + j][x + i]
                            ) {
                                tileFits = false;
                                break validityLoop;
                            }
                        }
                    }
                    if (tileFits) {
                        for (let i = 0; i < (proposedTile.width || 1); i++) {
                            for (
                                let j = 0;
                                j < (proposedTile.height || 1);
                                j++
                            ) {
                                mapArray[y + j][x + i] = {
                                    x: proposedTile.x + i,
                                    y: proposedTile.y + j,
                                };
                            }
                        }
                    }
                }
            }
        }
    }
    return mapArray;
};

export const getGrassland = () => {
    const mapArray: Array<Tile[]> = [[], [], [], [], [], [], [], []];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y == 3) {
                mapArray[y][x] = tilemap.bGrassSquare;
            } else if (y == 4) {
                mapArray[y][x] = tilemap.iGrassSquare;
            } else {
                const grassTiles = [
                    tilemap.mediumGrass,
                    tilemap.tallGrass,
                    tilemap.greenGrass,
                ];

                const tileToRender =
                    grassTiles[Math.floor(Math.random() * grassTiles.length)];
                mapArray[y][x] = tileToRender;
            }
        }
    }
    return mapArray;
};

export const getAquatic = () => {
    const mapArray: Array<Tile[]> = [[], [], [], [], [], [], [], []];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y == 3) {
                mapArray[y][x] = tilemap.bDirt;
            } else if (y == 4) {
                mapArray[y][x] = tilemap.lightCoast;
            } else {
                const grassTiles = [tilemap.calmWater, tilemap.rockyCalmWater];

                const tileToRender =
                    grassTiles[Math.floor(Math.random() * grassTiles.length)];
                mapArray[y][x] = tileToRender;
            }
        }
    }
    return mapArray;
};

export const getMountain = () => {
    const mapArray: Array<Tile[]> = [[], [], [], [], [], [], [], []];
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y < 3) {
                const wallOrLanding =
                    Math.floor(Math.random() * 6) == 0
                        ? tilemap.eDirt
                        : tilemap.rockWall;
                mapArray[y][x] = wallOrLanding;
            } else if (y == 3) {
                mapArray[y][x] = tilemap.eDirt;
            } else if (y == 4) {
                mapArray[y][x] = tilemap.rockWall;
            } else {
                mapArray[y][x] = tilemap.rockWall;
            }
        }
    }
    return mapArray;
};

//[MonsterType.Sky]: Sky,
// uhhh I'm not sure how to handle this...

export const tilemap: { [key: string]: Tile } = {
    mediumGrass: { x: 0, y: 0 },
    tallGrass: { x: 1, y: 0 },
    mediumSand: { x: 2, y: 0 },
    mediumSandWithRock: { x: 3, y: 0 },
    rockySand: { x: 4, y: 0 },
    crate: { x: 5, y: 0 },
    barrel: { x: 6, y: 0 },
    swamp1: { x: 7, y: 0 },
    roofTile: { x: 8, y: 0 },
    steps: { x: 9, y: 0 },
    desk: { x: 10, y: 0 },
    roof: { x: 11, y: 0, width: 3, height: 3 },
    redCarpet: { x: 14, y: 0, width: 3, height: 3 },
    blueCarpet: { x: 17, y: 0, width: 3, height: 3 },
    pottedTree: { x: 20, y: 0, height: 2 },
    bed: { x: 21, y: 0, height: 2 },
    blueTile: { x: 24, y: 0 },
    lightGrass: { x: 25, y: 0 },
    redEarth: { x: 26, y: 0 },
    backRail: { x: 27, y: 0, width: 3 },
    roofTileBrown: { x: 30, y: 0 },
    roofTileRed: { x: 31, y: 0 },
    roofTileGreen: { x: 32, y: 0 },
    redRoofBuilding: { x: 33, y: 0, width: 3, height: 2 }, //hey probably break this up

    //next line
    calmWater: { x: 0, y: 1 },
    roughWater: { x: 1, y: 1 },
    rockyCalmWater: { x: 2, y: 1 },
    rockyRoughWater: { x: 3, y: 1 },
    waterWithShadow: { x: 4, y: 1 },
    chest: { x: 5, y: 1 },
    stump: { x: 6, y: 1 },
    swamp2: { x: 7, y: 1 },
    blueCounter: { x: 8, y: 1, width: 3 },
    sand: { x: 24, y: 1 },
    greenGrass: { x: 25, y: 1 },
    brownEarth: { x: 26, y: 1 },
    frontRail: { x: 27, y: 1, width: 3 },
    buildingFront: { x: 30, y: 1, width: 3 },

    //next line
    ladderDown: { x: 4, y: 2 },
    aDirt: { x: 5, y: 2 },
    bDirt: { x: 6, y: 2 },
    cDirt: { x: 7, y: 2 }, //a,b,c
    dDirt: { x: 5, y: 3 }, //d,e,f
    eDirt: { x: 6, y: 3 },
    fDirt: { x: 7, y: 3 },

    //BIG SKIP
    //I've offset it one from the start
    rockWall: { x: 6, y: 5 },

    //BIG SKIP
    bigTree: { x: 6, y: 9, width: 2, height: 2 },

    //BIG SKIP
    aGrassSquare: { x: 0, y: 11 },
    bGrassSquare: { x: 1, y: 11 },
    cGrassSquare: { x: 2, y: 11 },
    eGrassSquare: { x: 0, y: 12 }, //a,b,c
    fGrassSquare: { x: 1, y: 12 }, //d,e,f
    gGrassSquare: { x: 2, y: 12 }, //g,h,i
    hGrassSquare: { x: 0, y: 13 },
    iGrassSquare: { x: 1, y: 13 },
    jGrassSquare: { x: 2, y: 13 },

    //Big Skip
    darkCoast: { x: 3, y: 14 },
    lightCoast: { x: 5, y: 14 },
};
