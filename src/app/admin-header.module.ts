import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
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
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './ADMIN/admin-header/admin-header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    declarations: [
        AdminHeaderComponent
  
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports:[MatPaginatorModule,
      MatTableModule,
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
      MatSelectModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
     
     ],
    exports: [
        AdminHeaderComponent
    ]
  })
  export class AdminHeaderComponentModule {}