import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service'
@Component({
  selector: 'app-vendorlogin',
  templateUrl: './vendorlogin.component.html',
  styleUrls: ['./vendorlogin.component.scss']
})
export class VendorloginComponent implements OnInit {

  vendorid: string = '0000000095';
  pass: string = '12345678';
  er: boolean = false;

  constructor(private vendorservice: VendorService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const vendorname = this.vendorid;
    const password = this.pass;
    this.vendorservice.vendorLogin(vendorname, password).subscribe(
      res => {

        status = res.RESULT;
        if (status == 'S') {
          this.er = false;
          this.router.navigate(['/vendor']);
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
  home() {
    this.router.navigate(['/']);
  }

}