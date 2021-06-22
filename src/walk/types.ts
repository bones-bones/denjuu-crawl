import { MonsterType } from '../data';

export interface Tile {
    x: number;
    y: number;
    width?: number;
    height?: number;
}

export type AppWalkState = {
    step: {
        value: number;
        lastUpdatedTime: number;
        triggerCount: number;
    };
    location?: {
        type: MonsterType;
        map: Array<Tile[]>;
};
};
