import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendorpaymentaging',
  templateUrl: './vendorpaymentaging.component.html',
  styleUrls: ['./vendorpaymentaging.component.scss']
})
export class VendorpaymentagingComponent implements OnInit {
  paymentagingData: any = [];
  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    this.vendorservice.vendorPaymentaging().subscribe(
      res => {
        this.paymentagingData = res.paymentaging_data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
