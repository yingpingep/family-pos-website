import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';

const routes: Routes = [
    {
        path: 'detail',
        component: OrderDetailComponent,
    },
    {
        path: 'dashboard',
        component: OrderDashboardComponent,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
