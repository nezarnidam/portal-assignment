import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employeeleavecreate',
  templateUrl: './employeeleavecreate.component.html',
  styleUrls: ['./employeeleavecreate.component.scss']
})
export class EmployeeleavecreateComponent implements OnInit {
  angForm: FormGroup;
  employee = {
    empid: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    hours: ''
  }
  status;
  leave = [];
  constructor(private fb: FormBuilder, private router: Router, private employeeservices: EmployeeService) {
    this.createForm();
  }

  ngOnInit() {
    this.employeeservices.getemployeeid().subscribe(
      res => {
        this.employee.empid = res.employee_id;
      },
      error => {
        console.log(error);
      }
    )
    this.employeeservices.employeeLeaveType().subscribe(
      res => {
        this.leave = res.leave;
      }, error => {
        console.log(error);
      }
    )
  }

  onCancel() {
    this.router.navigate(['employee/leave']);
  }
  onSubmit() {
    this.employee.startTime = this.employee.startTime.concat(':00');
    this.employee.endTime = this.employee.endTime.concat(':00');
    this.employeeservices.employeeLeaveCreate(this.employee).subscribe(
      res => {
        this.status = res.status;
        if (this.status == 'Successful') {
          alert('successful');
        }
        else {
          alert('unsuccessful')
        }
      }, error => {
        console.log(error);
      }
    )
    // console.log(this.employee.startTime);
    // console.log(this.employee.endTime);
    // console.log(this.employee.leaveType);
    // console.log(this.employee.startTime.concat(':00'));
    this.employee.startTime = '';
    this.employee.endTime = '';
  }
  createForm() {
    this.angForm = this.fb.group({
      hours: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      type: ['', Validators.required],
      endTime: ['', Validators.required],
      startTime: ['', Validators.required]
    });
  }
}
