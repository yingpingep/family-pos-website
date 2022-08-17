import { OrderStatusPipe } from './order-status.pipe';
import { OrderStatus } from '@models/order';
import { expect } from '@angular/flex-layout/_private-utils/testing';

describe('OrderStatusPipe', () => {
    let pipe: OrderStatusPipe;

    beforeEach(() => {
        pipe = new OrderStatusPipe();
    });

    it('should translate CLOSED to 已取餐', () => {
        const result = pipe.transform(OrderStatus.CLOSED);
        expect(result).toEqual('已取餐');
    });

    it('should translate WAITING to 待取餐', () => {
        const result = pipe.transform(OrderStatus.WAITING);
        expect(result).toEqual('待取餐');
    });

    it('should translate CREATED to 訂單已建立', () => {
        const result = pipe.transform(OrderStatus.CREATED);
        expect(result).toEqual('訂單已建立');
    });

    it('should translate UPDATED to 訂單已更新', () => {
        const result = pipe.transform(OrderStatus.UPDATED);
        expect(result).toEqual('訂單已更新');
    });
});
