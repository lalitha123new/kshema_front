import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManageTalukPage } from './admin-manage-taluk.page';

const routes: Routes = [
  {
    path: '',
    component: AdminManageTalukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManageTalukPageRoutingModule {}
