import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';

const routes: Routes = [
    {
        path: 'create',
        component: OrderDetailComponent,
    },
    {
        path: '',
        component: OrderDashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
