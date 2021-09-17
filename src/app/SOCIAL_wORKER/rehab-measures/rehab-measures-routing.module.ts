import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RehabMeasuresPage } from './rehab-measures.page';

const routes: Routes = [
  {
    path: '',
    component: RehabMeasuresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RehabMeasuresPageRoutingModule {}
