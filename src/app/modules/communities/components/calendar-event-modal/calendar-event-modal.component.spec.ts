import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarEventModalComponent} from './calendar-event-modal.component';

describe('CalendarEventModalComponent', () => {
  let component: CalendarEventModalComponent;
  let fixture: ComponentFixture<CalendarEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarEventModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
