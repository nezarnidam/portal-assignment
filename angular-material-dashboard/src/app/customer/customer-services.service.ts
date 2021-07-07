import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


interface CustMaster {
    row: string;
    ref_custId: string;
    status: string;
}

interface InqHead {
    DOC_NUMBER: string;
    SOLD_TO: string;
    REC_DATE: string;
    REC_TIME: string;
    CREATED_BY: string;
}
interface InqItem {
    "DOC_NUMBER": string;
    "MATERIAL": string;
    "MATL_GROUP": string;
    "ITM_NUMBER": string;
    "SHORT_TEXT": string;
    "REQ_QTY": string;
    "NET_PRICE": string;
    "NET_WEIGHT": string;
}
interface Sales {
    "SD_DOC": string;
    "NAME": string;
    "DOC_DATE": string;
    "ITM_NUMBER": string;
    "MATERIAL": string;
    "SHORT_TEXT": string;
    "REQ_QTY": string;
    "NET_PRICE": string;
    "REQ_DATE": string;
    "DOC_TYPE": string;
}
interface DeliveryHead {
    "DOC_NUMBER": string;
    "CREATED_BY": string;
    "ENTRY_TIME": string;
    "CREATED_ON": string;
    "LOADING_DATE": string;
    "DELIVERY_DATE": string;
    "SHIPPING_POINT": string;
    "PICKING_DATE": string;
    "UNLOADING_POINT": string;
}
interface DeliveryItem {
    "DOC_NUMBER": string;
    "DELIVERY_ITEM": string;
    "MATERIAL_NO": string;
    "MATERIAL_ENTERED": string;
    "SHORT_TEXT": string;
    "DELIVERY_QTY": string;
}
interface Credit {
    "DOC_NO": "${elm.DOC_NO}",
    "DOC_TYPE": string;
    "COMP_CODE": string;
    "ENTRY_DATE": string;
    "ITEM_NUM": string;
    "CURRENCY": string;
    "AMNT_LOCAL": string;
    "BLINE_DATE": string;
    "ALLOC_NUM": string;
}
interface Debit {
    "DOC_NO": "${elm.DOC_NO}",
    "DOC_TYPE": string;
    "COMP_CODE": string;
    "ENTRY_DATE": string;
    "ITEM_NUM": string;
    "CURRENCY": string;
    "AMNT_LOCAL": string;
    "BLINE_DATE": string;
    "ALLOC_NUM": string;
}
interface Paymentsaging {
    "COMP_CODE": string;
    "CUSTOMER": string;
    "ALLOC_NUM": string;
    "FISC_YEAR": string;
    "ITEM_NUM": string;
    "BILL_DOC": string;
    "POSTING_DATE": string;
    "PAYMENT_TERMS": string;
    "AMNT_LOCAL": string;
    "AMNT_DOC": string;
    "PAY_AGING": string;
    "TAX_LOCAL": string;
}

@Injectable({ providedIn: 'root' })


export class CustomerServices {

    static InqHeadData: InqHead[] = [];
    static InqItemData: InqItem[] = [];
    static SalesData: Sales[] = [];
    static DeliveryHeadData: DeliveryHead[] = [];
    static DeliveryItemData: DeliveryItem[] = [];
    static CreditData: Credit[] = [];
    static DebitData: Debit[] = [];
    static PAData: Paymentsaging[] = [];

    constructor(private http: HttpClient) { }

    customerInquiry() {
        return this.http.post<any>(
            '/api/customerInquiry',
            {
                // customer_id: username
            }
        );
    }
    clear() {
        CustomerServices.InqHeadData = [];
        CustomerServices.InqItemData = [];
        CustomerServices.SalesData = [];
        CustomerServices.DeliveryHeadData = [];
        CustomerServices.DeliveryItemData = [];
        CustomerServices.CreditData = [];
        CustomerServices.DebitData = [];
        CustomerServices.PAData = [];
    }
    init() {
        this.customerInquiry().subscribe(
            res => {
                CustomerServices.InqHeadData = res.head;
                CustomerServices.InqItemData = res.item;
                // console.log(CustomerServices.InqHeadData);
                // console.log(CustomerServices.InqItemData);
                // this.set(this.InqHeadData);
            },
            error => {
                console.log(error);
            }
        );
        this.customerSales().subscribe(
            res => {
                CustomerServices.SalesData = res.sales_data;
                // CustomerServices.InqItemData = res.item;
                // console.log(CustomerServices.InqHeadData);
                // console.log(CustomerServices.InqItemData);
                // this.set(this.InqHeadData);
            },
            error => {
                console.log(error);
            }
        )
        this.customerDelivery().subscribe(
            res => {
                CustomerServices.DeliveryHeadData = res.head;
                CustomerServices.DeliveryItemData = res.item;
                // console.log(CustomerServices.InqHeadData);
                // console.log(CustomerServices.InqItemData);
                // this.set(this.InqHeadData);
            },
            error => {
                console.log(error);
            }
        )
        this.customerCredit().subscribe(
            res => {
                CustomerServices.CreditData = res.credit_data;
            },
            error => {
                console.log(error);
            }
        )
        this.customerDebit().subscribe(
            res => {
                CustomerServices.DebitData = res.debit_data;
            },
            error => {
                console.log(error);
            }
        )
        this.customerPaymentAging().subscribe(
            res => {
                CustomerServices.PAData = res.payaging_data;
            },
            error => {
                console.log(error);
            }
        )
    }
    // set(head) {
    //     this.InqHeadData = head;
    //     console.log(this.getInquiryHead());
    // }
    getInquiryHead() {
        // console.log(CustomerServices.InqHeadData);
        return CustomerServices.InqHeadData;
    }
    getInquiryItem() {
        // console.log(CustomerServices.InqItemData);
        return CustomerServices.InqItemData;
    }
    getSales() {
        return CustomerServices.SalesData;
    }
    getDeliveryHead() {
        return CustomerServices.DeliveryHeadData;
    }
    getDeliveryItem() {
        return CustomerServices.DeliveryItemData;
    }
    getCredit() {
        return CustomerServices.CreditData;
    }
    getDebit() {
        return CustomerServices.DebitData;
    }
    getPaymentsAging() {
        return CustomerServices.PAData;
    }
    customerSales() {
        return this.http.post<any>(
            '/api/customerSales', {

        }
        )
    }

    customerDelivery() {
        return this.http.post<any>(
            'api/customerDelivery', {

        }
        )
    }

    customerCredit() {
        return this.http.post<any>(
            '/api/customerCredit', {

        }
        )
    }

    customerDebit() {
        return this.http.post<any>(
            '/api/customerDebit', {

        }
        )
    }

    customerPaymentAging() {
        return this.http.post<any>(
            '/api/customerPaymentAging', {

        }
        )
    }

    customerMaster(data: any) {
        return this.http.post<CustMaster[]>(
            '/api/customerMaster',
            {
                data
            }
        );
    }

}




