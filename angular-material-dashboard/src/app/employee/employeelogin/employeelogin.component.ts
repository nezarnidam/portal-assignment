import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.scss']
})
export class EmployeeloginComponent implements OnInit {

  angForm: FormGroup;
  employeeid: any = 5015;
  pass: any = 12345678;
  er: boolean = false;
  constructor(private fb: FormBuilder, private employeeservice: EmployeeService, private router: Router) {
    this.createForm();
  }
  ngOnInit() {
  }
  login() {
    const employeename = this.employeeid;
    const password = this.pass;
    this.employeeservice.employeeLogin(employeename, password).subscribe(
      res => {

        status = res.TYPE;
        if (status == 'S') {
          this.er = false;
          this.router.navigate(['/employee']);
        } else {
          this.er = true;
        }
      },
      error => {
        this.er = true;
        console.log(error);
      }
    )
  }
  createForm() {
    this.angForm = this.fb.group({
      empid: ['', Validators.required],
      pass: ['', Validators.required]
    });



  }
}
