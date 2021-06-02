import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from '../../profile-view.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileViewService]
})
export class ProfileComponent implements OnInit {
  btn: string = 'Edit';
  editing = false;
  username = '555';
  custid = '';
  fname = '';
  sname = '';
  street = '';
  city = '';
  state = '';
  country = '';
  post = '';
  //  sort = '';
  mobilenumber = '';
  constructor(private customerprofile: ProfileViewService) {
    this.customerprofile.viewprofile(this.username).subscribe(
      res => {
        //console.log(res.cust_name);
        // status = res.cust_name;
        //console.log(status);
        // if (status === 'S') {
        //   this.er = false;
        this.custid = res.cust_id;
        this.fname = res.cust_name;
        this.sname = res.cust_name2;
        this.street = res.cust_street;
        this.city = res.cust_city;
        this.state = res.cust_state;
        this.country = res.cust_country;
        this.post = res.cust_post;
        //this.sort = res.cust_sort;
        this.mobilenumber = res.cust_mobilenumber;
        //console.log(this.country);
        // let x = document.getElementById("fname").value='';
        //x.inner
        // document.write(status);

        //   this.router.navigate(['/customer']);
        // } else {
        //   this.router.navigate(['/customerlogin']);
        //   this.er = true;
        //   console.log('Redirected to login page')
        // }
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  OnEdit() {
    if (this.btn == 'Edit') {
      this.editing = true;
      this.btn = 'Cancel';
    } else {
      this.editing = false;
      this.btn = 'Edit';
    }

  }
  OnSave() {
    this.editing = false;
    this.btn = 'Edit';


    this.customerprofile.editprofile(this.custid, this.country, this.fname, this.sname, this.city, this.post, this.state, this.street, this.mobilenumber).subscribe(
      res => {
        console.log(res.edit_status);
      },
      error => {
        console.log(error);
      }
    )
  }
}







function ngOnInit() {
  throw new Error('Function not implemented.');
}

