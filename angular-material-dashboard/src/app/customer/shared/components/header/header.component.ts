import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { CustomerAuthService } from 'src/app/customer/customer-auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CustomerAuthService]
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private route: Router, private customer: CustomerAuthService) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  onSignOut() {
    this.customer.signout().subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
    this.route.navigate(["/"]);
  }
  onProfile() {
    this.route.navigate(['customer/customerprofile']);
  }

}
