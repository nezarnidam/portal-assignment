import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAuthService } from '../../customer-auth.service';
import { CustomerServices } from '../../customer-services.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [CustomerAuthService]
})
export class DefaultComponent implements OnInit {

  // loggedin = false;
  sideBarOpen = true;

  constructor(private customerservices: CustomerServices, private customerservice: CustomerAuthService, private route: Router) { }

  ngOnInit() {

    this.customerservice.loggedin().subscribe(
      res => {
        if (res.status == 'no') {
          // this.loggedin = false;
          this.route.navigate(['/']);
        }
        //  else {
        //   this.loggedin = true;
        // }
      },
      error => {
        console.log(error);
      }
    );
    this.customerservices.init();

  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;

  }
  ngOnDestroy() {
    this.customerservices.clear();
  }



}
