import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneCallPage } from './phone-call.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneCallPageRoutingModule {}
