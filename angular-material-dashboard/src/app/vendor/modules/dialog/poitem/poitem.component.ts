import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Element {
  PO_NUMBER: string,
  SHORT_TEXT: string,
  PLANT: string,
  QUANTITY: string,
  NET_PRICE: string
}

@Component({
  selector: 'app-poitem',
  templateUrl: './poitem.component.html',
  styleUrls: ['./poitem.component.scss']
})
export class POitemComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any, context: any }) { }
  displayedColumns: string[] = ['PO_NUMBER', 'SHORT_TEXT', 'PLANT', 'QUANTITY', 'NET_PRICE'];

  // dataSource = myDataArray;
  dataSource: Element[];

  ngOnInit() {
    console.log(this.data.item);
    console.log(this.data.context);
    // this.myDataArray = this.data.item;
    this.dataSource = this.data.item;
  }

}
