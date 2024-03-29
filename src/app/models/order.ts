export enum OrderStatus {
    CREATED = 'created',
    UPDATED = 'updated',
    WAITING = 'waiting',
    CLOSED = 'closed',
}

export type Order = {
    id: number;
    amount: number;
    status: OrderStatus;
    info: OrderInfo;
    waitingNumber: number;
    createAt: number;
};

type OrderItemInfo = { id: number; count: number };
export type OrderInfo = {
    [key: string]: OrderItemInfo[];
};
