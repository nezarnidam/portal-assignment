import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


interface CustLoginResponseData {
  cust_id: string;
  cust_name: string;
  cust_name2: string;
  cust_street: string;
  cust_city: string;
  cust_state: string;
  cust_country: string;
  cust_post: string;
  //cust_sort: string;
  cust_mobilenumber: string;
}

interface CustProfileEditResponseData {
  edit_status: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileViewService {

  constructor(private http: HttpClient) { }

  viewprofile(username: string) {

    return this.http.post<CustLoginResponseData>(
      '/api/profileview',
      {
        username: username,
        // password: password,
      }
    );
  }

  getCustomerid() {
    return this.http.post<any>(
      '/api/getcustomerid',
      {

      }
    );
  }

  // kunnr,land1,name1,name2,ort01,pstlz,regio,stras,telf1

  editprofile(kunnr: string, land1: string, name1: string, name2: string, ort01: string, pstlz: string, regio: string, stras: string, telf1: string) {

    return this.http.post<CustProfileEditResponseData>(
      '/api/profileedit',
      {
        //username: username,
        // password: password,
        kunnr: kunnr,
        land1: land1,
        name1: name1,
        name2: name2,
        ort01: ort01,
        pstlz: pstlz,
        regio: regio,
        stras: stras,
        telf1: telf1
      }
    );
  }



}
