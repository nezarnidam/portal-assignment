import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomerServices } from '../../customer-services.service';
import { InquiryitemComponent } from '../dialog/inquiryitem/inquiryitem.component';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
  providers: [CustomerServices]
})
export class InquiryComponent implements OnInit {

  sold_to: string;
  Inquiry: any = [];
  Head: any = [];
  Item: any = [];
  selected: any = [];

  constructor(private customerservices: CustomerServices, private dialog: MatDialog) { }

  ngOnInit() {
    // this.customerinquiry.customerInquiry().subscribe(
    //   res => {
    //     // this.Inquiry = res.inquiry_data;
    //     this.Head = res.head;
    //     this.Item = res.item;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    // this.customerinquiry.setInquiry();
    this.Head = this.customerservices.getInquiryHead();
    console.log(this.Head);
    this.Item = this.customerservices.getInquiryItem();

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
    this.dialog.open(InquiryitemComponent, {
      width: '1000px',
      data: { item: this.selected, context: value }
    });
  }

}
