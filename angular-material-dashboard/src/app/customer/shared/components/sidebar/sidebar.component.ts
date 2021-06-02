import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/customer/profile-view.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ProfileViewService]
})
export class SidebarComponent implements OnInit {
  user_id: any;
  constructor(private customer: ProfileViewService) {
    //console.log("hi");
    this.customer.getCustomerid().subscribe(
      res => {
        // console.log('ih');
        this.user_id = res.cust_id;
        console.log("result -- " + res);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {

  }

}



