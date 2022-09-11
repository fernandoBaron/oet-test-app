import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleListPageRoutingModule } from './vehicle-list-routing.module';

import { VehicleListPage } from './vehicle-list.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleListPageRoutingModule,
    SharedModule,
  ],
  declarations: [VehicleListPage]
})
export class VehicleListPageModule {}
