import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Element {
  MAT_DOC: string,
  MATDOC_ITM: string,
  MATERIAL: string,
  PLANT: string,
  ENTRY_QNT: string,
  PO_NUMBER: string,
  PO_ITEM: string,
  AMOUNT_LC: string
}


@Component({
  selector: 'app-gritem',
  templateUrl: './gritem.component.html',
  styleUrls: ['./gritem.component.scss']
})
export class GritemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { item: any, context: any }) { }
  displayedColumns: string[] = ['MAT_DOC', 'MATDOC_ITM', 'MATERIAL', 'PLANT', 'ENTRY_QNT', 'PO_NUMBER', 'PO_ITEM', 'AMOUNT_LC'];

  // dataSource = myDataArray;
  dataSource: Element[];
  ngOnInit() {
    console.log(this.data.item);
    console.log(this.data.context);
    // this.myDataArray = this.data.item;
    this.dataSource = this.data.item;



  }
}