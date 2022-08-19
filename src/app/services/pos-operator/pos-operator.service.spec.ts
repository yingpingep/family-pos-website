import { TestBed } from '@angular/core/testing';

import { PosOperatorService } from './pos-operator.service';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { OrderInfo } from '@models/order';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

const MockMenuOperatorFactory = () => {
    const map = new Map<number, { id: number; price: number }>([
        [1, { id: 1, price: 20 }],
        [2, { id: 2, price: 20 }],
        [82, { id: 82, price: 15 }],
    ]);
    return {
        getMenuItem: (id: number) => {
            return map.get(id);
        },
    };
};

describe('PosOperatorService', () => {
    let service: PosOperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [
                {
                    provide: MenuOperatorService,
                    useFactory: MockMenuOperatorFactory,
                },
            ],
        });

        service = TestBed.inject(PosOperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get 80', (done) => {
        const orderInfo: OrderInfo = {
            鮮食類: [
                {
                    id: 1,
                    count: 2,
                },
                { id: 2, count: 2 },
            ],
        };
        service.calculateAmount(orderInfo).subscribe((amount) => {
            expect(amount).toBe(80);
        });

        done();
    });

    it('should get 95', (done) => {
        const orderInfo: OrderInfo = {
            鮮食類: [
                {
                    id: 1,
                    count: 2,
                },
                { id: 2, count: 2 },
            ],
            麵食類: [
                {
                    id: 82,
                    count: 1,
                },
            ],
        };
        service.calculateAmount(orderInfo).subscribe((amount) => {
            expect(amount).toBe(95);
        });

        done();
    });
});
