import { TestBed } from '@angular/core/testing';
import { PosOperatorService } from './pos-operator.service';
import { Order, OrderRequest, OrderSection, OrderStatus } from '@models/order';

const getOrderRequest = (length: number): OrderRequest => {
    const sections: OrderSection[] = [
        {
            type: '鮮食類',
            items: [
                {
                    type: '鮮食類',
                    id: 1,
                    name: '招牌鴨血',
                    price: 20,
                    count: 1,
                },
                {
                    type: '鮮食類',
                    id: 2,
                    name: '麻辣豆腐',
                    price: 20,
                    count: 1,
                },
                {
                    type: '鮮食類',
                    id: 3,
                    name: '韓式年糕',
                    price: 25,
                    count: 1,
                },
                {
                    type: '鮮食類',
                    id: 4,
                    name: '花干',
                    price: 25,
                    count: 1,
                },
                {
                    type: '鮮食類',
                    id: 5,
                    name: '甜不辣',
                    price: 20,
                    count: 1,
                },
                {
                    type: '鮮食類',
                    id: 6,
                    name: '豬耳朵',
                    price: 30,
                    count: 1,
                },
            ].slice(0, length),
        },
    ];
    return {
        id: '1',
        sections,
    };
};

describe('PosOperatorService', () => {
    let service: PosOperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PosOperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createOrder', () => {
        it('should return amount of the order ticket with 1 item', () => {
            const order = service.createOrder(getOrderRequest(1));
            expect(order.amount).toBe(20);
        });

        it('should return amount of the order ticket with 5 item', () => {
            const order = service.createOrder(getOrderRequest(6));
            expect(order.amount).toBe(140);
        });

        it('should change status to created', () => {
            const order = service.createOrder(getOrderRequest(1));
            expect(order.status).toBe(OrderStatus.CREATED);
        });
    });

    describe('updateOrder', () => {
        let order: Order;
        beforeEach(() => {
            order = service.createOrder(getOrderRequest(1));
        });

        it('should keep serial unchanged', () => {
            const newOrder = service.updateOrder(order, getOrderRequest(3));
            expect(newOrder.id).toBe(order.id);
        });

        it('should update order items', () => {
            const newRequest = getOrderRequest(4);
            const newOrder = service.updateOrder(order, newRequest);
            expect(newOrder.sections).toEqual(newRequest.sections);
        });

        it('should update order amount', () => {
            const newRequest = getOrderRequest(6);
            const newOrder = service.updateOrder(order, newRequest);
            expect(newOrder.amount).toBe(140);
        });

        it('should change status to updated', () => {
            const newRequest = getOrderRequest(6);
            const newOrder = service.updateOrder(order, newRequest);
            expect(newOrder.status).toBe(OrderStatus.UPDATED);
        });
    });
});
