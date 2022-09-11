import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleAddPage } from './vehicle-add.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleAddPageRoutingModule {}
