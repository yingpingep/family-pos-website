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
import { OrderItem } from '@models/order';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MatListItem } from '@angular/material/list';
import { Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { calculateAmount } from '@utils';

@Component({
    selector: 'app-order-preview',
    templateUrl: './order-preview.component.html',
    styleUrls: ['./order-preview.component.scss'],
})
export class OrderPreviewComponent implements AfterViewInit, OnDestroy {
    @Input() sections!: Map<string, OrderItem[]>;
    @Input() sectionTypes!: string[];
    @Output() cancelClick = new EventEmitter<void>();
    @Output() submitClick = new EventEmitter<{
        id: string;
        order: Map<string, OrderItem[]>;
    }>();

    @ViewChild(CdkScrollable) scrollContainer!: CdkScrollable;
    @ViewChildren(MatListItem) matListItems!: QueryList<MatListItem>;

    private onDestroy$ = new Subject<void>();

    waitNumber: string = '';
    totalAmount: number = 0;

    get isConfirmDisabled(): boolean {
        return !this.sections || this.sections.size === 0;
    }

    get isSubmitDisabled(): boolean {
        return this.waitNumber === '';
    }

    constructor(private dialogService: MatDialog) {}

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

    openConfirmDialog(dialogTemplate: TemplateRef<any>): void {
        this.totalAmount = [...this.sections.values()]
            .map((items) => calculateAmount(items))
            .reduce((p, c) => p + c);

        const dialogRef = this.dialogService.open(dialogTemplate);
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => {
                this.waitNumber = '';
            });
    }

    onSubmitClick(): void {
        this.submitClick.emit({
            id: this.waitNumber,
            order: this.sections,
        });
    }
}
