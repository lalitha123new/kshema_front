import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVisitPageRoutingModule } from './home-visit-routing.module';

import { HomeVisitPage } from './home-visit.page';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {  MatIconModule } from  '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVisitPageRoutingModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSliderModule,
   
   

  ],
  declarations: [HomeVisitPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeVisitPageModule {}
