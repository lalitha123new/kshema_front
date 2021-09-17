import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashboardPageRoutingModule } from './admin-dashboard-routing.module';

import { AdminDashboardPage } from './admin-dashboard.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

import {  MatSidenavModule } from  '@angular/material/sidenav';
import {  MatListModule } from  '@angular/material/list';
import {  MatIconModule } from  '@angular/material/icon';
import {  MatToolbarModule } from  '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AdminHeaderComponentModule } from 'src/app/admin-header.module';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashboardPageRoutingModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    AdminHeaderComponentModule
   
  ],
  declarations: [AdminDashboardPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminDashboardPageModule {}
