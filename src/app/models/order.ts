import { MenuItem } from '@models/menu';

export enum OrderStatus {
    CREATED = 'created',
    UPDATED = 'updated',
    CLOSED = 'closed',
}

type OrderBase = {
    serial: number;
    items: MenuItem[];
};

export type Order = OrderBase & {
    amount: number;
    status: OrderStatus;
};

export type OrderRequest = OrderBase;
