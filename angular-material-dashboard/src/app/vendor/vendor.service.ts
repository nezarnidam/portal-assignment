import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

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

}


