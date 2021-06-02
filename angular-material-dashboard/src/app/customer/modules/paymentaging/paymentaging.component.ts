import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-paymentaging',
  templateUrl: './paymentaging.component.html',
  styleUrls: ['./paymentaging.component.scss'],
  providers: [CustomerServices]
})
export class PaymentagingComponent implements OnInit {

  paymentagingDetails: any = [];
  constructor(private customerservices: CustomerServices) { }

  ngOnInit() {
    this.customerservices.customerPaymentAging().subscribe(
      res => {
        this.paymentagingDetails = res.payaging_data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
