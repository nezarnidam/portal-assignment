import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerloginComponent } from './customer/customerlogin/customerlogin.component';
import { DefaultComponent } from './customer/layouts/default/default.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './customer/modules/dashboard/dashboard.component';
import { OverallsalesComponent } from './customer/modules/overallsales/overallsales.component';
import { ProfileComponent } from './customer/modules/profile/profile.component';
import { InquiryComponent } from './customer/modules/inquiry/inquiry.component';
import { SalesComponent } from './customer/modules/sales/sales.component';
import { DeliveryComponent } from './customer/modules/delivery/delivery.component';
import { CreditComponent } from './customer/modules/credit/credit.component';
import { DebitComponent } from './customer/modules/debit/debit.component';
import { PaymentagingComponent } from './customer/modules/paymentaging/paymentaging.component';
import { InvoiceComponent } from './customer/modules/invoice/invoice.component';
import { MasterdataComponent } from './customer/modules/masterdata/masterdata.component';
import { VendorloginComponent } from './vendor/vendorlogin/vendorlogin.component';
import { VendordashComponent } from './vendor/vendordash/vendordash.component';
import { DefaultVendorComponent } from './vendor/modules/default/default.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent
},
{
  path: 'customerlogin',
  component: CustomerloginComponent
},
{
  path: 'vendorlogin',
  component: VendorloginComponent
},
{
  path: 'customer',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },
  {
    path: 'inquiry',
    component: InquiryComponent
  }, {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'customerprofile',
    component: ProfileComponent
  },
  {
    path: 'delivery',
    component: DeliveryComponent
  },
  {
    path: 'credit',
    component: CreditComponent
  },
  {
    path: 'debit',
    component: DebitComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'overallsales',
    component: OverallsalesComponent
  },
  {
    path: 'paymentaging',
    component: PaymentagingComponent
  },
  {
    path: 'masterupload',
    component: MasterdataComponent
  }]
},
{
  path: 'vendor',
  component: VendordashComponent,
  children: [
    {
      path: '',
      component: DefaultVendorComponent

    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
