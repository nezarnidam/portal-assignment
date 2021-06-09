import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordebitComponent } from './vendordebit.component';

describe('VendordebitComponent', () => {
  let component: VendordebitComponent;
  let fixture: ComponentFixture<VendordebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendordebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendordebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
