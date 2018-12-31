import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskInfoModalComponent} from './task-info-modal.component';

describe('TaskInfoModalComponent', () => {
  let component: TaskInfoModalComponent;
  let fixture: ComponentFixture<TaskInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInfoModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
