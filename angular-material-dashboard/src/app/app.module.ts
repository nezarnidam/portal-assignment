import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DefaultModule } from './customer/layouts/default/default.module';
import { LandingComponent } from './landing/landing.component';
import { CustomerloginComponent } from './customer/customerlogin/customerlogin.component';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CustomerAuthService } from './customer/customer-auth.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ProfileComponent } from './customer/modules/profile/profile.component';
import { InquiryComponent } from './customer/modules/inquiry/inquiry.component';
import { SalesComponent } from './customer/modules/sales/sales.component';
import { DeliveryComponent } from './customer/modules/delivery/delivery.component';
import { CreditComponent } from './customer/modules/credit/credit.component';
import { DebitComponent } from './customer/modules/debit/debit.component';
import { PaymentagingComponent } from './customer/modules/paymentaging/paymentaging.component';
import { InvoiceComponent } from './customer/modules/invoice/invoice.component';
import { MasterdataComponent } from './customer/modules/masterdata/masterdata.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CustomerloginComponent,
    // ProfileComponent,
    // InquiryComponent,
    // SalesComponent,
    // DeliveryComponent,
    // CreditComponent,
    // DebitComponent,
    // PaymentagingComponent,
    // InvoiceComponent,
    // MasterdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
    MatButtonModule,
    // MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    FormsModule
  ],
  providers: [CustomerAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }