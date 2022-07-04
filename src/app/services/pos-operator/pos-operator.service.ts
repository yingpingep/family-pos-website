import { Injectable } from '@angular/core';
import { PosOperator } from '@models/Pos-operator';
import { Order, OrderRequest, OrderStatus } from '@models/order';
import { calculateAmount } from '@utils';

@Injectable({
    providedIn: 'root',
})
export class PosOperatorService implements PosOperator {
    constructor() {}

    createOrder(request: OrderRequest): Order {
        return {
            ...request,
            amount: calculateAmount(request.items),
            status: OrderStatus.CREATED,
        };
    }

    updateOrder(oldOrder: Order, newRequest: OrderRequest): Order {
        return {
            ...oldOrder,
            items: [...newRequest.items],
            amount: calculateAmount(newRequest.items),
            status: OrderStatus.UPDATED,
        };
    }

    closeOrder(order: Order): boolean {
        order.status = OrderStatus.CLOSED;
        return true;
    }
}
