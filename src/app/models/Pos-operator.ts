import { Order } from '@models/order';

export interface PosOperator {
    createOrder(order: Order): number;
    updateOrder(order: Order): number;
}
