import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendordebit',
  templateUrl: './vendordebit.component.html',
  styleUrls: ['./vendordebit.component.scss']
})
export class VendordebitComponent implements OnInit {
  debitData: any = [];
  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    this.vendorservice.vendorDebit().subscribe(
      res => {
        this.debitData = res.debit_data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
