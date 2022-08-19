import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderDashboardModule } from './components/order-dashboard/order-dashboard.module';
import { OrderDetailModule } from './components/order-detail/order-detail.module';
import * as fromOrder from '@store/order-store/order.reducer';

import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        OrderDetailModule,
        OrderDashboardModule,
        FlexModule,
        MatTabsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
