import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffRefuelCardComponent } from './payoff-refuel-card.component';

describe('PayoffRefuelCardComponent', () => {
  let component: PayoffRefuelCardComponent;
  let fixture: ComponentFixture<PayoffRefuelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffRefuelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffRefuelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
