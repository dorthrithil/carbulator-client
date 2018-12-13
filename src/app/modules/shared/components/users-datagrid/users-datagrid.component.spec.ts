import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersDatagridComponent} from './users-datagrid.component';

describe('UsersDatagridComponent', () => {
  let component: UsersDatagridComponent;
  let fixture: ComponentFixture<UsersDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
