import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffBoxComponent } from './payoff-box.component';

describe('PayoffBoxComponent', () => {
  let component: PayoffBoxComponent;
  let fixture: ComponentFixture<PayoffBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoffBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoffBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
