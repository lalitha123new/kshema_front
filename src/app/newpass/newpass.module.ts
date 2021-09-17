import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpassPageRoutingModule } from './newpass-routing.module';

import { NewpassPage } from './newpass.page';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpassPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule
  ],
  declarations: [NewpassPage]
})
export class NewpassPageModule {}
