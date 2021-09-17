import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhcVisitPage } from './phc-visit.page';

const routes: Routes = [
  {
    path: '',
    component: PhcVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhcVisitPageRoutingModule {}
