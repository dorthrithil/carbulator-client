import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTourNotificationComponent } from './running-tour-notification.component';

describe('RunningTourNotificationComponent', () => {
  let component: RunningTourNotificationComponent;
  let fixture: ComponentFixture<RunningTourNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningTourNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTourNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
