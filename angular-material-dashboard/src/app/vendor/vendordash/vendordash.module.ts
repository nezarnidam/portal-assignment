import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendordashComponent } from './vendordash.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultVendorComponent } from '../modules/default/default.component';
import { VendorprofileComponent } from '../modules/vendorprofile/vendorprofile.component';
import { VendorRFQComponent } from '../modules/vendor-rfq/vendor-rfq.component';
import { VendorcreditComponent } from '../modules/vendorcredit/vendorcredit.component';
import { VendordebitComponent } from '../modules/vendordebit/vendordebit.component';
import { VendorpaymentagingComponent } from '../modules/vendorpaymentaging/vendorpaymentaging.component';

@NgModule({
  declarations: [
    VendordashComponent,
    DefaultVendorComponent,
    VendorprofileComponent,
    VendorRFQComponent,
    VendorcreditComponent,
    VendordebitComponent,
    VendorpaymentagingComponent
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
