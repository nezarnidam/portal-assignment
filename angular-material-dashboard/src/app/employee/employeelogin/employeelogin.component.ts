import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { logging } from 'protractor';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.scss']
})
export class EmployeeloginComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {
  }
  login() {
    console.log("in login");
  }
  createForm() {
    this.angForm = this.fb.group({
      empid: ['', Validators.required],
      pass: ['', Validators.required]
    });



  }
}
