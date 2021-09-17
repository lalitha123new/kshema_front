import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPatientsPage } from './all-patients.page';

const routes: Routes = [
  {
    path: '',
    component: AllPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPatientsPageRoutingModule {}
