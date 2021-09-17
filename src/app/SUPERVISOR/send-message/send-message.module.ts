import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendMessagePageRoutingModule } from './send-message-routing.module';

import { SendMessagePage } from './send-message.page';
import {  MatIconModule } from  '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendMessagePageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  declarations: [SendMessagePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SendMessagePageModule {}
