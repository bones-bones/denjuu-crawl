export interface Item {
    itemId: number,
    count: number
}

export interface Inventory {
    items: Item[]
}
export interface ItemForTransaction {
    itemId: number
}