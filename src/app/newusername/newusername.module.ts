import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewusernamePageRoutingModule } from './newusername-routing.module';

import { NewusernamePage } from './newusername.page';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewusernamePageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule
  ],
  declarations: [NewusernamePage]
})
export class NewusernamePageModule {}
