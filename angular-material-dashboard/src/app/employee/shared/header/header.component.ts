import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private employeeservice: EmployeeService, private router: Router) { }

  ngOnInit() {
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onProfile() {
    this.router.navigate(['employee/profile']);
  }

  onSignOut() {
    this.employeeservice.employeeSignout().subscribe(
      res => {
        this.router.navigate(["/employeelogin"]);
      },
      error => {
        console.log(error);
      }
    )
  }


}
