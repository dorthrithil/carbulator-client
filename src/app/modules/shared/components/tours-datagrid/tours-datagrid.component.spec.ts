import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToursDatagridComponent} from './tours-datagrid.component';

describe('ToursDatagridComponent', () => {
  let component: ToursDatagridComponent;
  let fixture: ComponentFixture<ToursDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToursDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
