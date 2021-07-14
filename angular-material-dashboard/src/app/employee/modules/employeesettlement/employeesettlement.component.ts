import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employeesettlement',
  templateUrl: './employeesettlement.component.html',
  styleUrls: ['./employeesettlement.component.scss']
})
export class EmployeesettlementComponent implements OnInit {
  ppwlaData: any = [];
  wagetype: any = [];
  fullandFinalData = {
    ADDITIONAL_PAY: '',
    APPROVER: '',
    COMPANY: '',
    COMPANYCODE: '',
    COSTCENTER: '',
    COSTCENTRE_DESC: '',
    CURRENCY: '',
    DEDUCT_AMT: '',
    DEPARTMENT: '',
    DIVISION: '',
    EMPID: '',
    FNAME: '',
    GROSS_SAL: '',
    JOB: '',
    JOINING_DATE: '',
    LEAVING_DATE: '',
    LNAME: '',
    NET_SAL: '',
    NUM_OF_LEAVES: '',
    TENURE_PERIOD: ''
  }

  constructor(private employeeservices: EmployeeService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.employeeservices.employeeFullandFinal().subscribe(
      res => {
        console.log(res);
        this.fullandFinalData = res.fullandFinal_data;
        this.ppwlaData = res.ppwla;
        this.ppwlaData = this.ppwlaData.sort();
        this.wagetype = res.wagetype;
        this.wagetype = this.wagetype.sort();
        // this.fullandFinalData.JOINING_DATE = this.datepipe.transform(this.fullandFinalData.JOINING_DATE, 'yyyy/MM/dd');
        // this.fullandFinalData.JOINING_DATE = formatDate(this.fullandFinalData.JOINING_DATE, 'dd/MM/yyyy', 'en_US');
      },
      error => {
        console.log(error);
      })
  }
}
