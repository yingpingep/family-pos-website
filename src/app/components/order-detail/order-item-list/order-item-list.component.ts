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
import { OrderInfo } from '@models/order';
import { CdkScrollable } from '@angular/cdk/overlay';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MenuOperatorService } from '@services/menu-operator/menu-operator.service';
import { MenuItem } from '@models/menu';
import { OrderItemComponent } from '../order-item/order-item.component';
import { PosOperatorService } from '@services/pos-operator/pos-operator.service';

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
        id: number;
        orderInfo: OrderInfo;
    }>();

    @ViewChild(CdkScrollable) scrollContainer!: CdkScrollable;
    @ViewChildren(OrderItemComponent)
    matListItems!: QueryList<OrderItemComponent>;

    private onDestroy$ = new Subject<void>();

    waitNumber: number | null = null;
    totalAmount$!: Observable<number>;

    get isConfirmDisabled(): boolean {
        return this.sectionTypes.length === 0;
    }

    get isSubmitDisabled(): boolean {
        return this.waitNumber === null;
    }

    constructor(
        private dialogService: MatDialog,
        private menuOperator: MenuOperatorService,
        private posOperator: PosOperatorService
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
        this.totalAmount$ = this.posOperator.calculateAmount(this.sections);
        const dialogRef = this.dialogService.open(dialogTemplate);
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
                this.waitNumber = null;
            });
    }

    onSubmitClick(): void {
        if (!this.waitNumber) {
            return;
        }

        this.submitClick.emit({
            id: this.waitNumber,
            orderInfo: this.sections,
        });
    }
}
