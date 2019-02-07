import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {Observable, Subject} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {TourService} from '../../../../services/crud/tour.service';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';
import {User} from '../../../../models/user';
import {AuthService} from '../../../../services/core/auth.service';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {takeUntil} from 'rxjs/operators';
import {TaskInstanceService} from '../../../../services/crud/task-instance.service';
import {TaskInstance} from '../../../../models/task-instance';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {Community} from '../../../../models/community';

/**
 * Component that shows community alerts.
 */
@Component({
  selector: 'cbl-community-alerts',
  templateUrl: './community-alerts.component.html',
  styleUrls: ['./community-alerts.component.scss']
})
export class CommunityAlertsComponent implements OnInit, OnDestroy {

  /**
   * The community to show the alerts for.
   */
  @Input() community: Community;
  /**
   * If true, the community name is displayed in every alert.
   */
  @Input() showCommunityName = false;

  public runningTour: Tour;
  public cancelTourModalOpen = false;
  public deleteTourRequest: Observable<MessageResponse>;
  public openTaskInstances: TaskInstance[];

  private onDestroy: Subject<any> = new Subject();

  constructor(private tourService: TourService,
              private auth: AuthService,
              private appEvents: AppEventsService,
              private taskInstanceService: TaskInstanceService,
              private notifications: CblNotificationsService,
              private navNotifications: NavNotificationsService) {
  }

  /**
   * Checks for running tours and observes changes in running tours.
   */
  ngOnInit() {
    this.tourService.getRunningCommunityTours(this.community.id).subscribe(runningTours => {
      this.runningTour = runningTours[0];
      if (this.runningTour) {
        this.deleteTourRequest = this.tourService.deleteTour(this.runningTour);
      }
    });
    this.appEvents.tourFinished.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.runningTour = null;
      this.loadTaskInstances();
    });
    this.appEvents.tourStarted.pipe(takeUntil(this.onDestroy)).subscribe(tour => {
      this.addRunningTour(tour);
    });
    this.appEvents.nonReocurrentTaskAdded.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.loadTaskInstances();
    });
    this.loadTaskInstances();
  }

  /**
   * Loads the current open task instances.
   */
  private loadTaskInstances() {
    this.taskInstanceService.getOpenCommunityTaskInstances(this.community.id).subscribe(taskInstances => {
      this.openTaskInstances = taskInstances;
    });
  }

  /**
   * Emits the onDestroy observable on component destruction.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Adds the given tour as a running tour.
   * @param tour Tour to set as running tour.
   */
  public addRunningTour(tour: Tour) {
    if (tour.endKm === null || typeof tour.endKm === 'undefined') {
      this.runningTour = tour;
      this.deleteTourRequest = this.tourService.deleteTour(this.runningTour);
    }
  }

  /**
   * Opens the cancel tour modal.
   */
  public openCancelTourModal() {
    this.cancelTourModalOpen = true;
  }

  /**
   * Removes the current running tour.
   */
  public onRunningTourCanceled() {
    this.runningTour = null;
    this.navNotifications.loadNotifications();
  }

  /**
   * Returns true if the given user is the logged in user.
   * @param user User to check the identity for.
   * @return True if the given user is the logged in user.
   */
  public isLoggedInUser(user: User): boolean {
    return this.auth.isLoggedInUser(user);
  }

  /**
   * Marks a task instance as finished.
   * @param taskInstance Task instance to mark as finished.
   */
  public finishTaskInstance(taskInstance: TaskInstance) {
    this.taskInstanceService.finishTaskInstance(taskInstance).subscribe(() => {
      this.notifications.success('Aufgabe erledigt', `Die Aufgabe "${taskInstance.task.name}" wurde als erledigt markiert.`);
      this.openTaskInstances.splice(this.openTaskInstances.indexOf(taskInstance), 1);
      this.appEvents.dispatchTaskInstanceFinishedEvent(taskInstance);
      this.navNotifications.loadNotifications();
    });
  }

}
