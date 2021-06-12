import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { arrayMax } from 'highcharts';
import { VendorService } from '../../vendor.service';
import { GritemComponent } from '../dialog/gritem/gritem.component';

@Component({
  selector: 'app-vendor-goodsreceipt',
  templateUrl: './vendor-goodsreceipt.component.html',
  styleUrls: ['./vendor-goodsreceipt.component.scss']
})
export class VendorGoodsreceiptComponent implements OnInit {
  item: any = [];
  head: any = [];
  selected: any = [];
  constructor(private vendor: VendorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.vendor.vendorGoodsreceipt().subscribe(
      res => {
        this.item = res.Itemdata;
        this.head = res.Headdata;
        console.log(this.head);
        console.log(this.item);
      },
      error => {
        console.log(error);
      }
    )
  }

  onClick(value) {
    this.selected = [];
    console.log("clicked-----" + value);
    this.item.forEach(element => {
      if (element.MAT_DOC == value) {
        // this.selected += element;
        this.selected.push(element);
      }
    });
    this.dialog.open(GritemComponent, {
      width: '1000px',
      data: { item: this.selected, context: value }
    });
  }

}
