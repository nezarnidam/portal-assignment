import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DashboardModule { }
