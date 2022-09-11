import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleListPage } from './vehicle-list.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleListPageRoutingModule {}
