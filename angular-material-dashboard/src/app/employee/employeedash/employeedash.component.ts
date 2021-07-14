import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.scss']
})
export class EmployeedashComponent implements OnInit {
  sideBarOpen: boolean = true;

  @ViewChild(SidebarComponent, { static: false })
  private Component: SidebarComponent;
  routeChange() {
    this.Component.routeChange();
  }

  constructor(private employeeservice: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeservice.employeeLoggedin().subscribe(
      res => {
        if (res.status == 'no') {
          this.router.navigate(['/employeelogin']);
        }
      },
      error => {
        console.log(error);
      }
    );

    let s = document.createElement('script');
    s.setAttribute('src', 'https://cdn.cai.tools.sap/webchat/webchat.js');
    s.setAttribute('channelId', '808c8e51-6b47-46cf-b2b1-d9cd1587d51f');
    s.setAttribute('token', 'f509de21190e27e69bc720fb67ee63d0');
    s.setAttribute('id', 'cai-webchat');
    document.body.appendChild(s);

  }
  // this.router.events.subscribe(
  //   (event: any) => {
  //     if (event instanceof NavigationEnd) {
  //       console.log('this.router.url', this.router.url);
  //     }
  //   }
  // );
  sideBarToggler() {

    this.sideBarOpen = !this.sideBarOpen;

  }
  ngOnDestroy() {

  }
}
