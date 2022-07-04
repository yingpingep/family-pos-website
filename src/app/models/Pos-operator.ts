import { Order, OrderRequest } from '@models/order';

export interface PosOperator {
    createOrder(request: OrderRequest): Order;
    updateOrder(oldOrder: Order, newRequest: OrderRequest): Order;
    closeOrder(order: Order): boolean;
}
