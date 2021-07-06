import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendordashComponent } from './vendordash.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultVendorComponent } from '../modules/default/default.component';
import { VendorprofileComponent } from '../modules/vendorprofile/vendorprofile.component';
import { VendorRFQComponent } from '../modules/vendor-rfq/vendor-rfq.component';
import { VendorcreditComponent } from '../modules/vendorcredit/vendorcredit.component';
import { VendordebitComponent } from '../modules/vendordebit/vendordebit.component';
import { VendorpaymentagingComponent } from '../modules/vendorpaymentaging/vendorpaymentaging.component';
import { VendorPOComponent } from '../modules/vendor-po/vendor-po.component';
import { VendorGoodsreceiptComponent } from '../modules/vendor-goodsreceipt/vendor-goodsreceipt.component';
import { GritemComponent } from '../modules/dialog/gritem/gritem.component';
import { POitemComponent } from '../modules/dialog/poitem/poitem.component';
import { RFQitemComponent } from '../modules/dialog/rfqitem/rfqitem.component';
import { VendorinvoiceComponent } from '../modules/vendorinvoice/vendorinvoice.component';
@NgModule({
  declarations: [
    VendordashComponent,
    DefaultVendorComponent,
    VendorprofileComponent,
    VendorRFQComponent,
    VendorcreditComponent,
    VendordebitComponent,
    VendorpaymentagingComponent,
    VendorPOComponent,
    VendorGoodsreceiptComponent,
    VendorinvoiceComponent,
    GritemComponent,
    POitemComponent,
    RFQitemComponent
  ],
  entryComponents: [
    GritemComponent,
    POitemComponent,
    RFQitemComponent
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
    FormsModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class VendordashModule { }
