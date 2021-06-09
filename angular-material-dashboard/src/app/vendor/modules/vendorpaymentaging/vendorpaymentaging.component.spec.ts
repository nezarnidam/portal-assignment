import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorpaymentagingComponent } from './vendorpaymentaging.component';

describe('VendorpaymentagingComponent', () => {
  let component: VendorpaymentagingComponent;
  let fixture: ComponentFixture<VendorpaymentagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorpaymentagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorpaymentagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
