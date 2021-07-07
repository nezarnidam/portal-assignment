import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.scss'],
  providers: [CustomerServices]
})
export class DebitComponent implements OnInit {

  debitDetails: any = [];

  constructor(private customerservices: CustomerServices) { }

  ngOnInit() {
    // this.customerservices.customerDebit().subscribe(
    //   res => {
    //     this.debitDetails = res.debit_data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.debitDetails = this.customerservices.getDebit();
  }

}
