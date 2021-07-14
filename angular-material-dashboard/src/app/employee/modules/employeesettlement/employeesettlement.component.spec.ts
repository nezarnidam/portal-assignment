import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesettlementComponent } from './employeesettlement.component';

describe('EmployeesettlementComponent', () => {
  let component: EmployeesettlementComponent;
  let fixture: ComponentFixture<EmployeesettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
