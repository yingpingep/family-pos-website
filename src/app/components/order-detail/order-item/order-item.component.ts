import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { MenuItem } from '@models/menu';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-order-item',
    templateUrl: './order-item.component.html',
    styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnChanges {
    @Input() item!: MenuItem;
    @Input() count!: number;
    @Output() deleteClick = new EventEmitter<MenuItem>();
    @Output() modifyClick = new EventEmitter<{
        item: MenuItem;
        count: number;
    }>();

    newCount: number = this.count;

    constructor(private dialogService: MatDialog) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNaN(this.count) && changes['count']) {
            this.newCount = this.count;
        }
    }

    delete(item: MenuItem): void {
        this.deleteClick.emit(item);
    }

    update(): void {
        this.modifyClick.emit({
            item: this.item,
            count: this.newCount,
        });
    }

    openModifyDialog(dialogTemplate: TemplateRef<any>): void {
        this.dialogService.open(dialogTemplate);
    }
}
