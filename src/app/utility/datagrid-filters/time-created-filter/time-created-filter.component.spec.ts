import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCreatedFilterComponent } from './time-created-filter.component';

describe('TimeCreatedFilterComponent', () => {
  let component: TimeCreatedFilterComponent;
  let fixture: ComponentFixture<TimeCreatedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCreatedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCreatedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
