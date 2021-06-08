import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordashComponent } from './vendordash.component';

describe('VendordashComponent', () => {
  let component: VendordashComponent;
  let fixture: ComponentFixture<VendordashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendordashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendordashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
