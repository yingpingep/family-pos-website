import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import { UpdateOrderGuard } from './guards/update-order.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: OrderDashboardComponent,
    },
    {
        path: 'create',
        component: OrderDetailComponent,
    },
    {
        path: 'order',
        children: [
            {
                canActivate: [UpdateOrderGuard],
                path: ':id/detail',
                component: OrderDetailComponent,
            },
        ],
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
