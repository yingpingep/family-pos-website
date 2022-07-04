export interface MenuItem {
    id: number;
    name: string;
    price: number;
}

export interface MenuSection {
    type: string;
    items: MenuItem[];
}

export type Menu = MenuSection[];
