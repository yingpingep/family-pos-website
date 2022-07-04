import { Injectable } from '@angular/core';
import { PosOperator } from '@models/Pos-operator';
import { Order, OrderRequest, OrderStatus } from '@models/order';

@Injectable({
    providedIn: 'root',
})
export class PosOperatorService implements PosOperator {
    constructor() {}

    createOrder(order: OrderRequest): Order {
        return {
            ...order,
            amount: order.items
                .map((item) => item.price)
                .reduce((previous, current) => previous + current),
            status: OrderStatus.CREATED,
        };
    }

    updateOrder(order: OrderRequest): Order {
        return {} as Order;
    }
}
