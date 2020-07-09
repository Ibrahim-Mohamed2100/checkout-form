import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'delivery',
        loadChildren: () => import('../delivery-tab/delivery-tab.module').then(m => m.DeliveryTabPageModule)
      },
      {
        path: 'shipping',
        loadChildren: () => import('../shipping-tab/shipping-tab.module').then(m => m.ShippingTabPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'payment',
        loadChildren: () => import('../payment-tab/payment-tab.module').then(m => m.PaymentTabPageModule),
        canActivate: [AuthGuard]

      },
      {
        path: '',
        redirectTo: '/delivery',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/delivery',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
