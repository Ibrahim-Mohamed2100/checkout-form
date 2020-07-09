import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryTabPage } from './delivery-tab.page';

import { DeliveryTabPageRoutingModule } from './delivery-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeliveryTabPageRoutingModule
  ],
  declarations: [DeliveryTabPage]
})
export class DeliveryTabPageModule {}
