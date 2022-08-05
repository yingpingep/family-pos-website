export interface MenuItem {
    type: string;
    id: number;
    name: string;
    price: number;
}

export interface MenuSection {
    type: string;
    items: MenuItem[];
}

export interface RawMenuItem {
    type: string;
    id: number;
    name: string;
    price: number;
}

export type Menu = MenuSection[];
