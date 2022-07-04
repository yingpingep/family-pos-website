import { Order, OrderRequest } from '@models/order';

export interface PosOperator {
    createOrder(order: OrderRequest): Order;
    updateOrder(order: OrderRequest): Order;
}
