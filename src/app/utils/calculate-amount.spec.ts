import { MenuItem } from '@models/menu';
import { calculateAmount } from './calculate-amount';

describe('calculate-amount', () => {
    const menuItems: MenuItem[] = [
        {
            id: 1,
            name: '招牌鴨血',
            price: 20,
        },
        {
            id: 2,
            name: '麻辣豆腐',
            price: 20,
        },
        {
            id: 3,
            name: '韓式年糕',
            price: 25,
        },
    ];

    it('should calculate the sum for given items', () => {
        const amount = calculateAmount(menuItems);
        expect(amount).toBe(65);
    });
});
