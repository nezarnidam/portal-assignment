import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  employeeLogin(employeeid: string, password: string) {
    return this.http.post<any>(
      'api/employeeLogin', {
      empid: employeeid,
      password: password,
    }
    );
  }
  employeeLoggedin() {
    return this.http.post<any>(
      'api/employeeLoggedin', {

    }
    );
  }

  getemployeeid() {
    return this.http.post<any>(
      'api/getemployeeid', {

    }
    );
  }
  employeeSignout() {
    return this.http.post<any>(
      'api/employeeSignout', {

    });
  }
  employeeProfile() {
    return this.http.post<any>(
      'api/employeeProfile', {
    });
  }
  employeeProfileEdit(data: any) {
    return this.http.post<any>(
      'api/employeeProfileEdit', {
      data
    });
  }
  employeeLeave() {
    return this.http.post<any>(
      'api/employeeLeave', {
    });
  }

  employeeLeaveType() {
    return this.http.post<any>(
      'api/employeeLeaveType', {
    });
  }
  employeeLeaveCreate(data: any) {
    return this.http.post<any>(
      'api/employeeLeaveCreate', {
      data
    });
  }
  employeePayslip() {
    return this.http.post<any>(
      'api/employeePayslip', {

    });
  }

  employeePayslipPdf(seqno: any) {
    return this.http.post<any>(
      'api/employeePayslipPdf', {
      seqno
    });
  }

  employeeFullandFinal() {
    return this.http.post<any>(
      'api/employeeFullandFinal', {

    });
  }


}
