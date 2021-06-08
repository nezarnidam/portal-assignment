import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user_id: any;

  constructor(private vendorservice: VendorService) { }

  ngOnInit() {
    this.vendorservice.getVendorid().subscribe(
      res => {
        this.user_id = res.vendor_id;
      },
      error => {
        console.log(error);
      }
    )
  }

}
