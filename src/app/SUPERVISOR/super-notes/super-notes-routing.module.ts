import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperNotesPage } from './super-notes.page';

const routes: Routes = [
  {
    path: '',
    component: SuperNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperNotesPageRoutingModule {}
