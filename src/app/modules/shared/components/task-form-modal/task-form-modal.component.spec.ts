import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskFormModalComponent} from './task-form-modal.component';

describe('TaskFormModalComponent', () => {
  let component: TaskFormModalComponent;
  let fixture: ComponentFixture<TaskFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
