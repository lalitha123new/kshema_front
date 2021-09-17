import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelfarePage } from './welfare.page';

const routes: Routes = [
  {
    path: '',
    component: WelfarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelfarePageRoutingModule {}
