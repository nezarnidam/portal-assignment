import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {



  // @ViewChild('login', { read: true, static: false }) loginElement: ElementRef;
  // @ViewChild('board', { read: true, static: false }) boardElement: ElementRef;
  // @ViewChild('about', { read: true, static: false }) aboutElement: ElementRef;

  constructor(private router: Router) { }

  public currentActive = 1;
  public loginOffset: Number = null;
  public boardOffset: Number = null;
  public aboutOffset: Number = null;


  public componentActive = 1;

  ngAfterViewInit() {
    this.loginOffset = 20;
    //  this.loginElement.nativeElement.offsetTop;
    this.boardOffset = 731;
    // this.boardElement.nativeElement.offsetTop;
    this.aboutOffset = 1482;
    //  this.aboutElement.nativeElement.offsetTop;
    console.log(this.loginOffset + ", " + this.boardOffset + ", " + this.aboutOffset);
  }

  scrollToElement() {
    // scrollToElement Code :)
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    console.log("home " + this.loginOffset);
    console.log("board " + this.boardOffset);
    console.log("about " + this.aboutOffset);
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
    this.componentActive = 3;
  }
}
