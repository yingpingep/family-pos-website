import { Component, OnInit } from '@angular/core';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { map, Observable } from 'rxjs';
import { Menu } from '@models/menu';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'family-pos-website';
    menu$: Observable<Menu> | undefined;

    constructor(private menuOperator: MenuOperatorService) {}

    ngOnInit(): void {
        this.menu$ = this.menuOperator
            .getMenu()
            .pipe(map((response) => response.menu));
    }
}
