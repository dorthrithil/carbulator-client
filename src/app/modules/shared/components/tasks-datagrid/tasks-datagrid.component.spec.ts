import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TasksDatagridComponent} from './tasks-datagrid.component';

describe('TasksDatagridComponent', () => {
  let component: TasksDatagridComponent;
  let fixture: ComponentFixture<TasksDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
