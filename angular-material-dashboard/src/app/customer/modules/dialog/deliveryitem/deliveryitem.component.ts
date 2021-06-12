import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface Element {
  DOC_NUMBER: string,
  DELIVERY_ITEM: string,
  MATERIAL_NO: string,
  MATERIAL_ENTERED: string,
  SHORT_TEXT: string
  DELIVERY_QTY: string
}

@Component({
  selector: 'app-deliveryitem',
  templateUrl: './deliveryitem.component.html',
  styleUrls: ['./deliveryitem.component.scss']
})
export class DeliveryitemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any, context: any }) { }
  displayedColumns: string[] = ['DOC_NUMBER', 'DELIVERY_ITEM', 'MATERIAL_NO', 'MATERIAL_ENTERED', 'SHORT_TEXT', 'DELIVERY_QTY'];

  // dataSource = myDataArray;
  dataSource: Element[];
  ngOnInit() {
    console.log(this.data.item);
    console.log(this.data.context);
    // this.myDataArray = this.data.item;
    this.dataSource = this.data.item;



  }

}
