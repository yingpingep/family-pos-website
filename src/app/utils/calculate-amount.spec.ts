import { MenuItem } from '@models/menu';
import { calculateAmount } from './calculate-amount';
import { OrderItem, OrderSection } from '@models/order';

describe('calculate-amount', () => {
    const section: OrderSection = {
        type: '鮮食類',
        items: [
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
        ],
    };

    it('should calculate the sum for given items', () => {
        const amount = calculateAmount(section);
        expect(amount).toBe(65);
    });
});
