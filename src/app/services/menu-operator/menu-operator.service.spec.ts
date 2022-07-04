import { TestBed } from '@angular/core/testing';

import { MenuOperatorService } from './menu-operator.service';

describe('MenuOperatorService', () => {
    let service: MenuOperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MenuOperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
