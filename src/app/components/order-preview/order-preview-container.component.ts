import { Component, OnInit } from '@angular/core';
import { PreviewOperatorService } from '@services/preview-operator/preview-operator.service';
import { map, Observable } from 'rxjs';
import { OrderItem } from '@models/order';

@Component({
    selector: 'app-order-preview-container',
    template: `<app-order-preview
        [sections]="(sections$ | async)!"
        [sectionTypes]="(sectionTypes$ | async)!"
    ></app-order-preview>`,
    styles: [],
})
export class OrderPreviewContainer implements OnInit {
    sections$!: Observable<Map<string, OrderItem[]>>;
    sectionTypes$!: Observable<string[]>;

    constructor(private previewOperator: PreviewOperatorService) {}

    ngOnInit(): void {
        this.sections$ = this.previewOperator.orderSections$;
        this.sectionTypes$ = this.sections$.pipe(
            map((sections) => [...sections.keys()])
        );
    }
}
