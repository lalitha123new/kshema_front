import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssessmentNeedsPageRoutingModule } from './assessment-needs-routing.module';
import { AssessmentNeedsPage } from './assessment-needs.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {  MatIconModule } from  '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PatientInfoHeaderComponentModule } from 'src/app/patient-header.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentNeedsPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    PatientInfoHeaderComponentModule,
    MatProgressSpinnerModule
   
   
  ],
  declarations: [AssessmentNeedsPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AssessmentNeedsPageModule {}
