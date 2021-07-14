import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeleavecreateComponent } from './employeeleavecreate.component';

describe('EmployeeleavecreateComponent', () => {
  let component: EmployeeleavecreateComponent;
  let fixture: ComponentFixture<EmployeeleavecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeleavecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeleavecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
