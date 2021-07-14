import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendorcredit',
  templateUrl: './vendorcredit.component.html',
  styleUrls: ['./vendorcredit.component.scss']
})
export class VendorcreditComponent implements OnInit {
  creditData: any = [];
  searchedKeyword: string;
  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    // this.vendorservice.vendorCredit().subscribe(
    //   res => {
    //     this.creditData = res.credit_data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.creditData = this.vendorservice.getCredit();
    // console.log(this.creditData);
  }



}
