export interface Team {
    0?: Character['id'];
    1?: Character['id'];
    2?: Character['id'];
    3?: Character['id'];
}

export interface Character {
    id: number;
    abilities: [
        {
            abilityId: Ability['id'];
            level: number;
        }
    ];
    displayId: string;
    class: CharacterClass['id'];
}
export interface Ability {
    id: number;
    displayId: string;
}

export interface CharacterClass {
    id: number;
    displayId: string;
}
