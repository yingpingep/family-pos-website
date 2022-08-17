import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateOrderModule } from './components/create-order/create-order.module';
import { OrderListModule } from './components/order-list/order-list.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CreateOrderModule,
        OrderListModule,
        FlexModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
