import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employeeleave',
  templateUrl: './employeeleave.component.html',
  styleUrls: ['./employeeleave.component.scss']
})
export class EmployeeleaveComponent implements OnInit {
  displayedColumns: string[] = ['ABSENCETYPE', 'position', 'name', 'weight', 'VALIDBEGIN', 'VALIDEND',];
  leave = [];
  searchedKeyword: string;

  constructor(private employeeservice: EmployeeService, private router: Router) {

  }

  ngOnInit() {
    this.employeeservice.employeeLeave().subscribe(
      res => {
        this.leave = res.Leave;
        console.log(this.leave);
      },
      error => {
        console.log(error);
      }
    );
  }
  onCreate() {
    this.router.navigate(['employee/createleave']);
  }

}
