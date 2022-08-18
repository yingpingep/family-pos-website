import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';

import { OrderCardComponent } from './order-card/order-card.component';
import { OrderStatusPipe } from '@pipes/order-status.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { OrderDashboardComponent } from './order-dashboard.component';

@NgModule({
    declarations: [OrderCardComponent, OrderDashboardComponent],
    imports: [
        CommonModule,
        MatCardModule,
        FlexModule,
        MatRippleModule,
        OrderStatusPipe,
    ],
})
export class OrderDashboardModule {}
