import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POitemComponent } from './poitem.component';

describe('POitemComponent', () => {
  let component: POitemComponent;
  let fixture: ComponentFixture<POitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
