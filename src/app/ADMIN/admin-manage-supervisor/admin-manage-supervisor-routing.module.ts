import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManageSupervisorPage } from './admin-manage-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManageSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManageSupervisorPageRoutingModule {}
