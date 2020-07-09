import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentTabPage } from './payment-tab.page';

import { PaymentTabPageRoutingModule } from './payment-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: PaymentTabPage }]),
    PaymentTabPageRoutingModule,
  ],
  declarations: [PaymentTabPage]
})
export class PaymentTabPageModule {}
