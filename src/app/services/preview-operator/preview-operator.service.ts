import { Injectable } from '@angular/core';
import { OrderItem } from '@models/order';
import { BehaviorSubject, map, Observable } from 'rxjs';

type OrderItemMap = Map<number, OrderItem>;
type OrderSectionMap = Map<string, OrderItemMap>;

@Injectable({
    providedIn: 'root',
})
export class PreviewOperatorService {
    private _sections: OrderSectionMap;
    private _sections$: BehaviorSubject<OrderSectionMap>;
    orderSections$: Observable<Map<string, OrderItem[]>>;

    constructor() {
        this._sections = new Map<string, OrderItemMap>();
        this._sections$ = new BehaviorSubject<OrderSectionMap>(this._sections);
        this.orderSections$ = this._sections$.asObservable().pipe(
            map((sectionsMap) => {
                const map = new Map<string, OrderItem[]>();
                sectionsMap.forEach((items, key) => {
                    map.set(key, [...items.values()]);
                });
                return map;
            })
        );
    }

    addOrderItem(item: OrderItem): void {
        const { type, id, count } = item;
        const section =
            this._sections.get(type) || new Map<number, OrderItem>();
        const existedItem = section.get(id);
        if (existedItem) {
            existedItem.count += count;
        } else {
            section.set(id, item);
        }

        this._sections.set(type, section);
        this._sections$.next(this._sections);
    }

    deleteOrderItem(type: string, id: number): void {
        const section = this._sections.get(type);
        if (section) {
            section.delete(id);
        }
        this._sections$.next(this._sections);
    }

    updateOrderItemCount(type: string, id: number, count: number): void {
        const section = this._sections.get(type);
        const item = section?.get(id);
        if (item) {
            item.count = count;
        }

        this._sections$.next(this._sections);
    }

    reset(): void {
        this._sections = new Map<string, OrderItemMap>();
        this._sections$.next(this._sections);
    }
}
