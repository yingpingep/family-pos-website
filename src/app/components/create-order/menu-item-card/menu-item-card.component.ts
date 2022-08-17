import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '@models/menu';

@Component({
    selector: 'app-menu-item-card',
    templateUrl: './menu-item-card.component.html',
    styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {
    @Input() item!: MenuItem;

    constructor() {}

    ngOnInit(): void {}
}
