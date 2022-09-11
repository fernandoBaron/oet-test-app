import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleAddPageRoutingModule } from './vehicle-add-routing.module';

import { VehicleAddPage } from './vehicle-add.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleAddPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleAddPage]
})
export class VehicleAddPageModule {}
