import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CostsSinceLastPayoffBarChartComponent} from './costs-since-last-payoff-bar-chart.component';

describe('CostsSinceLastPayoffBarChartComponent', () => {
  let component: CostsSinceLastPayoffBarChartComponent;
  let fixture: ComponentFixture<CostsSinceLastPayoffBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostsSinceLastPayoffBarChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsSinceLastPayoffBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
