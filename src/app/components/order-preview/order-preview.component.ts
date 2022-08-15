import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { OrderItem } from '@models/order';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MatListItem } from '@angular/material/list';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-order-preview',
    templateUrl: './order-preview.component.html',
    styleUrls: ['./order-preview.component.scss'],
})
export class OrderPreviewComponent implements AfterViewInit, OnDestroy {
    @Input() sections!: Map<string, OrderItem[]>;
    @Input() sectionTypes!: string[];
    @Output() cancelClick = new EventEmitter<void>();

    @ViewChild(CdkScrollable) scrollContainer!: CdkScrollable;
    @ViewChildren(MatListItem) matListItems!: QueryList<MatListItem>;

    private onDestroy$ = new Subject<void>();

    constructor() {}

    ngAfterViewInit(): void {
        this.matListItems.changes
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.scrollContainer.scrollTo({
                    bottom: 0,
                });
            });
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
