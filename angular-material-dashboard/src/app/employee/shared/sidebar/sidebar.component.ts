import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user_id: any;
  componentActive: any;
  resigned = false;
  constructor(private employeeservice: EmployeeService, private router: Router) {
    if (this.router.url == '/employee/leave' || this.router.url == '/employee/createleave') {
      this.componentActive = 1;
    }
    else if (this.router.url == '/employee/payslip') {
      this.componentActive = 2;
    }
    else if (this.router.url == '/employee/settlement') {
      this.componentActive = 3;
    }
  }

  ngOnInit() {

    this.employeeservice.getemployeeid().subscribe(
      res => {
        this.user_id = res.employee_id;
      },
      error => {
        console.log(error);
      }
    )
    this.employeeservice.employeeProfile().subscribe(

      res => {
        if (res.STATUS == 0) {
          this.resigned = true;
        }
      },
      error => {
        console.log(error);
      }

    )
  }
  onLeave() {
    // this.componentActive = 1;
    this.router.navigate(['/employee/leave']);
  }
  onPayslip() {
    // this.componentActive = 2;
    this.router.navigate(['/employee/payslip']);
  }
  onSettlement() {
    // this.componentActive = 3;
    this.router.navigate(['/employee/settlement']);
  }
  routeChange() {
    console.log("routechange");
    if (this.router.url == '/employee/leave' || this.router.url == '/employee/createleave') {
      this.componentActive = 1;
    }
    else if (this.router.url == '/employee/payslip') {
      this.componentActive = 2;
    }
    else if (this.router.url == '/employee/settlement') {
      this.componentActive = 3;
    } else {
      this.componentActive = 4;
    }
  }
}
