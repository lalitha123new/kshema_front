import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewusernamePage } from './newusername.page';

const routes: Routes = [
  {
    path: '',
    component: NewusernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewusernamePageRoutingModule {}
