import { OrderSection } from '@models/order';

export function calculateAmount(section: OrderSection): number {
    return section.items
        .map((item) => item.price * item.count)
        .reduce((p, c) => p + c);
}
