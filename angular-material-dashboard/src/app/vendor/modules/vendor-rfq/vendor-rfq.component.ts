import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VendorService } from '../../vendor.service';
import { RFQitemComponent } from '../dialog/rfqitem/rfqitem.component';

@Component({
  selector: 'app-vendor-rfq',
  templateUrl: './vendor-rfq.component.html',
  styleUrls: ['./vendor-rfq.component.scss']
})
export class VendorRFQComponent implements OnInit {

  RFQdata: any = [];
  Head: any = [];
  Item: any = [];
  selected: any = [];
  constructor(private vendorservice: VendorService, private dialog: MatDialog) { }

  ngOnInit() {
    // this.vendorservice.vendorRFQ().subscribe(
    //   res => {
    //     // this.RFQdata = res.rfq_data;
    //     this.Head = res.head;
    //     this.Item = res.item;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.Head = this.vendorservice.getRFQHead();
    this.Item = this.vendorservice.getRFQItem();
  }

  onClick(value) {
    this.selected = [];
    console.log("clicked-----" + value);
    this.Item.forEach(element => {
      if (element.DOC_NUMBER == value) {
        // this.selected += element;
        this.selected.push(element);
      }
    });
    this.dialog.open(RFQitemComponent, {
      width: '1000px',
      data: { item: this.selected, context: value }
    });
  }


}
