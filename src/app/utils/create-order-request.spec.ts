import { OrderItem, OrderRequest } from '@models/order';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { createOrderRequest } from './create-order-request';

describe('createOrderRequest', () => {
    const items = [
        {
            type: '鮮食類',
            id: 1,
            name: '招牌鴨血',
            count: 1,
            price: 20,
        },
        {
            type: '鮮食類',
            id: 2,
            name: '麻辣豆腐',
            count: 1,
            price: 20,
        },
        {
            type: '鮮食類',
            id: 3,
            name: '韓式年糕',
            count: 1,
            price: 25,
        },
    ];
    const sections: Map<string, OrderItem[]> = new Map([['鮮食類', items]]);

    it('should create proper OrderRequest', () => {
        const id = '1';
        const request: OrderRequest = createOrderRequest(id, sections);
        expect(request.id).toEqual(id);
        expect(request.sections).toContain({
            type: '鮮食類',
            items,
        });
    });
});
