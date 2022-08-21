import { Vector3 } from "@babylonjs/core";

export class Game {
    objects: GameObject[];

    constructor() {
        this.objects = [];
    }

    addObject(o: GameObject): void {
        this.objects.push(o);
    }

}

export class GameObject {
    // object id
    id: string;

    // position in world coordinates
    position: Vector3;


}

export class Character extends GameObject {

    // the health of the character
    hitPoints: number;

    
}

class Stats {
    // attributes
    // physical
    strength: number;
    dexterity: number;
    constitution: number;
    
    // mental
    intelligence: number;
    wisdom: number;
    charisma: number; // EQ?

    // spiritual
    luck: number;
    piety: number;
    alignment: string;

    // appearance
    height: number;
    weight: number;
    comliness: number;

    // personality
    consienciousness: number; // 0-99
    agreeableness: number;    // 0-99
    extraversion: number;     // 0-99
    openess: number;          // 0-99
    nueroticism: number;      // 0-99
 
    // health
    health: number;
    stamina: number;
    hyrdation: number;
    calories: number;
    fat: number;
    protien: number;
    vitamins: number;

}