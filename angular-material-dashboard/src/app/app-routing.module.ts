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
import { VendorprofileComponent } from './vendor/modules/vendorprofile/vendorprofile.component';
import { VendorRFQComponent } from './vendor/modules/vendor-rfq/vendor-rfq.component';
import { VendorcreditComponent } from './vendor/modules/vendorcredit/vendorcredit.component';
import { VendordebitComponent } from './vendor/modules/vendordebit/vendordebit.component';
import { VendorpaymentagingComponent } from './vendor/modules/vendorpaymentaging/vendorpaymentaging.component';
import { VendorPOComponent } from './vendor/modules/vendor-po/vendor-po.component';
import { VendorGoodsreceiptComponent } from './vendor/modules/vendor-goodsreceipt/vendor-goodsreceipt.component';
import { EmployeeloginComponent } from './employee/employeelogin/employeelogin.component';
import { VendorinvoiceComponent } from './vendor/modules/vendorinvoice/vendorinvoice.component';
import { EmployeedashComponent } from './employee/employeedash/employeedash.component';
import { EmployeeprofileComponent } from './employee/modules/employeeprofile/employeeprofile.component';
import { EmployeeleaveComponent } from './employee/modules/employeeleave/employeeleave.component';
import { empty } from 'rxjs';
import { EmployeepayslipComponent } from './employee/modules/employeepayslip/employeepayslip.component';
import { EmployeesettlementComponent } from './employee/modules/employeesettlement/employeesettlement.component';
import { EmployeeleavecreateComponent } from './employee/modules/employeeleavecreate/employeeleavecreate.component';

const routes: Routes = [{
  path: '',
  component: LandingComponent,
  children: [
    {
      path: '',
      component: CustomerloginComponent
    }, {
      path: 'vendorlogin',
      component: VendorloginComponent
    }, {
      path: 'employeelogin',
      component: EmployeeloginComponent
    }
  ]
},
// {
//   path: 'customerlogin',
//   component: CustomerloginComponent
// },
// {
//   path: 'vendorlogin',
//   component: VendorloginComponent
// },
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
    },
    {
      path: 'profile',
      component: VendorprofileComponent
    },
    {
      path: 'RFQ',
      component: VendorRFQComponent
    },
    {
      path: 'PO',
      component: VendorPOComponent
    },
    {
      path: 'goodsreceipt',
      component: VendorGoodsreceiptComponent

    },
    {
      path: 'credit',
      component: VendorcreditComponent
    },
    {
      path: 'debit',
      component: VendordebitComponent
    },
    {
      path: 'paymentaging',
      component: VendorpaymentagingComponent
    },
    {
      path: 'invoice',
      component: VendorinvoiceComponent
    }
  ]
},
{
  path: 'employee',
  component: EmployeedashComponent,
  children: [
    {
      path: 'profile',
      component: EmployeeprofileComponent
    },
    {
      path: 'leave',
      component: EmployeeleaveComponent
    },
    {
      path: 'createleave',
      component: EmployeeleavecreateComponent
    },
    {
      path: 'payslip',
      component: EmployeepayslipComponent
    },
    {
      path: 'settlement',
      component: EmployeesettlementComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
