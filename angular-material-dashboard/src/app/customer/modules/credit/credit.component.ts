import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  providers: [CustomerServices]
})
export class CreditComponent implements OnInit {

  creditDetails: any = [];

  constructor(private customerservices: CustomerServices) { }

  ngOnInit() {
    // this.customerservices.customerCredit().subscribe(
    //   res => {
    //     this.creditDetails = res.credit_data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.creditDetails = this.customerservices.getCredit();
  }

}
