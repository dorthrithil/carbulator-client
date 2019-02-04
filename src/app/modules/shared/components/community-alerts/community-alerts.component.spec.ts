import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunityAlertsComponent} from './community-alerts.component';

describe('CommunityAlertsComponent', () => {
  let component: CommunityAlertsComponent;
  let fixture: ComponentFixture<CommunityAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityAlertsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
