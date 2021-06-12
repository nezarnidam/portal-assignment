import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryitemComponent } from './deliveryitem.component';

describe('DeliveryitemComponent', () => {
  let component: DeliveryitemComponent;
  let fixture: ComponentFixture<DeliveryitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
