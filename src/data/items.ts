interface Item {
    id: number;
    displayId: string;
    image: string;
    price: number;
}

export const itemList: Item[] = [
    { id: 0, displayId: "Game Machine", image: "https://www.wiki.telefang.net/images/0/0e/T1-I-49.gif", price: 40 },
    { id: 1, displayId: 'Gas Tank', image: 'https://www.wiki.telefang.net/images/3/3f/T1-I-43.gif', price: 120 }
]