import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileViewService } from '../../profile-view.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  constructor(private customer: ProfileViewService) { }

  ngOnInit() {
    this.customer.getCustomerid().subscribe(
      res => {
        // console.log('ih');
        this.user = res.cust_id;
        console.log("result -- " + res);
      },
      error => {
        console.log(error);
      }
    )
    console.log(this.user);
  }

}
