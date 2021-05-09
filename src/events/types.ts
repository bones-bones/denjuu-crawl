
export interface Event {
    type: 'item' | 'battle',
    id: string,
    message: string
}

export interface ItemEvent extends Event {
    type: 'item'
    itemId: string
}

export interface BattleEvent extends Event {
    type: 'battle'
    opponent: string
}

export interface EventState {
    events: Event[]
}