import { OrderItem, OrderRequest, OrderSection } from '@models/order';

export function createOrderRequest(
    id: string,
    sections: Map<string, OrderItem[]>
): OrderRequest {
    const orderSections: OrderSection[] = [];
    for (const [type, items] of sections) {
        orderSections.push({
            type,
            items,
        });
    }

    return {
        id,
        sections: orderSections,
    };
}
