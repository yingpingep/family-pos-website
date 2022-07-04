import { MenuItem } from '@models/menu';

export interface Order {
    serial: number;
    items: MenuItem[];
    price: number;
}
