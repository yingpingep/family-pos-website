import { GetMenuResponse } from '@models/responses';

export interface MenuOperator {
    getMenu(): GetMenuResponse;
}
