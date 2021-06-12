import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPOComponent } from './vendor-po.component';

describe('VendorPOComponent', () => {
  let component: VendorPOComponent;
  let fixture: ComponentFixture<VendorPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
