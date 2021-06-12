import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryitemComponent } from './inquiryitem.component';

describe('InquiryitemComponent', () => {
  let component: InquiryitemComponent;
  let fixture: ComponentFixture<InquiryitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
