import { Component, OnInit } from '@angular/core';
import { PreviewOperatorService } from '@services/preview-operator/preview-operator.service';
import { Menu, MenuItem } from '@models/menu';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
    menu$: Observable<Menu> | undefined;

    constructor(
        private menuOperator: MenuOperatorService,
        private previewOperator: PreviewOperatorService
    ) {}

    ngOnInit(): void {
        this.menu$ = this.menuOperator
            .getMenu()
            .pipe(map((response) => response.menu));
    }

    onCardClick(item: MenuItem): void {
        this.previewOperator.addOrderItem({
            ...item,
            count: 1,
        });
    }
}
