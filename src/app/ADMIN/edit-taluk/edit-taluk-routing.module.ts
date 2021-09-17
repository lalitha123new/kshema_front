import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTalukPage } from './edit-taluk.page';

const routes: Routes = [
  {
    path: '',
    component: EditTalukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTalukPageRoutingModule {}
