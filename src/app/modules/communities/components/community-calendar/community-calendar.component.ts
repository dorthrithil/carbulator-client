import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarEvent} from '../../../../models/calendar-event';
import {CalendarEventService} from '../../../../services/crud/calendar-event.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {knownErrors} from '../../../../utility/errors/known-errors';
import {Community} from '../../../../models/community';
import {CommunityService} from '../../../../services/crud/community.service';
import {FullCalendar} from 'primeng/fullcalendar';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarEventModalComponent} from '../calendar-event-modal/calendar-event-modal.component';
import {FormMode} from '../../../../utility/constants/form-constants';
import {NotificationsService} from 'angular2-notifications';

/**
 * Calendar for tour planing among community members.
 */
@Component({
  selector: 'cbl-community-calendar',
  templateUrl: './community-calendar.component.html',
  styleUrls: ['./community-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityCalendarComponent implements OnInit {

  /**
   * Reference to the PrimeNG FullCalendar instance.
   */
  @ViewChild('calendar') calendar: FullCalendar;
  /**
   * Reference to the calendar event modal.
   */
  @ViewChild('calendarEventModal') calendarEventModal: CalendarEventModalComponent;

  public events: CalendarEvent[] = [];
  public options: any;
  public community: Community;
  public communityId: number;
  public loadingCommunity = true;
  public currentMonth = '';
  public currentYear = '';
  public isLoading = true;
  public rangeStart: Moment;
  public rangeEnd: Moment;
  public todayInView = true;

  private calendarInstance: any;

  constructor(private eventService: CalendarEventService,
              private route: ActivatedRoute,
              private notifications: NotificationsService,
              private router: Router,
              private communityService: CommunityService) {
  }

  /**
   * Loads the community for which to show the events.
   */
  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = params['id'];
      if (Number(id)) {
        this.communityId = id;
        this.communityService.getCommunity(id).subscribe(community => {
          this.community = community;
          this.loadingCommunity = false;
        }, err => {
          if (err === knownErrors.UNAUTHORIZED.message) {
            this.router.navigate(['/401']);
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });

    /**
     * FullCalendar options.
     */
    this.options = {
      locale: 'de',
      firstDay: 1,
      header: false,
      buttonText: {
        today: 'Heute',
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        list: 'Liste',
        prev: 'Zurück',
        next: 'Weiter',
      },
      customButtons: {
        new: {
          text: 'Neu',
          click: this.addNewEvent.bind(this)
        }
      },
      displayEventTime: false,
      viewSkeletonRender: this.initEventsAndCallbacks.bind(this),
      eventClick: this.editEvent.bind(this),
      editable: true,
      eventDrop: this.onEventDrop.bind(this),
    };
  }

  /**
   * Initializes the FullCalendar instance reference variable and loads the first set of events.
   */
  private initEventsAndCallbacks() {
    this.calendarInstance = this.calendar.calendar;
    this.loadEvents();
  }

  /**
   * Opens the event modal for event creation.
   */
  public addNewEvent() {
    this.calendarEventModal.open(FormMode.CREATE);
  }

  /**
   * Opens the event modal for updating an event.
   * @param event Event to update.
   */
  private editEvent(event: any) {
    console.log(event);
    this.calendarEventModal.open(FormMode.UPDATE, CalendarEvent.fromFullCalendarEvent(event.event));
  }

  /**
   * Loads a new set of events and appropriately updates the calendar title.
   */
  public loadEvents() {
    this.isLoading = true;
    const activeRange = this.calendarInstance.state.dateProfile.activeRange;
    // Add and subtract one day to prevent errors resulting from incorrect FullCalendar timezone handling
    // (e.g. activeRange.start is 01:00 CET but should be 00:00)
    this.rangeStart = moment(activeRange.start).subtract(1, 'day');
    this.rangeEnd = moment(activeRange.end).add(1, 'day');
    this.eventService.getEvents(this.communityId, this.rangeStart, this.rangeEnd).subscribe(events => {
      this.events = events;
      const rangeDifference = this.rangeEnd.diff(this.rangeStart, 'days');
      const rangeMiddle = this.rangeStart.add(Math.round(rangeDifference / 2), 'days');
      this.currentMonth = rangeMiddle.locale('de').format('MMMM');
      this.currentYear = rangeMiddle.format('YYYY');
      this.todayInView = moment().isBetween(this.rangeStart, this.rangeEnd);
      this.isLoading = false;
    });

  }

  /**
   * Moves the calendar to the next month.
   */
  public next() {
    this.calendarInstance.next();
    this.loadEvents();
  }

  /**
   * Moves the calendar to the previous month.
   */
  public prev() {
    this.calendarInstance.prev();
    this.loadEvents();
  }

  /**
   * Moves the calendar to the current month.
   */
  public today() {
    if (!this.todayInView) {
      this.calendarInstance.today();
      this.loadEvents();
    }
  }

  /**
   * Updates an event if it was dropped to a different date.
   */
  public onEventDrop(event: any) {
    const droppedEvent = CalendarEvent.fromFullCalendarEvent(event.event);
    droppedEvent.startMoment = moment(droppedEvent.start);
    droppedEvent.endMoment = moment(droppedEvent.end);
    this.isLoading = true;
    this.eventService.updateEvent(droppedEvent).subscribe(() => {
      this.notifications.success('Termin verschoben', 'Der Termin wurde verschoben.');
      this.isLoading = false;
    });
  }

}
