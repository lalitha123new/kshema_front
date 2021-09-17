import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeVisitPage } from './home-visit.page';

const routes: Routes = [
  {
    path: '',
    component: HomeVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeVisitPageRoutingModule {}
