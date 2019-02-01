import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormMode} from '../../../../utility/constants/form-constants';
import {CalendarEvent} from '../../../../models/calendar-event';
import {ClrForm} from '@clr/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {CalendarEventService} from '../../../../services/crud/calendar-event.service';
import {momentValidator} from '../../../../utility/validators/moment.validator';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../../services/core/auth.service';
import {endAfterStartValidator} from '../../../../utility/validators/end-after-start.validator';

/**
 * Modal for editing and creating calendar events.
 */
@Component({
  selector: 'cbl-calendar-event-modal',
  templateUrl: './calendar-event-modal.component.html',
  styleUrls: ['./calendar-event-modal.component.scss']
})
export class CalendarEventModalComponent implements OnInit, OnDestroy {

  /**
   * Reference to the clarity form instance.
   */
  @ViewChild(ClrForm) clrForm;

  /**
   * The id of the community in which to create or edit an event.
   */
  @Input() communityId: number;

  /**
   * Emits the created or edited event.
   */
  @Output() calendarEventSaved: EventEmitter<CalendarEvent> = new EventEmitter();
  /**
   * Emits an event when it was deleted.
   */
  @Output() calendarEventDeleted: EventEmitter<CalendarEvent> = new EventEmitter();

  public eventForm: FormGroup;
  public isOpen = false;
  public isLoading = false;
  public mode: FormMode = null;
  public formModes = FormMode;
  public fromTo = false;

  private onDestroy: Subject<any>;
  private endFormControl: FormControl;
  private eventToEdit: CalendarEvent;


  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private notifications: CblNotificationsService,
              private eventService: CalendarEventService) {
  }

  /**
   * Initializes the onDestroy subject.
   */
  ngOnInit(): void {
    this.onDestroy = new Subject();
  }

  /**
   * Fires an onDestroy event.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Builds the event form.
   */
  private buildForm(event: CalendarEvent) {
    this.endFormControl = this.fb.control(event.endMoment.format('DD.MM.YYYY'),
      [momentValidator('DD.MM.YYYY'), endAfterStartValidator('DD.MM.YYYY'), Validators.required
      ]);
    this.eventForm = this.fb.group({
      title: [event.title, [Validators.maxLength(120)]],
      fromTo: [false],
      start: [event.startMoment.format('DD.MM.YYYY'), [momentValidator('DD.MM.YYYY'), Validators.required]]
    });
    this.eventForm.get('fromTo').valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.fromTo = value;
      if (this.fromTo) {
        this.eventForm.addControl('end', this.endFormControl);
      } else {
        this.eventForm.removeControl('end');
      }
    });
    if (event.endMoment && !event.endMoment.isSame(event.startMoment.endOf('day'), 'day')) {
      this.fromTo = true;
      this.eventForm.get('fromTo').setValue(true);
      this.eventForm.addControl('end', this.endFormControl);
    }
  }

  /**
   * Opens the modal.
   * @param mode Form mode to open the modal in.
   * @param calendarEvent CalendarEvent to edit. An existing one in update mode or a new one in create mode.
   */
  public open(mode: FormMode, calendarEvent: CalendarEvent = new CalendarEvent()) {
    this.isOpen = true;
    this.mode = mode;
    this.eventToEdit = calendarEvent;
    this.buildForm(calendarEvent);
  }

  /**
   * Saves the current event. Either the event is created or updated on the server.
   */
  public saveEvent() {
    if (this.eventForm.valid) {
      this.isLoading = true;
      this.eventToEdit.titleModel = this.eventForm.get('title').value;
      this.eventToEdit.title = `${this.auth.loggedInUser.username}: ${this.eventForm.get('title').value}`;
      this.eventToEdit.startMoment = moment(this.eventForm.get('start').value, 'DD.MM.YYYY');
      if (this.fromTo) {
        this.eventToEdit.endMoment = moment(this.eventForm.get('end').value, 'DD.MM.YYYY').endOf('day');
      } else {
        this.eventToEdit.endMoment = moment(this.eventToEdit.startMoment).endOf('day');
      }
      if (this.mode === FormMode.CREATE) {
        this.eventService.createEvent(this.eventToEdit, this.communityId).subscribe(event => {
          this.calendarEventSaved.emit(event);
          this.close();
          this.notifications.success('Termin eingetragen', 'Der Termin wurde eingetragen.');
        }, () => {
          this.close();
        });
      }
      if (this.mode === FormMode.UPDATE) {
        this.eventService.updateEvent(this.eventToEdit).subscribe(event => {
          this.calendarEventSaved.emit(event);
          this.close();
          this.notifications.success('Termin gespeichert', 'Der Termin wurde gespeichert.');
        }, () => {
          this.close();
        });
      }
    } else {
      this.clrForm.markAsDirty();
    }
  }

  /**
   * Deletes the opened event and closes the modal afterwards.
   */
  public deleteEvent() {
    this.eventService.deleteEvent(this.eventToEdit).subscribe(() => {
      this.notifications.success('Termin gelöscht', 'Der Termin wurde gelöscht.');
      this.calendarEventDeleted.emit(this.eventToEdit);
      this.close();
    });
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.isLoading = false;
    this.fromTo = false;
    this.eventToEdit = null;
  }

}
