import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskInstanceNotificationComponent} from './task-instance-notification.component';

describe('TaskNotificationComponent', () => {
  let component: TaskInstanceNotificationComponent;
  let fixture: ComponentFixture<TaskInstanceNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInstanceNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInstanceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
