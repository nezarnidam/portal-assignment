import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';

@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.scss']
})
export class VendorprofileComponent implements OnInit {
  btn: string = 'Edit';
  editing = false;

  vendorDetails = {
    ID: '',
    fname: '',
    sname: '',
    city: '',
    district: '',
    street: '',
    country: '',
    postcode: '',
    telephone: ''
  }

  constructor(private vendorservice: VendorService) {
    console.log("in");
    this.vendorservice.vendorProfile().subscribe(
      res => {
        this.vendorDetails.ID = res.VENDOR;
        this.vendorDetails.fname = res.NAME;
        this.vendorDetails.sname = res.NAME_2;
        this.vendorDetails.city = res.CITY;
        this.vendorDetails.postcode = res.POSTL_CODE;
        this.vendorDetails.street = res.STREET;
        this.vendorDetails.country = res.COUNTRY;
        this.vendorDetails.district = res.DISTRICT;
        this.vendorDetails.telephone = res.TELEPHONE;
        console.log(this.vendorDetails);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

  OnEdit() {
    if (this.btn == 'Edit') {
      this.editing = true;
      this.btn = 'Cancel';
    } else {
      this.editing = false;
      this.btn = 'Edit';
      this.vendorservice.vendorProfile().subscribe(
        res => {
          this.vendorDetails.ID = res.VENDOR;
          this.vendorDetails.fname = res.NAME;
          this.vendorDetails.sname = res.NAME_2;
          this.vendorDetails.city = res.CITY;
          this.vendorDetails.postcode = res.POSTL_CODE;
          this.vendorDetails.street = res.STREET;
          this.vendorDetails.country = res.COUNTRY;
          this.vendorDetails.district = res.DISTRICT;
          this.vendorDetails.telephone = res.TELEPHONE;
          console.log(this.vendorDetails);
        },
        error => {
          console.log(error);
        }
      )

    }

  }
  OnSave() {
    this.editing = false;
    this.btn = 'Edit';


    this.vendorservice.vendorProfileedit(this.vendorDetails).subscribe(
      res => {
        console.log(res.edit_status);
      },
      error => {
        console.log(error);
      }
    )
  }
}
