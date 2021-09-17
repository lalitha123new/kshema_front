import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdidPage } from './udid.page';

const routes: Routes = [
  {
    path: '',
    component: UdidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdidPageRoutingModule {}
