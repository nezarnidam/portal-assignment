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
  send_notification: boolean;

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

  intervalId = setInterval(() => {
    this.vendorservice.vendorPO().subscribe((res) => {
      let PoData = res;
      // this.send_notification = this.vendorDataService.po_notify(PoData.length);
      // if(this.send_notification === true){
      //   $('.toast').toast({ autohide: false });
      //   $('.toast').toast('show');
      // }
    });
  }, 5000);

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


}
