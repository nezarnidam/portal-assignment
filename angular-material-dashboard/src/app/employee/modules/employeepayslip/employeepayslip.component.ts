import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employeepayslip',
  templateUrl: './employeepayslip.component.html',
  styleUrls: ['./employeepayslip.component.scss']
})
export class EmployeepayslipComponent implements OnInit {
  searchedKeyword: string;
  Payslip = [];
  baseConvString: string;
  constructor(private employeeservices: EmployeeService) { }

  ngOnInit() {
    this.employeeservices.employeePayslip().subscribe(
      res => {
        this.Payslip = res.payslip;
      }, error => {
        console.log(error);
      }
    )
  }

  onDownload(seqno: string) {
    this.employeeservices.employeePayslipPdf(seqno).subscribe(
      res => {
        const linkSource = `data:application/pdf;base64,${res.PDF}`;
        const downloadLink = document.createElement("a");
        const fileName = "Payslip.pdf";
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
