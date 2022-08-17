import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '@models/order';

export const status = {
    created: '訂單已建立',
    updated: '訂單已更新',
    waiting: '待取餐',
    closed: '已取餐',
};

@Pipe({
    name: 'orderStatus',
    standalone: true,
})
export class OrderStatusPipe implements PipeTransform {
    transform(value: OrderStatus): string | undefined {
        return status[value];
    }
}
