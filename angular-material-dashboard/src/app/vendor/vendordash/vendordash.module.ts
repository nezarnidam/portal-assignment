import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendordashComponent } from './vendordash.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultVendorComponent } from '../modules/default/default.component';

@NgModule({
  declarations: [
    VendordashComponent,
    DefaultVendorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class VendordashModule { }
