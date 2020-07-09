import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingTabPage } from './shipping-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ShippingTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingTabPageRoutingModule {}
