import { Injectable } from '@angular/core';
import { PosOperator } from '@models/pos-operator';
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
            amount: request.sections
                .map((section) => calculateAmount(section.items))
                .reduce((p, c) => p + c),
            status: OrderStatus.CREATED,
        };
    }

    updateOrder(oldOrder: Order, newRequest: OrderRequest): Order {
        return {
            ...oldOrder,
            sections: [...newRequest.sections],
            amount: newRequest.sections
                .map((section) => calculateAmount(section.items))
                .reduce((p, c) => p + c),
            status: OrderStatus.UPDATED,
        };
    }

    closeOrder(order: Order): boolean {
        order.status = OrderStatus.CLOSED;
        return true;
    }
}
