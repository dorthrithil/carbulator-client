import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Tour} from '../../models/tour';
import {TaskInstance} from '../../models/task-instance';
import {Task} from '../../models/task';
import {Refuel} from '../../models/refuel';

/**
 * Service for distributing app wide events.
 */
@Injectable({
  providedIn: 'root'
})
export class AppEventsService {

  private _tourFinished: Subject<Tour> = new Subject();
  public tourFinished: Observable<Tour> = this._tourFinished.asObservable();

  private _refuelEntered: Subject<Refuel> = new Subject();
  public refuelEntered: Observable<Refuel> = this._refuelEntered.asObservable();

  private _tourStarted: Subject<Tour> = new Subject();
  public tourStarted: Observable<Tour> = this._tourStarted.asObservable();

  private _taskInstanceFinished: Subject<TaskInstance> = new Subject();
  public taskInstanceFinished: Observable<TaskInstance> = this._taskInstanceFinished.asObservable();

  private _nonReocurrentTaskAdded: Subject<Task> = new Subject();
  public nonReocurrentTaskAdded: Observable<Task> = this._nonReocurrentTaskAdded.asObservable();

  /**
   * Dispatches a tourFinished event over the tourFinished subject stream.
   * @param tour Finished tour.
   */
  public dispatchTourFinishedEvent(tour: Tour) {
    this._tourFinished.next(tour);
  }

  /**
   * Dispatches a refuelEntered event over the refuelEntered subject stream.
   * @param refuel New Refuel.
   */
  public dispatchRefuelEnteredEvent(refuel: Refuel) {
    this._refuelEntered.next(refuel);
  }

  /**
   * Dispatches a tourStarted event over the tourStarted subject stream.
   * @param tour Finished tour.
   */
  public dispatchTourStartedEvent(tour: Tour) {
    this._tourStarted.next(tour);
  }

  /**
   * Dispatches a taskInstanceFinished event over the taskInstanceFinished subject stream.
   * @param taskInstance Finished task instance.
   */
  public dispatchTaskInstanceFinishedEvent(taskInstance: TaskInstance) {
    this._taskInstanceFinished.next(taskInstance);
  }

  /**
   * Dispatches a nonReocurrentTaskAdded event over the nonReocurrentTaskAdded subject stream.
   * @param task Added task.
   */
  public dispatchNonReocurrentTaskAddedEvent(task: Task) {
    this._nonReocurrentTaskAdded.next(task);
  }

}
