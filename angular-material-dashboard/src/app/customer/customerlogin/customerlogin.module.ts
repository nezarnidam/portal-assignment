import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgForm, NgModel } from '@angular/forms';
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
    NgModel,
    NgForm
  ]
})
export class CustomerloginModule { }
