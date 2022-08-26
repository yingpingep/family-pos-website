import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Order, OrderInfo } from '@models/order';
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
export class OrderItemListComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    @Input() sections!: OrderInfo;
    @Input() sectionTypes!: string[];
    @Input() order: Order | null = null;
    @Input() isUpdating = false;

    @Output() cancelClick = new EventEmitter<void>();
    @Output() submitClick = new EventEmitter<{
        waitingNumber: number;
        orderInfo: OrderInfo;
    }>();
    @Output() updateClick = new EventEmitter<{
        id: number;
        orderInfo: OrderInfo;
    }>();
    @Output() deleteItem = new EventEmitter<MenuItem>();
    @Output() modifyItem = new EventEmitter<{
        item: MenuItem;
        count: number;
    }>();

    waitingNumber: number | null = null;
    totalAmount$!: Observable<number>;

    @ViewChild(CdkScrollable) private scrollContainer!: CdkScrollable;
    @ViewChildren(OrderItemComponent)
    private matListItems!: QueryList<OrderItemComponent>;
    private onDestroy$ = new Subject<void>();

    get isConfirmDisabled(): boolean {
        return this.sectionTypes.length === 0;
    }

    get isSubmitDisabled(): boolean {
        return this.waitingNumber === null;
    }

    constructor(
        private dialogService: MatDialog,
        private menuOperator: MenuOperatorService,
        private posOperator: PosOperatorService
    ) {}

    ngOnInit(): void {
        if (this.order) {
            this.waitingNumber = this.order.waitingNumber;
        }
    }

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
                this.waitingNumber = null;
            });
    }

    create(): void {
        if (!this.waitingNumber) {
            return;
        }

        this.submitClick.emit({
            waitingNumber: this.waitingNumber,
            orderInfo: this.sections,
        });
    }

    update(): void {
        if (!this.order) {
            return;
        }

        this.updateClick.emit({
            id: this.order.id,
            orderInfo: this.sections,
        });
    }
}
