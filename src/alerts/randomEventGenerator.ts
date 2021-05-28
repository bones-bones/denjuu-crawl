import { itemList } from '../data/items';
import { AlertWrapper } from './types';

export const randomEventGenerator = (): AlertWrapper['eventData'] | void => {
    const eventNumber = Math.floor(Math.random() * 50);
    if (eventNumber <= 20) {
        // dispatch items
        return {
            type: 'item',
            itemId: Math.floor(Math.random() * itemList.length),
        };
    } else if (eventNumber > 20 && eventNumber <= 40) {
        //dispatch fight
        return {
            type: 'battle',
            level: Math.floor(Math.random() * 3) + 1,
            denjuuId: 1,
        };
    }
};
