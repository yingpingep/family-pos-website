import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderListModule } from './components/order-list/order-list.module';
import { OrderDetailModule } from './components/order-detail/order-detail.module';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        OrderDetailModule,
        OrderListModule,
        FlexModule,
        MatTabsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
