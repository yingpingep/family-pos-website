import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '@models/menu';

@Component({
    selector: 'app-order-item',
    templateUrl: './order-item.component.html',
    styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
    @Input() item!: MenuItem;
    @Input() count!: number;
    @Output() deleteClick = new EventEmitter<MenuItem>();

    constructor() {}

    ngOnInit(): void {}

    delete(item: MenuItem): void {
        this.deleteClick.emit(item);
    }
}
