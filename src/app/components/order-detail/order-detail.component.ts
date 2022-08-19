import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '@models/menu';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';
import { OrderMenuStore } from '@store/order-menu-store.service';
import { OrderInfo } from '@models/order';
import { PosOperatorService } from '@services/pos-operator/pos-operator.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    orderId$!: Observable<number | null>;
    isUpdating$!: Observable<boolean>;

    constructor(
        private orderMenuStore: OrderMenuStore,
        private menuOperator: MenuOperatorService,
        private posOperator: PosOperatorService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.menu$ = this.menuOperator
            .getMenu()
            .pipe(map((response) => response.menu));

        this.orderMenuStore.setState({ sections: {} });
        this.existSectionTypes$ = this.orderMenuStore.selectExistSectionTypes();
        this.sections$ = this.orderMenuStore.selectAllSections();
        this.orderId$ = this.route.paramMap.pipe(
            map((paramMap) => {
                const param = paramMap.get('id');
                return param ? parseInt(param) : null;
            })
        );
        this.isUpdating$ = this.orderId$.pipe(
            map((id) => typeof id === 'number')
        );

        this.orderId$
            .pipe(
                take(1),
                filter((id) => typeof id === 'number'),
                switchMap((id) => this.posOperator.getOrderById(id!)),
                tap((state) => {
                    const sections: { [key: string]: Map<number, number> } = {};
                    Object.entries(state.info).forEach(([key, value]) => {
                        sections[key] = new Map(
                            value.map((item) => [item.id, item.count])
                        );
                    });

                    this.orderMenuStore.setState({
                        sections,
                    });
                })
            )
            .subscribe();
    }

    onCardClick(item: MenuItem): void {
        this.orderMenuStore.addItem(item);
    }

    onSubmitClick(id: number, info: OrderInfo): void {
        this.posOperator
            .create(id, info)
            .pipe(tap(() => this.backToDashboard()))
            .subscribe();
    }

    onUpdateClick(id: number, info: OrderInfo): void {
        this.posOperator
            .update(id, info)
            .pipe(tap(() => this.backToDashboard()))
            .subscribe();
    }

    onCancelClick(): void {
        this.backToDashboard();
    }

    private backToDashboard() {
        this.router.navigate(['/', 'dashboard']).then();
    }
}
