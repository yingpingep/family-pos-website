import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { OrderItem, OrderInfo } from '@models/order';
import { CdkScrollable } from '@angular/cdk/overlay';
import { Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { MenuItem } from '@models/menu';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
    selector: 'app-order-item-list',
    templateUrl: './order-item-list.component.html',
    styleUrls: ['./order-item-list.component.scss'],
})
export class OrderItemListComponent implements AfterViewInit, OnDestroy {
    @Input() sections!: OrderInfo;
    @Input() sectionTypes!: string[];

    @Output() cancelClick = new EventEmitter<void>();
    @Output() submitClick = new EventEmitter<{
        id: string;
        order: Map<string, OrderItem[]>;
    }>();

    @ViewChild(CdkScrollable) scrollContainer!: CdkScrollable;
    @ViewChildren(OrderItemComponent)
    matListItems!: QueryList<OrderItemComponent>;

    private onDestroy$ = new Subject<void>();

    waitNumber: string = '';
    totalAmount: number = 0;

    get isConfirmDisabled(): boolean {
        return this.sectionTypes.length === 0;
    }

    get isSubmitDisabled(): boolean {
        return this.waitNumber === '';
    }

    constructor(
        private dialogService: MatDialog,
        private menuOperator: MenuOperatorService
    ) {}

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

    getItemInfo(id: number): MenuItem {
        return this.menuOperator.getMenuItem(id);
    }

    openConfirmDialog(dialogTemplate: TemplateRef<any>): void {
        // TODO: Calculate total amount.

        const dialogRef = this.dialogService.open(dialogTemplate);
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
                this.waitNumber = '';
            });
    }

    onSubmitClick(): void {}
}
