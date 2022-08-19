import { Component, OnInit } from '@angular/core';
import { Order } from '@models/order';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectOrderList } from '@store/order-store/order.selector';

@Component({
    selector: 'app-order-dashboard',
    templateUrl: './order-dashboard.component.html',
    styleUrls: ['./order-dashboard.component.scss'],
})
export class OrderDashboardComponent implements OnInit {
    orderList$!: Observable<Order[]>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.orderList$ = this.store.select(selectOrderList);
    }
}
