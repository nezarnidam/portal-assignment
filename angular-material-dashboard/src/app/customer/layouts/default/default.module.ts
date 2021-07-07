import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/customer/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { OverallsalesComponent } from 'src/app/customer/modules/overallsales/overallsales.component';
import { SharedModule } from 'src/app/customer/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InquiryComponent } from '../../modules/inquiry/inquiry.component';
import { ProfileComponent } from '../../modules/profile/profile.component';
import { SalesComponent } from '../../modules/sales/sales.component';
import { DeliveryComponent } from '../../modules/delivery/delivery.component';
import { CreditComponent } from '../../modules/credit/credit.component';
import { DebitComponent } from '../../modules/debit/debit.component';
import { PaymentagingComponent } from '../../modules/paymentaging/paymentaging.component';
import { InvoiceComponent } from '../../modules/invoice/invoice.component';
import { MasterdataComponent } from '../../modules/masterdata/masterdata.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InquiryitemComponent } from '../../modules/dialog/inquiryitem/inquiryitem.component';
import { DeliveryitemComponent } from '../../modules/dialog/deliveryitem/deliveryitem.component';
import { CustomerServices } from '../../customer-services.service';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    OverallsalesComponent,

    ////
    ProfileComponent,
    InquiryComponent,
    SalesComponent,
    DeliveryComponent,
    CreditComponent,
    DebitComponent,
    PaymentagingComponent,
    InvoiceComponent,
    MasterdataComponent,
    InquiryitemComponent,
    DeliveryitemComponent
  ],
  entryComponents: [
    InquiryitemComponent,
    DeliveryitemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    ////
    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    // HttpClientModule,
    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDividerModule,
    // MatIconModule,
    // MatCardModule,
    FormsModule


  ],
  providers: [
    CustomerServices
  ]
})
export class DefaultModule { }
