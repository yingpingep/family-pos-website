import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MenuItem } from '@models/menu';

type OrderItemId = number;
type Count = number;
type SectionType = string;
type SectionItems = Map<OrderItemId, Count>;

interface OrderMenuState {
    sections: { [key: SectionType]: SectionItems };
}

@Injectable()
export class OrderMenuStore extends ComponentStore<OrderMenuState> {
    constructor() {
        super({ sections: {} });
    }

    readonly selectExistSectionTypes = () =>
        this.select((state) => Object.keys(state.sections));

    readonly selectAllSections = () =>
        this.select((state) => {
            const sections: { [key: string]: { id: number; count: number }[] } =
                {};
            Object.entries(state.sections).forEach(([key, value]) => {
                sections[key] = [...value.entries()].map(([id, count]) => ({
                    id,
                    count,
                }));
            });

            return sections;
        });

    readonly addItem = this.updater((state, item: MenuItem) => {
        const { sections } = state;
        const { id: itemId, type: itemType } = item;

        if (!sections[itemType]) {
            sections[itemType] = new Map<OrderItemId, Count>();
        }

        const sectionItems = sections[itemType];
        const count = sectionItems.get(itemId) || 0;
        sectionItems.set(itemId, count + 1);
        return state;
    });

    readonly deleteItem = this.updater((state, item: MenuItem) => {
        const { sections } = state;
        const { id: itemId, type: itemType } = item;
        const sectionItems = sections[itemType];

        if (!sectionItems) {
            throw Error(`Type ${itemType} not found`);
        }

        sectionItems.delete(itemId);
        return state;
    });

    readonly updateItemCount = this.updater(
        (state: OrderMenuState, request: { item: MenuItem; count: number }) => {
            const { sections } = state;
            const { id: itemId, type: itemType } = request.item;
            const sectionItems = sections[itemType];

            if (!sectionItems) {
                throw Error(`Type ${itemType} not found`);
            }

            if (!sectionItems.has(itemId)) {
                return state;
            }

            if (request.count === 0) {
                sectionItems.delete(itemId);
            } else {
                sectionItems.set(itemId, request.count);
            }

            return state;
        }
    );
}
