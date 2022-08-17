import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderLayoutComponent } from './components/create-order/create-layout/create-order-layout.component';
import { OrderListLayoutComponent } from './components/order-list/order-list-layout/order-list-layout.component';

const routes: Routes = [
    {
        path: 'create',
        component: CreateOrderLayoutComponent,
    },
    {
        path: '',
        component: OrderListLayoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
