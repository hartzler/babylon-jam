import { Vector3 } from "@babylonjs/core";
export declare class Game {
    objects: GameObject[];
    constructor();
    addObject(o: GameObject): void;
}
export declare class GameObject {
    id: string;
    position: Vector3;
}
export declare class Character extends GameObject {
    hitPoints: number;
}
