import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentagingComponent } from './paymentaging.component';

describe('PaymentagingComponent', () => {
  let component: PaymentagingComponent;
  let fixture: ComponentFixture<PaymentagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
