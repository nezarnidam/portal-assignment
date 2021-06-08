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

    }
    );
  }




}


