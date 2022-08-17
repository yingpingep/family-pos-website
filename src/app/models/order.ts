import { MenuItem } from '@models/menu';

export enum OrderStatus {
    CREATED = 'created',
    UPDATED = 'updated',
    WAITING = 'waiting',
    CLOSED = 'closed',
}

export type OrderItem = MenuItem & {
    count: number;
};

export type OrderSection = {
    type: string;
    items: OrderItem[];
};

type OrderBase = {
    id: string;
    sections: OrderSection[];
};

export type Order = OrderBase & {
    amount: number;
    status: OrderStatus;
};

export type OrderRequest = OrderBase;
