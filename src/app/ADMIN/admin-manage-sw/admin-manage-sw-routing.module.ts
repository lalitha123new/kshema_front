import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManageSwPage } from './admin-manage-sw.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManageSwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManageSwPageRoutingModule {}
