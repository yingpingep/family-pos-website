import { TestBed } from '@angular/core/testing';

import { MenuOperatorService } from './menu-operator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuOperatorService', () => {
    let service: MenuOperatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MenuOperatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
