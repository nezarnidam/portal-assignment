import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private vendorservice: VendorService, private router: Router) { }

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
    this.router.navigate(['vendor/profile']);
  }

  onSignOut() {
    this.vendorservice.vendorSignout().subscribe(
      res => {
        this.router.navigate(["/vendorlogin"]);
      },
      error => {
        console.log(error);
      }
    )
  }

}
