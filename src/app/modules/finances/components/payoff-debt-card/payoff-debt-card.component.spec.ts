import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffDebtCardComponent } from './payoff-debt-card.component';

describe('PayoffDebtCardComponent', () => {
  let component: PayoffDebtCardComponent;
  let fixture: ComponentFixture<PayoffDebtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffDebtCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffDebtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
