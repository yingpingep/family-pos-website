import { OrderItem } from '@models/order';

export function calculateAmount(section: OrderItem[]): number {
    return section
        .map((item) => item.price * item.count)
        .reduce((p, c) => p + c);
}
