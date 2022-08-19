import { Injectable } from '@angular/core';
import { GetMenuResponse } from '@models/responses';
import { MenuOperator } from '@models/menu-operator';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Menu, MenuItem, MenuSection } from '@models/menu';

@Injectable({
    providedIn: 'root',
})
export class MenuOperatorService implements MenuOperator {
    private menuMap!: Map<number, MenuItem>;

    constructor(private httpClient: HttpClient) {
        this.menuMap = new Map<number, MenuItem>();
    }

    getMenu(): GetMenuResponse {
        return this.httpClient.get<MenuItem[]>('/assets/menu.json').pipe(
            map((rawItems) => {
                const sectionMap = new Map<string, MenuSection>();

                const addToSectionMap = (item: MenuItem) => {
                    const { type } = item;
                    const section = sectionMap.get(type);
                    const items = section ? section.items : [];

                    items.push(item);
                    sectionMap.set(type, {
                        type,
                        items,
                    });
                };

                rawItems.forEach((item) => {
                    addToSectionMap(item);
                    this.addToInternalMenuMap(item);
                });

                const menu: Menu = [...sectionMap.values()];
                return { menu };
            })
        );
    }

    getMenuItem(id: number): MenuItem {
        if (!this.menuMap.has(id)) {
            throw Error(`Item ${id} doesn't exist`);
        }

        return this.menuMap.get(id)!;
    }

    private addToInternalMenuMap(item: MenuItem): void {
        this.menuMap.set(item.id, item);
    }
}
