import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [CustomerServices]
})
export class SalesComponent implements OnInit {

  salesdata: any = [];
  constructor(private customerservice: CustomerServices) {

  }

  ngOnInit() {
    this.customerservice.customerSales().subscribe(
      res => {
        this.salesdata = res.sales_data;
      },
      error => {

      }
    )
  }

}
