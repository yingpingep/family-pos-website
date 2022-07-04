import { Injectable } from '@angular/core';
import { GetMenuResponse } from '@models/responses';
import { MenuOperator } from '@models/menu-operator';

@Injectable({
    providedIn: 'root',
})
export class MenuOperatorService implements MenuOperator {
    constructor() {}

    getMenu(): GetMenuResponse {
        return undefined;
    }
}
