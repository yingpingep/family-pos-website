import { TestBed } from '@angular/core/testing';

import { PreviewOperatorService } from './preview-operator.service';
import { OrderItem } from '@models/order';
import { take } from 'rxjs';

describe('PreviewOperatorService', () => {
    let service: PreviewOperatorService;
    const item: OrderItem = {
        count: 1,
        id: 1,
        name: '招牌鴨血',
        price: 20,
        type: '鮮食類',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PreviewOperatorService);
        service.reset();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create order in preview service', (done) => {
        service.addOrderItem(item);
        service.orderSections$.pipe(take(1)).subscribe((sections) => {
            const section = sections.get('鮮食類');
            expect(sections.has('鮮食類')).toBeTruthy();

            if (section) {
                expect(section[0]).toEqual(item);
            }
            done();
        });
    });

    it('should add one more for the same item', (done) => {
        service.addOrderItem(item);
        service.addOrderItem(item);
        service.orderSections$.pipe(take(1)).subscribe((sections) => {
            const section = sections.get('鮮食類');
            expect(section).toBeTruthy();
            if (section) {
                expect(section[0].count).toEqual(2);
            }
            done();
        });
    });

    it('should delete order item from preview layout', (done) => {
        service.addOrderItem(item);
        service.deleteOrderItem(item.type, item.id);
        service.orderSections$.pipe(take(1)).subscribe((sections) => {
            const section = sections.get(item.type);
            expect(section).toBeTruthy();

            if (section) {
                expect(section[0]).toBeFalsy();
            }

            done();
        });
    });

    it('should modify count of specify item', (done) => {
        service.addOrderItem(item);
        service.updateOrderItemCount(item.type, item.id, 3);
        service.orderSections$.pipe(take(1)).subscribe((sections) => {
            const section = sections.get(item.type);
            expect(section).toBeTruthy();

            if (section) {
                expect(section[0].count).toEqual(3);
            }

            done();
        });
    });
});
