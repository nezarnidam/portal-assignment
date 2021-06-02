import { Component, OnInit } from '@angular/core';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
  providers: [CustomerServices]
})
export class InquiryComponent implements OnInit {

  sold_to: string;
  Inquiry: any = [];

  constructor(private customerinquiry: CustomerServices) { }

  ngOnInit() {
    this.customerinquiry.customerInquiry('').subscribe(
      res => {
        this.Inquiry = res.inquiry_data;

      },
      error => {
        console.log(error);
      }
    )

  }

}
