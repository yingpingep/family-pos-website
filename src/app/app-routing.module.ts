import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListLayoutComponent } from './components/order-list/order-list-layout/order-list-layout.component';

const routes: Routes = [
    {
        path: 'create',
        component: OrderDetailComponent,
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
