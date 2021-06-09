import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendor-rfq',
  templateUrl: './vendor-rfq.component.html',
  styleUrls: ['./vendor-rfq.component.scss']
})
export class VendorRFQComponent implements OnInit {

  RFQdata: any = [];
  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    this.vendorservice.vendorRFQ().subscribe(
      res => {
        this.RFQdata = res.rfq_data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
