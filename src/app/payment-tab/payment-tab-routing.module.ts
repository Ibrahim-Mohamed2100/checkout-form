import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentTabPage } from './payment-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTabPageRoutingModule {}
