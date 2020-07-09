import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingTabPage } from './shipping-tab.page';

import { ShippingTabPageRoutingModule } from './shipping-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShippingTabPageRoutingModule
  ],
  declarations: [ShippingTabPage]
})
export class ShippingTabPageModule {}
