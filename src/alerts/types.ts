// This is a mess, figure out how to subclass better

export interface Event {
    type: 'item' | 'battle' | 'message';

}

export interface ItemEvent extends Event {
    type: 'item';
    itemId: string;
}

export interface MessageEvent extends Event {
    type: 'message'
    message: string;
}

export interface BattleEvent extends Event {
    type: 'battle';
    denjuuId: number;
    level: number
}

export interface EventWrapper {
    eventData: ItemEvent | MessageEvent | BattleEvent
    id: number
}
export interface EventState {
    lastNotification: number,
    events: EventWrapper[];
}
