import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomerServices } from '../../customer-services.service';
import { DeliveryitemComponent } from '../dialog/deliveryitem/deliveryitem.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [CustomerServices]
})
export class DeliveryComponent implements OnInit {

  // deliverydata: any = [];
  Head: any = [];
  Item: any = [];
  selected: any = [];
  constructor(private customerservices: CustomerServices, private dialog: MatDialog) { }

  ngOnInit() {
    this.customerservices.customerDelivery().subscribe(
      res => {
        // this.deliverydata = res.delivery_data;
        this.Head = res.head;
        this.Item = res.item;
      },
      error => {
        console.log(error);
      }
    )
  }

  onClick(value) {
    this.selected = [];
    console.log("clicked-----" + value);
    this.Item.forEach(element => {
      if (element.DOC_NUMBER == value) {
        // this.selected += element;
        console.log("element-->" + element)
        this.selected.push(element);
      }
    });
    this.dialog.open(DeliveryitemComponent, {
      width: '1000px',
      data: { item: this.selected, context: value }
    });
  }


}
