import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGoodsreceiptComponent } from './vendor-goodsreceipt.component';

describe('VendorGoodsreceiptComponent', () => {
  let component: VendorGoodsreceiptComponent;
  let fixture: ComponentFixture<VendorGoodsreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorGoodsreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
