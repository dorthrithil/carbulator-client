import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefuelsDatagridComponent} from './refuels-datagrid.component';

describe('RefuelsDatagridComponent', () => {
  let component: RefuelsDatagridComponent;
  let fixture: ComponentFixture<RefuelsDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefuelsDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuelsDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
