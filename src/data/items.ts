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
        image: 'https://www.wiki.telefang.net/images/0/0e/T1-I-49.gif',
        price: 40,
    },
    {
        id: 1,
        displayId: 'Gas Tank',
        image: 'https://www.wiki.telefang.net/images/3/3f/T1-I-43.gif',
        price: 120,
    },
    {
        id: 2,
        displayId: 'Gun',
        image: 'https://www.wiki.telefang.net/images/3/38/T1-I-01.gif',
        price: 80,
    },
    {
        id: 3,
        displayId: 'Antenna',
        image: 'https://www.wiki.telefang.net/images/0/0b/T1-I-19.gif',
        price: 80,
    },
];
