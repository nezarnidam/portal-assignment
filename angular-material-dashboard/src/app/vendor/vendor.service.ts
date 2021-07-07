import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface credit {
  BELNR: string;
  BLDAT: string;
  BUDAT: string;
  BUKRS: string;
  DMBTR: string;
  GJAHR: string;
  MANDT: string;
  WAERS: string;
  ZFBDT: string;
}
interface debit {
  "MANDT": string;
  "BUKRS": string;
  "GJAHR": string;
  "BELNR": string;
  "BUDAT": string;
  "BLDAT": string;
  "WAERS": string;
  "DMBTR": string;
  "ZFBDT": string;
}
interface pa {
  "COMP_CODE": string;
  "FISC_YEAR": string;
  "ITEM_NUM": string;
  "PSTNG_DATE": string;
  "DOC_DATE": string;
  "CURRENCY": string;
  "LC_AMOUNT": string;
  "BLINE_DATE": string;
  "AGING": string;
}

interface invoice {
  "INV_DOC_NO": string;
  "FISC_YEAR": string;
  "PSTNG_DATE": string;
  "ENTRY_DATE": string;
  "COMP_CODE": string;
  "GROSS_AMNT": string;
  "CURRENCY": string;
  "INVOICE_STATUS": string;
}
interface RFQH {
  "DOC_NUMBER": string;
  "CO_CODE": string;
  "CREATED_ON": string;
  "CREATED_BY": string;
  "CURRENCY": string;
}
interface RFQI {
  "DOC_NUMBER": string;
  "DOC_ITEM": string;
  "SHORT_TEXT": string;
  "MATERIAL": string;
  "PLANT": string;
  "QUANTITY": string;
  "NET_PRICE": string;
}

interface POH {
  "PO_NUMBER": string;
  "CREATED_ON": string;
  "CREATED_BY": string;
  "CURRENCY": string;
}
interface POI {
  "PO_NUMBER": string;
  "SHORT_TEXT": string;
  "PLANT": string;
  "QUANTITY": string;
  "NET_PRICE": string;
}

interface GRH {
  "MAT_DOC": string;
  "DOC_YEAR": string;
  "DOC_DATE": string;
  "PSTNG_DATE": string;
  "ENTRY_DATE": string;
  "ENTRY_TIME": string;
}
interface GRI {
  "MAT_DOC": string;
  "MATDOC_ITM": string;
  "MATERIAL": string;
  "PLANT": string;
  "ENTRY_QNT": string;
  "PO_NUMBER": string;
  "PO_ITEM": string;
  "AMOUNT_LC": string;
}

@Injectable({
  providedIn: 'root'
})

export class VendorService {
  po: any = [];
  po_prev_size: any;
  Credit: credit[] = [];
  Debit: debit[] = [];
  PA: pa[] = [];
  Invoice: invoice[] = [];
  RFQItem: RFQH[] = [];
  RFQHead: RFQI[] = [];
  POItem: POH[] = [];
  POHead: POI[] = [];
  GRHead: GRH[] = [];
  GRItem: GRI[] = [];
  constructor(private http: HttpClient) { }

  vendorLogin(vendorid: string, password: string) {
    return this.http.post<any>(
      'api/vendorLogin', {
      vendorid: vendorid,
      password: password,
    }
    );
  }

  vendorLoggedin() {
    return this.http.post<any>(
      'api/vendorLoggedin', {

    }
    );
  }

  getVendorid() {
    return this.http.post<any>(
      'api/getVendorid', {

    }
    );
  }


  vendorSignout() {
    return this.http.post<any>(
      'api/vendorSignout', {

    });
  }

  clear() {
    this.Credit = [];
    this.Debit = [];
    this.PA = [];
    this.Invoice = [];
    this.RFQHead = [];
    this.RFQItem = [];
    this.POHead = [];
    this.POItem = [];
    this.GRItem = [];
    this.GRHead = [];
  }

  vendorInit() {
    this.vendorCredit().subscribe(
      res => {
        this.Credit = res.credit_data;
        // console.log(res.credit_data);
        // console.log(this.Credit);
      },
      error => {
        console.log(error);
      })
    this.vendorDebit().subscribe(
      res => {
        this.Debit = res.debit_data;
        // console.log(res.debit_data);
        // console.log(this.Debit);
      },
      error => {
        console.log(error);
      }
    )
    this.vendorPaymentaging().subscribe(
      res => {
        this.PA = res.paymentaging_data;
      },
      error => {
        console.log(error);
      }
    )
    this.vendorInvoice().subscribe(
      res => {
        this.Invoice = res.invoice_data;
      },
      error => {
        console.log(error);
      }
    )
    this.vendorRFQ().subscribe(
      res => {
        this.RFQHead = res.head;
        this.RFQItem = res.item;
      },
      error => {
        console.log(error);
      }
    )
    this.vendorPO().subscribe(
      res => {
        this.POHead = res.head_data;
        this.POItem = res.item_data;
      },
      error => {
        console.log(error);
      }
    )
    this.vendorGoodsreceipt().subscribe(
      res => {
        this.GRHead = res.Headdata;
        this.GRItem = res.Itemdata;
      },
      error => {
        console.log(error);
      }
    )
  }
  getCredit() {
    return this.Credit;
  }
  getDebit() {
    return this.Debit;
  }
  getPaymentsAging() {
    return this.PA;
  }
  getInvoice() {
    return this.Invoice;
  }
  getRFQHead() {
    return this.RFQHead;
  }
  getRFQItem() {
    return this.RFQItem;
  }
  getPOHead() {
    return this.POHead;
  }
  getPOItem() {
    return this.POItem;
  }
  getGRHead() {
    return this.GRHead;
  }
  getGRItem() {
    return this.GRItem;
  }
  vendorProfile() {
    return this.http.post<any>(
      'api/vendorProfile', {

    });
  }
  vendorProfileedit(data: any) {
    //  console.log("here   " + data);
    return this.http.post<any>(
      'api/vendorProfileedit', {
      data
    });
  }

  ///vendorRFQ
  vendorRFQ() {
    return this.http.post<any>(
      'api/vendorRFQ', {
    });
  }

  vendorCredit() {
    return this.http.post<any>(
      'api/vendorCredit', {
    });
  }
  vendorDebit() {
    return this.http.post<any>(
      'api/vendorDebit', {
    });
  }
  vendorPaymentaging() {
    return this.http.post<any>(
      'api/vendorPaymentaging', {
    });
  }
  vendorPO() {
    return this.http.post<any>('api/vendorPO', {});
  }
  vendorGoodsreceipt() {
    return this.http.post<any>('api/vendorGoodsreceipt', {});
  }
  vendorInvoice() {
    return this.http.post<any>(
      'api/vendorInvoice', {
    });
  }

  vendorInvoicePdf(invNo, fisc) {
    return this.http.post<any>(
      'api/vendorInvoicePdf', {
      invNo: invNo,
      fisc: fisc,
    });
  }

  /////////

  setPo(data) {
    this.po = data;
    this.po_prev_size = data.length;
  }

  getPo() {
    return this.po;
  }

  po_notify(po_curr_size: any) {
    if (po_curr_size - this.po_prev_size > 0) {
      this.po_prev_size = po_curr_size;
      return true;
    }
    else {
      return false;
    }
  }

}


