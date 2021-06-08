import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {



  constructor(private route: Router) { }

  ngOnInit() {
  }

  onCustomerLogin() {
    //  alert("couldnt connect");

    this.route.navigate(["/customerlogin"]);
  }
  onVendorLogin() {
    //  alert("couldnt connect");
    this.route.navigate(["/vendorlogin"]);
  }
  onEmployeeLogin() {
    // alert("couldnt connect");
  }
}
