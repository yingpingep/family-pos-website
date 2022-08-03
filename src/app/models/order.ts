import { MenuItem } from '@models/menu';

export enum OrderStatus {
    CREATED = 'created',
    UPDATED = 'updated',
    CLOSED = 'closed',
}

type OrderBase = {
    id: number;
    items: MenuItem[];
};

export type Order = OrderBase & {
    amount: number;
    status: OrderStatus;
};

export type OrderRequest = OrderBase;
