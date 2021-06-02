import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


interface CustMaster {
    row: string;
    ref_custId: string;
    status: string;
}


@Injectable({ providedIn: 'root' })


export class CustomerServices {

    constructor(private http: HttpClient) { }

    customerInquiry(username: string) {
        return this.http.post<any>(
            '/api/customerInquiry',
            {
                customer_id: username
            }
        );
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




