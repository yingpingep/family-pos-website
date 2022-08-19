import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@models/menu';

@Component({
    selector: 'app-order-item',
    templateUrl: './order-item.component.html',
    styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
    @Input() item!: MenuItem;
    @Input() count!: number;

    constructor() {}

    ngOnInit(): void {}
}
