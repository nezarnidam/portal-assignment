import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GritemComponent } from './gritem.component';

describe('GritemComponent', () => {
  let component: GritemComponent;
  let fixture: ComponentFixture<GritemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GritemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
