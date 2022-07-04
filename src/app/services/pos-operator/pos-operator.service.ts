import { Injectable } from '@angular/core';
import { PosOperator } from '@models/Pos-operator';
import { Order } from '@models/order';

@Injectable({
    providedIn: 'root',
})
export class PosOperatorService implements PosOperator {
    constructor() {}

    createOrder(order: Order): number {
        return 0;
    }

    updateOrder(order: Order): number {
        return 0;
    }
}
