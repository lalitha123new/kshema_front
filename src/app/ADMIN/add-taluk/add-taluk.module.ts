import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTalukPageRoutingModule } from './add-taluk-routing.module';

import { AddTalukPage } from './add-taluk.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

import {  MatSidenavModule } from  '@angular/material/sidenav';
import {  MatListModule } from  '@angular/material/list';
import {  MatIconModule } from  '@angular/material/icon';
import {  MatToolbarModule } from  '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminHeaderComponentModule } from 'src/app/admin-header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTalukPageRoutingModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    AdminHeaderComponentModule
  ],
  declarations: [AddTalukPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddTalukPageModule {}
