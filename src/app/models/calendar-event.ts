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
  start: moment.Moment;
  end: moment.Moment;
  owner: User;

  /**
   * Creates an event from a JSON representation.
   * @param src JSON representation of the event.
   * @return Created event.
   */
  public static fromJson(src: any): CalendarEvent {
    const event = new CalendarEvent();
    event.id = src.id;
    event.title = src.title;
    event.owner = User.fromJson(src.owner);
    event.timeCreated = moment.utc(src.time_created);
    event.timeUpdated = moment.utc(src.time_updated);
    event.start = moment.utc(src.start);
    event.end = moment.utc(src.end);
    return event;
  }

  /**
   * Returns a JSON ready representation of the given event.
   * @param  src Event to convert to JSON format.
   * @return Event in JSON stringifiable form.
   */
  public static toJson(src: CalendarEvent): any {
    return {
      title: src.title,
      start: src.start,
      end: src.end
    };
  }

}
