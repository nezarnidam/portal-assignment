import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Element {
  DOC_NUMBER: string,
  DOC_ITEM: string,
  SHORT_TEXT: string,
  MATERIAL: string,
  PLANT: string,
  QUANTITY: string,
  NET_PRICE: string
}
@Component({
  selector: 'app-rfqitem',
  templateUrl: './rfqitem.component.html',
  styleUrls: ['./rfqitem.component.scss']
})
export class RFQitemComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any, context: any }) { }
  displayedColumns: string[] = ['DOC_NUMBER', 'DOC_ITEM', 'SHORT_TEXT', 'MATERIAL', 'PLANT', 'QUANTITY', 'NET_PRICE'];

  // dataSource = myDataArray;
  dataSource: Element[];

  ngOnInit() {
    console.log(this.data.item);
    console.log(this.data.context);
    // this.myDataArray = this.data.item;
    this.dataSource = this.data.item;
  }

}
