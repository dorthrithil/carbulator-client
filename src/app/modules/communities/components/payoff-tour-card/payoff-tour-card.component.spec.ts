import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PayoffTourCardComponent} from './payoff-tour-card.component';

describe('PayoffTourCardComponent', () => {
  let component: PayoffTourCardComponent;
  let fixture: ComponentFixture<PayoffTourCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffTourCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffTourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
