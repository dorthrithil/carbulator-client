import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunityCalendarComponent} from './community-calendar.component';

describe('CommunityCalendarComponent', () => {
  let component: CommunityCalendarComponent;
  let fixture: ComponentFixture<CommunityCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityCalendarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
