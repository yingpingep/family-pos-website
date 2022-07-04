import { TestBed } from '@angular/core/testing';

import { PosOperatorService } from './pos-operator.service';

describe('PosOperatorService', () => {
    let service: PosOperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PosOperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
