import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentNeedsPage } from './assessment-needs.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentNeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentNeedsPageRoutingModule {}
