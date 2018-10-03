import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelAlertsComponent } from './app-level-alerts.component';

describe('AppLevelAlertsComponent', () => {
  let component: AppLevelAlertsComponent;
  let fixture: ComponentFixture<AppLevelAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLevelAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLevelAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
