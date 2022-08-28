import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderStatus } from '@models/order';

@Component({
    selector: 'app-order-card',
    templateUrl: './order-card.component.html',
    styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
    @Input() order!: Order;
    isClosed: boolean = false;

    constructor() {}

    ngOnInit(): void {
        this.isClosed = this.order.status === OrderStatus.CLOSED;
    }
}
