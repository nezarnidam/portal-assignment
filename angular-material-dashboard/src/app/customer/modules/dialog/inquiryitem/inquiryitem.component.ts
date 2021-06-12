import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface Element {
  DOC_NUMBER: string,
  MATERIAL: string,
  // MATL_GROUP: string,
  ITM_NUMBER: string,
  SHORT_TEXT: string,
  REQ_QTY: string,
  NET_PRICE: string,
  NET_WEIGHT: string
}

@Component({
  selector: 'app-inquiryitem',
  templateUrl: './inquiryitem.component.html',
  styleUrls: ['./inquiryitem.component.scss']
})

export class InquiryitemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any, context: any }) { }
  displayedColumns: string[] = ['DOC_NUMBER', 'MATERIAL', 'ITM_NUMBER', 'SHORT_TEXT', 'REQ_QTY', 'NET_PRICE', 'NET_WEIGHT'];

  // dataSource = myDataArray;
  dataSource: Element[];
  ngOnInit() {
    console.log(this.data.item);
    console.log(this.data.context);
    // this.myDataArray = this.data.item;
    this.dataSource = this.data.item;



  }

}
