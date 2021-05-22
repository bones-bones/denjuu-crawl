// This is a mess, figure out how to subclass better

export interface Alert {
    type: 'item' | 'battle' | 'message';
}

export interface ItemAlert extends Alert {
    type: 'item';
    itemId: number;
}

export interface MessageAlert extends Alert {
    type: 'message';
    message: string;
}

export interface BattleAlert extends Alert {
    type: 'battle';
    denjuuId: number;
    level: number;
}

export interface AlertWrapper {
    eventData: ItemAlert | MessageAlert | BattleAlert;
    id: number;
}

export interface AlertState {
    lastNotification: number;
    events: AlertWrapper[];
}
