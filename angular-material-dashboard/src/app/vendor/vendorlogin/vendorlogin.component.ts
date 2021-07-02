import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  angForm: FormGroup;
  constructor(private vendorservice: VendorService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

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
  createForm() {
    this.angForm = this.fb.group({
      vendorid: ['', Validators.required],
      pass: ['', Validators.required]
    });



  }

}
