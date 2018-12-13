import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PayoffsDatagridComponent} from './payoffs-datagrid.component';

describe('PayoffsDatagridComponent', () => {
  let component: PayoffsDatagridComponent;
  let fixture: ComponentFixture<PayoffsDatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayoffsDatagridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffsDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
