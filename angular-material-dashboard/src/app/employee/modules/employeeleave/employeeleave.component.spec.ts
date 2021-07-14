import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeleaveComponent } from './employeeleave.component';

describe('EmployeeleaveComponent', () => {
  let component: EmployeeleaveComponent;
  let fixture: ComponentFixture<EmployeeleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
