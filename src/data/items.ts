import GameMachine from '../images/items/game_machine.gif';
import GasTank from '../images/items/gas_tank.gif';
import Gun from '../images/items/gun.gif';
import Antenna from '../images/items/antenna.gif';

interface Item {
    id: number;
    displayId: string;
    image: string;
    price: number;
}

export const itemList: Item[] = [
    {
        id: 0,
        displayId: 'Game Machine',
        image: GameMachine,
        price: 40,
    },
    {
        id: 1,
        displayId: 'Gas Tank',
        image: GasTank,
        price: 120,
    },
    {
        id: 2,
        displayId: 'Gun',
        image: Gun,
        price: 80,
    },
    {
        id: 3,
        displayId: 'Antenna',
        image: Antenna,
        price: 80,
    },
];
