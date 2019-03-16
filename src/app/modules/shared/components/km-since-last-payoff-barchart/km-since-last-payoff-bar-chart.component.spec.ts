import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KmSinceLastPayoffBarChartComponent} from './km-since-last-payoff-bar-chart.component';

describe('KmSinceLastPayoffBarChartComponent', () => {
  let component: KmSinceLastPayoffBarChartComponent;
  let fixture: ComponentFixture<KmSinceLastPayoffBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KmSinceLastPayoffBarChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmSinceLastPayoffBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
