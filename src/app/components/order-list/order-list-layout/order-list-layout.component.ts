import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '@models/order';

@Component({
    selector: 'app-order-list-layout',
    templateUrl: './order-list-layout.component.html',
    styleUrls: ['./order-list-layout.component.scss'],
})
export class OrderListLayoutComponent implements OnInit {
    orderList: Order[] = [];

    constructor() {}

    ngOnInit(): void {
        const order: Order = {
            amount: 0,
            id: '1',
            sections: [
                {
                    type: '鮮食類',
                    items: [
                        {
                            type: '鮮食類',
                            id: 1,
                            name: '招牌鴨血',
                            count: 1,
                            price: 20,
                        },
                        {
                            type: '鮮食類',
                            id: 2,
                            name: '麻辣豆腐',
                            count: 1,
                            price: 20,
                        },
                        {
                            type: '鮮食類',
                            id: 3,
                            name: '韓式年糕',
                            count: 1,
                            price: 25,
                        },
                    ],
                },
            ],
            status: OrderStatus.CREATED,
        };

        for (let i = 0; i < 10; i++) {
            this.orderList.push({
                ...order,
                id: (i + 1).toString(),
            });
        }
    }
}
