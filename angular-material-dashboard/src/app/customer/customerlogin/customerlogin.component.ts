import { Component, OnInit, NgModule, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CustomerAuthService } from '../customer-auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customerlogin',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.scss'],
  providers: [CustomerAuthService]
})
export class CustomerloginComponent implements OnInit {

  userid: string = '0000111112';
  pass: string = '12345678';
  er: boolean = false;
  angForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private customerAuthService: CustomerAuthService) {
    this.createForm();
  }



  ngOnInit() {
  }


  login() {
    const username = this.userid;
    const password = this.pass;


    this.customerAuthService.custLogin(username, password).subscribe(
      res => {
        console.log(res.custAuth_status);
        status = res.custAuth_status;
        if (status === 'S') {
          this.er = false;

          this.router.navigate(['/customer']);
        } else {
          this.router.navigate(['/']);
          this.er = true;
          console.log('Redirected to login page')
        }
      },
      error => {
        // this.router.navigate(['customer']);
        this.er = true;
        console.log(error);
      }
    )
  }
  home() {
    this.router.navigate(['/']);
  }
  createForm() {
    this.angForm = this.fb.group({
      custid: ['', Validators.required],
      pass: ['', Validators.required]
    });


  }
}
