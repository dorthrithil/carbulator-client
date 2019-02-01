import * as moment from 'moment';
import {User} from './user';

/**
 * Model of an event.
 */
export class CalendarEvent {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  title: string;
  description: string;
  titleModel: string; // This is what is stored in the DB, the other property is for display in the calendar UI
  startMoment: moment.Moment;
  start: Date;
  endMoment: moment.Moment;
  end: Date;
  owner: User;

  constructor() {
    this.startMoment = moment().startOf('day');
    this.endMoment = moment().endOf('day');
    this.start = this.startMoment.toDate();
    this.end = this.endMoment.toDate();
  }

  /**
   * Creates an event from a JSON representation.
   * @param src JSON representation of the event.
   * @return Created event.
   */
  public static fromJson(src: any): CalendarEvent {
    const event = new CalendarEvent();
    event.id = src.id;
    event.titleModel = src.title;
    event.owner = User.fromJson(src.owner);
    event.timeCreated = moment(src.time_created);
    event.timeUpdated = moment(src.time_updated);
    event.startMoment = moment(src.start);
    event.endMoment = moment(src.end);
    event.start = event.startMoment.toDate();
    event.end = event.endMoment.toDate();
    event.title = `${src.owner.username}: ${src.title}`;
    event.description = src.description;
    return event;
  }

  /**
   * Parses a FullCalendar event object into a CalendarEvent.
   * @param src FullCalendar EventApi event object.
   * @return Parsed CalendarEvent.
   */
  public static fromFullCalendarEvent(src: any): CalendarEvent {
    const event = new CalendarEvent();
    event.id = Number(src.def.publicId);
    event.title = src.def.title;
    event.timeCreated = src.def.extendedProps.timeCreated;
    event.timeUpdated = src.def.extendedProps.timeUpdated;
    event.titleModel = src.def.extendedProps.titleModel;
    event.description = src.def.extendedProps.description;
    event.owner = src.def.extendedProps.owner;
    event.startMoment = moment(src.start);
    event.endMoment = moment(src.end);
    event.start = src.start;
    event.end = src.end;
    return event;
  }

  /**
   * Returns a JSON ready representation of the given event.
   * @param  src Event to convert to JSON format.
   * @return Event in JSON stringifiable form.
   */
  public static toJson(src: CalendarEvent): any {
    return {
      title: src.titleModel,
      description: src.description,
      start: src.startMoment.format(),
      end: src.endMoment.format()
    };
  }

}
