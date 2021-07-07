import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendorinvoice',
  templateUrl: './vendorinvoice.component.html',
  styleUrls: ['./vendorinvoice.component.scss']
})
export class VendorinvoiceComponent implements OnInit {

  invoiceData: any = [];
  baseConvString: string;
  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    // this.vendorservice.vendorInvoice().subscribe(
    //   res => {
    //     this.invoiceData = res.invoice_data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.invoiceData = this.vendorservice.getInvoice();
  }

  onDownload(invNo: string, fisc: string) {
    this.vendorservice.vendorInvoicePdf(invNo, fisc).subscribe(
      res => {
        const linkSource = `data:application/pdf;base64,${res.PDF}`;
        const downloadLink = document.createElement("a");
        const fileName = "Invoice.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      },
      error => {
        this.baseConvString = 'PDF Data Not found';
        console.log(error);
      }
    )
  }
}

