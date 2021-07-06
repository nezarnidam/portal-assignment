import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SelfComponent } from '../self/self.component';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {



  @ViewChild('login', { static: false }) loginElement: ElementRef;
  @ViewChild('board', { static: false }) boardElement: ElementRef;
  @ViewChild('about', { static: false }) aboutElement: ElementRef;

  constructor(private router: Router, private dialog: MatDialog) {
    if (this.router.url == '/') {
      this.componentActive = 1;
    }
    if (this.router.url == '/vendorlogin') {
      this.componentActive = 2;
    }
    else if (this.router.url == '/employeelogin') {
      this.componentActive = 3;
    }
  }

  public currentActive = 1;
  public loginOffset: Number = null;
  public boardOffset: Number = null;
  public aboutOffset: Number = null;


  public componentActive;

  ngAfterViewInit() {
    // this.loginOffset = 20;
    console.log("inside");
    this.loginOffset = this.loginElement.nativeElement.offsetTop;
    // this.boardOffset = 731;
    this.boardOffset = this.boardElement.nativeElement.offsetTop;
    // this.aboutOffset = 1482;
    this.aboutOffset = this.aboutElement.nativeElement.offsetTop;
    // console.log(this.loginOffset + ", " + this.boardOffset + ", " + this.aboutOffset);
    // console.log(this.route);
    // this.router.events.subscribe((url: any) => console.log(url));
    console.log(this.router.url);  // to print only path eg:"/login"



  }

  scrollToElement() {
    // scrollToElement Code :)
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {

    if (window.pageYOffset + 200 >= this.loginOffset && window.pageYOffset + 200 < this.boardOffset) { //
      this.currentActive = 1;
      // console.log(window.pageYOffset);
    } else if (window.pageYOffset + 200 >= this.boardOffset && window.pageYOffset + 200 < this.aboutOffset) { //
      this.currentActive = 2;
      // console.log(window.pageYOffset);
    } else if (window.pageYOffset + 200 >= this.aboutOffset) {
      this.currentActive = 3;
      // console.log(window.pageYOffset);
    } else {
      this.currentActive = 0;
    }
  }



  ///
  title = 'landing';
  scrollToBoard(): void {
    const element = document.querySelector("#boardId")
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  scrollToAbout() {
    const element = document.querySelector("#aboutId")
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  scrollTologin() {
    const element = document.querySelector("#loginId")
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onCustomer() {
    this.componentActive = 1;
    this.router.navigate(['/']);
  }

  onVendor() {
    this.componentActive = 2;
    this.router.navigate(['/vendorlogin']);
  }

  onEmployee() {
    this.router.navigate(['/employeelogin']);
    this.componentActive = 3;
  }
  self() {
    console.log("self clicked");
    this.dialog.open(SelfComponent
      // , {
      // width: '1000px',
      // height: '1000px',
      // ,data: { item: this.selected, context: value }
      // }
    );
  }

}
