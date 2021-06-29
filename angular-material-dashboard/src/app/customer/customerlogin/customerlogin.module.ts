import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgForm, NgModel } from '@angular/forms';
import { MatIconModule } from '@angular/material';
//import { CustomerloginComponent } from './customerlogin.component';
//import { MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [
    // CustomerloginComponent
  ],
  imports: [
    CommonModule,
    // MatButtonModule,
    //MatDividerModule
    // MatIconModule,
    NgModel,
    NgForm
  ]
})
export class CustomerloginModule { }
