import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFQitemComponent } from './rfqitem.component';

describe('RFQitemComponent', () => {
  let component: RFQitemComponent;
  let fixture: ComponentFixture<RFQitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFQitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFQitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
