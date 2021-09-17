import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTalukPage } from './add-taluk.page';

const routes: Routes = [
  {
    path: '',
    component: AddTalukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTalukPageRoutingModule {}
