import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddpatientPageRoutingModule } from './addpatient-routing.module';
import { AddpatientPage } from './addpatient.page';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepper} from '@angular/material/stepper';
import {  MatIconModule } from  '@angular/material/icon';
import {MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpatientPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
   MatButtonToggleModule,
   MatSliderModule,
   MatTooltipModule
    
  ],
  declarations: [AddpatientPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddpatientPageModule {}
