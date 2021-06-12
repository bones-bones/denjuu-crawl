import Antenna from '../images/items/antenna.gif';
import Crane from '../images/items/crane.gif';
import Flamethrower from '../images/items/flame_thrower.gif';
import GameMachine from '../images/items/game_machine.gif';
import GasTank from '../images/items/gas_tank.gif';
import Gun from '../images/items/gun.gif';
import Pencil from '../images/items/pencil.gif';
import SmallPotion from '../images/items/S_ItemLightOutline_PotionRed_00.png';
import Sabre from '../images/items/sabre.gif';

interface Item {
    id: number;
    displayId: string;
    image: string;
    price: number;
    effect: ItemEffect;
    description: string;
}

interface ItemEffect {
    type: ItemEffectType;
    value?: number;
}

export enum ItemEffectType {
    Experience = 'Experience', // how do we seperate this from evolution items????
    HealHp = 'HealHp',
}

export const itemList: Item[] = [
    {
        id: 0,
        displayId: 'Game Machine',
        image: GameMachine,
        price: 40,
        description: 'A electronic portable game playing device',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 1,
        displayId: 'Gas Tank',
        image: GasTank,
        price: 120,
        description: 'What kind of gass is in this? Who knows but it\'s probably flamable',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 2,
        displayId: 'Gun',
        image: Gun,
        price: 80,
        description: 'Why do you have so many guns?',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 3,
        displayId: 'Antenna',
        image: Antenna,
        price: 80,
        description: 'You can pick up some odd signals with this',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 4,
        displayId: 'Small Potion',
        image: SmallPotion,
        price: 50,
        description: 'This will heal a denjuu a little bit.',
        effect: { type: ItemEffectType.HealHp, value: 20 },
    },
    {
        id: 5,
        displayId: 'Crane',
        price: 400,
        image: Crane,
        description: 'Very good for lifting heavy things',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 6,
        displayId: 'Sabre',
        price: 35,
        image: Sabre,
        description: 'A curved sword with a sharp edge. Watch out!',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 7,
        displayId: 'Flamethrower',
        price: 130,
        image: Flamethrower,
        description: 'For when you need things toasty up close',
        effect: { type: ItemEffectType.Experience },
    },
    {
        id: 8,
        displayId: 'Pencil',
        price: 5,
        image: Pencil,
        description: 'Number 2',
        effect: { type: ItemEffectType.Experience },
    },
];
