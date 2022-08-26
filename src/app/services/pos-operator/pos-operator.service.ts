import { Injectable } from '@angular/core';
import { Order, OrderInfo, OrderStatus } from '@models/order';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { Store } from '@ngrx/store';
import { addOrder, updateOrder } from '@store/order-store/order.actions';
import { selectOrderEntities } from '@store/order-store/order.selector';
import { Dictionary } from '@ngrx/entity';

@Injectable({
    providedIn: 'root',
})
export class PosOperatorService {
    private entities$: Observable<Dictionary<Order>>;

    constructor(
        private menuOperator: MenuOperatorService,
        private store: Store
    ) {
        this.entities$ = this.store.select(selectOrderEntities);
    }

    create(waitingNumber: number, info: OrderInfo): Observable<Order> {
        return this.calculateAmount(info).pipe(
            tap((amount) => {
                const timestamp = Date.now();
                const order = {
                    id: timestamp,
                    waitingNumber,
                    info,
                    amount,
                    status: OrderStatus.CREATED,
                    createAt: timestamp,
                };
                this.store.dispatch(addOrder({ order }));
            }),
            switchMap(() => this.getOrderById(waitingNumber))
        );
    }

    update(id: number, info: OrderInfo): Observable<Order> {
        return this.calculateAmount(info).pipe(
            tap((amount) => {
                const order = {
                    id,
                    info,
                    amount,
                    status: OrderStatus.UPDATED,
                };
                this.store.dispatch(
                    updateOrder({
                        order: {
                            id,
                            changes: order,
                        },
                    })
                );
            }),
            switchMap(() => this.getOrderById(id))
        );
    }

    getOrderById(id: number): Observable<Order> {
        return this.entities$.pipe(map((entities) => entities[id]!));
    }

    calculateAmount(orderInfo: OrderInfo): Observable<number> {
        const totalAmount = Object.values(orderInfo)
            .flatMap((value) => value)
            .reduce((previousAmount, itemInfo) => {
                const { id, count } = itemInfo;
                const { price } = this.menuOperator.getMenuItem(id);
                const amount = price * count;
                return previousAmount + amount;
            }, 0);

        return of(totalAmount);
    }
}
