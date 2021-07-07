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
    );
    this.vendorservice.vendorInit();
    // this.vendorservice.vendorPO().subscribe(
    //   (res) => {
    //     let PoData = res;
    //     this.vendorservice.setPo(PoData);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  sideBarToggler() {

    this.sideBarOpen = !this.sideBarOpen;

  }

  // intervalId = setInterval(() => {
  //   this.vendorservice.vendorPO().subscribe((res) => {
  //     let PoData = res;
  //     // alert("interval");
  //     this.send_notification = this.vendorservice.po_notify(PoData.length);
  //     if (this.send_notification === true) {
  //       // $('.toast').toast({ autohide: false });
  //       // $('.toast').toast('show');
  //       alert("new po created");
  //     }
  //   });
  // }, 5000);

  ngOnDestroy() {
    this.vendorservice.clear();
    //   // clearInterval(this.intervalId);
  }


}
