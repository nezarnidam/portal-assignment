import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashComponent } from './employeedash.component';

describe('EmployeedashComponent', () => {
  let component: EmployeedashComponent;
  let fixture: ComponentFixture<EmployeedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
