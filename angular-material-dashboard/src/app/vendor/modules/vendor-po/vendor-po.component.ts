import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VendorService } from '../../vendor.service';
import { POitemComponent } from '../dialog/poitem/poitem.component';

@Component({
  selector: 'app-vendor-po',
  templateUrl: './vendor-po.component.html',
  styleUrls: ['./vendor-po.component.scss']
})
export class VendorPOComponent implements OnInit {
  Headdata: any = [];
  Itemdata: any = [];
  selected: any = [];
  constructor(private vendorservice: VendorService, private dialog: MatDialog) { }

  ngOnInit() {
    // this.vendorservice.vendorPO().subscribe(
    //   res => {
    //     this.Headdata = res.head_data;
    //     this.Itemdata = res.item_data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.Headdata = this.vendorservice.getPOHead();
    this.Itemdata = this.vendorservice.getPOItem();
  }
  onClick(value) {
    this.selected = [];
    console.log("clicked-----" + value);
    this.Itemdata.forEach(element => {
      if (element.PO_NUMBER == value) {
        // this.selected += element;
        this.selected.push(element);
      }
    });
    this.dialog.open(POitemComponent, {
      width: '700px',
      data: { item: this.selected, context: value }
    });
  }

}
