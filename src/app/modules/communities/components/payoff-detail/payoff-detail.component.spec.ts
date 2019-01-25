import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PayoffDetailComponent} from './payoff-detail.component';

describe('PayoffDetailComponent', () => {
  let component: PayoffDetailComponent;
  let fixture: ComponentFixture<PayoffDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
