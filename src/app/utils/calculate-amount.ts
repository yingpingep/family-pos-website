import { MenuItem } from '@models/menu';

export function calculateAmount(items: MenuItem[]): number {
    return items.map((item) => item.price).reduce((p, c) => p + c);
}
