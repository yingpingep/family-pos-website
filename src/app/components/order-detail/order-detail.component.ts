import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@models/menu';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { map, Observable } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';
import { OrderMenuStore } from '@store/order-menu-store.service';
import { OrderInfo } from '@models/order';
import { PosOperatorService } from '@services/pos-operator/pos-operator.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
    providers: [provideComponentStore(OrderMenuStore)],
})
export class OrderDetailComponent implements OnInit {
    menu$!: Observable<Menu>;
    existSectionTypes$!: Observable<string[]>;
    sections$!: Observable<OrderInfo>;

    constructor(
        private orderMenuStore: OrderMenuStore,
        private menuOperator: MenuOperatorService,
        private posOperator: PosOperatorService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.menu$ = this.menuOperator
            .getMenu()
            .pipe(map((response) => response.menu));

        this.orderMenuStore.setState({ sections: {} });
        this.existSectionTypes$ = this.orderMenuStore.selectExistSectionTypes();
        this.sections$ = this.orderMenuStore.selectAllSections();
    }

    onCardClick(item: MenuItem): void {
        this.orderMenuStore.addItem(item);
    }

    onSubmitClick(id: number, info: OrderInfo): void {
        this.posOperator.create(id, info).subscribe(() => {
            this.router.navigate(['/', 'dashboard']).then();
        });
    }
}
