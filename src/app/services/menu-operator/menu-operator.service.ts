import { Injectable } from '@angular/core';
import { GetMenuResponse } from '@models/responses';
import { MenuOperator } from '@models/menu-operator';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Menu, MenuItem, MenuSection, RawMenuItem } from '@models/menu';

@Injectable({
    providedIn: 'root',
})
export class MenuOperatorService implements MenuOperator {
    constructor(private httpClient: HttpClient) {}

    getMenu(): GetMenuResponse {
        return this.httpClient.get<RawMenuItem[]>('/assets/menu.json').pipe(
            map((rawItems) => {
                const sectionMap = new Map<string, MenuSection>();

                rawItems.forEach((rawItem) => {
                    const { type, id, name, price } = rawItem;
                    const section = sectionMap.get(type);
                    const items = section ? section.items : [];
                    const item: MenuItem = { id, name, price };

                    items.push(item);
                    sectionMap.set(type, {
                        type,
                        items,
                    });
                });

                const menu: Menu = [...sectionMap.values()];
                return { menu };
            })
        );
    }
}
