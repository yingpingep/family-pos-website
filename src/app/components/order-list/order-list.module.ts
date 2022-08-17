import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';

import { OrderCardComponent } from './order-card/order-card.component';
import { OrderStatusPipe } from '@pipes/order-status.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { OrderListLayoutComponent } from './order-list-layout/order-list-layout.component';

@NgModule({
    declarations: [OrderCardComponent, OrderListLayoutComponent],
    imports: [
        CommonModule,
        MatCardModule,
        FlexModule,
        MatRippleModule,
        OrderStatusPipe,
    ],
})
export class OrderListModule {}
