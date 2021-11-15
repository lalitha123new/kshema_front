import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskHistoryPage } from './task-history.page';

const routes: Routes = [
  {
    path: '',
    component: TaskHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskHistoryPageRoutingModule {}
