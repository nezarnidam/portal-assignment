import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeprofileComponent implements OnInit {
  btn: string = 'Edit';
  editing = false;
  employeeDetails = {
    ID: '',
    fname: '',
    sname: '',
    city: '',
    position: '',
    street: '',
    country: '',
    postcode: '',
    telephone: '',
    JOIN_DATE: ''
  };

  constructor(private employeeservice: EmployeeService) {
    this.employeeservice.employeeProfile().subscribe(
      res => {
        this.employeeDetails.ID = res.PERNR;
        this.employeeDetails.fname = res.VORNA;
        this.employeeDetails.sname = res.NACHN;
        this.employeeDetails.city = res.ORT01;
        this.employeeDetails.postcode = res.PSTLZ;
        this.employeeDetails.street = res.STRAS;
        this.employeeDetails.country = res.LAND;
        this.employeeDetails.position = res.PLANS_TXT;
        this.employeeDetails.telephone = res.TELNR;
        this.employeeDetails.JOIN_DATE = res.BEGDA;
        console.log(this.employeeDetails);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

  OnEdit() {
    if (this.btn == 'Edit') {
      this.editing = true;
      this.btn = 'Cancel';
    } else {
      this.editing = false;
      this.btn = 'Edit';
      this.employeeservice.employeeProfile().subscribe(
        res => {
          this.employeeDetails.ID = res.PERNR;
          this.employeeDetails.fname = res.VORNA;
          this.employeeDetails.sname = res.NACHN;
          this.employeeDetails.city = res.ORT01;
          this.employeeDetails.postcode = res.PSTLZ;
          this.employeeDetails.street = res.STRAS;
          this.employeeDetails.country = res.LAND;
          this.employeeDetails.position = res.PLANS_TXT;
          this.employeeDetails.telephone = res.TELNR;
          this.employeeDetails.JOIN_DATE = res.BEGDA;
          console.log(this.employeeDetails);
        },
        error => {
          console.log(error);
        }
      )

    }

  }
  OnSave() {
    this.editing = false;
    this.btn = 'Edit';


    this.employeeservice.employeeProfileEdit(this.employeeDetails).subscribe(
      res => {
        console.log(res.edit_status);
      },
      error => {
        console.log(error);
      }
    )
  }
}
