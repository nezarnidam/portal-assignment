import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [CustomerServices]
})
export class DeliveryComponent implements OnInit {

  deliverydata: any = [];
  constructor(private customerservices: CustomerServices) { }

  ngOnInit() {
    this.customerservices.customerDelivery().subscribe(
      res => {
        this.deliverydata = res.delivery_data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
