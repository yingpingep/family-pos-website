import { Component, OnInit } from '@angular/core';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { map, Observable } from 'rxjs';
import { Menu, MenuItem } from '@models/menu';
import { PreviewOperatorService } from '@services/preview-operator/preview-operator.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'family-pos-website';
    menu$: Observable<Menu> | undefined;

    constructor(
        private menuOperator: MenuOperatorService,
        private previewOperator: PreviewOperatorService
    ) {}

    ngOnInit(): void {
        this.menu$ = this.menuOperator
            .getMenu()
            .pipe(map((response) => response.menu));
    }

    onCardClick(item: MenuItem): void {
        this.previewOperator.addOrderItem({
            ...item,
            count: 1,
        });
    }
}
