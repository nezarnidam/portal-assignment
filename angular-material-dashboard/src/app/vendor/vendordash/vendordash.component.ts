import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendordash',
  templateUrl: './vendordash.component.html',
  styleUrls: ['./vendordash.component.scss']
})
export class VendordashComponent implements OnInit {
  sideBarOpen = true;

  constructor(private router: Router, private vendorservice: VendorService) { }

  ngOnInit() {
    this.vendorservice.vendorLoggedin().subscribe(
      res => {
        if (res.status == 'no') {
          this.router.navigate(['/vendorlogin']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  sideBarToggler() {

    this.sideBarOpen = !this.sideBarOpen;

  }



}
