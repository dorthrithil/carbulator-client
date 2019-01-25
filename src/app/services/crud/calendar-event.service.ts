import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CalendarEvent} from '../../models/calendar-event';
import {MessageResponse} from './auth-crud.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Persists the given event on the server.
   * @param event Event to persist.
   * @param communityId Id of the community to create the event for.
   * @return Observable that resolves to a CalendarEvent.
   */
  public createEvent(event: CalendarEvent, communityId: number): Observable<CalendarEvent> {
    return this.http.post(this.api.events.createEvent(communityId), CalendarEvent.toJson(event)).pipe(
      map(eventJson => {
        return CalendarEvent.fromJson(eventJson);
      })
    );
  }

  /**
   * Persists the given event on the server.
   * @param event Event to persist.
   * @return Observable that resolves to a CalendarEvent.
   */
  public updateEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put(this.api.events.updateEvent(event.id), CalendarEvent.toJson(event)).pipe(
      map(eventJson => {
        return CalendarEvent.fromJson(eventJson);
      })
    );
  }

  /**
   * Retrieves the event for the given id from the server.
   * @param eventId Event to retrieve.
   * @return Observable that resolves to a CalendarEvent.
   */
  public getEvent(eventId: number): Observable<CalendarEvent> {
    return this.http.get(this.api.events.getEvent(eventId)).pipe(
      map(eventJson => {
        return CalendarEvent.fromJson(eventJson);
      })
    );
  }

  /**
   * Retrieves events that start in the given interval from the server. The from and to moments are inclusive.
   * @param communityId ID of the community to load events for.
   * @param from Start of time interval to retrieve events for.
   * @param to End of time interval to retrieve events for.
   * @return Observable that resolves to an array of CalendarEvents.
   */
  public getEvents(communityId: number, from: moment.Moment, to: moment.Moment): Observable<CalendarEvent[]> {
    return this.http.get(this.api.events.getEvents(communityId, from.format(), to.format())).pipe(
      map(eventsJson => {
        return eventsJson.map(eventJson => CalendarEvent.fromJson(eventJson));
      })
    );
  }

  /**
   * Deletes the given event from the server.
   * @param event Event to delete.
   * @return Observable that resolves to a MessageResponse.
   */
  public deleteEvent(event: CalendarEvent): Observable<MessageResponse> {
    return this.http.delete(this.api.events.deleteEvent(event.id));
  }

}
