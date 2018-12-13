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
   * ID of the community to show the alerts for.
   */
  @Input() communityId: number;

  public runningTour: Tour;
  public cancelTourModalOpen = false;
  public deleteTourRequest: Observable<MessageResponse>;

  private onDestroy: Subject<any> = new Subject();

  constructor(private tourService: TourService,
              private auth: AuthService,
              private appEvents: AppEventsService,
              private navNotifications: NavNotificationsService) {
  }

  /**
   * Checks for running tours and observes changes in running tours.
   */
  ngOnInit() {
    this.tourService.getRunningCommunityTours(this.communityId).subscribe(runningTours => {
      this.runningTour = runningTours[0];
      if (this.runningTour) {
        this.deleteTourRequest = this.tourService.deleteTour(this.runningTour);
      }
    });
    this.appEvents.tourFinished.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.runningTour = null;
    });
    this.appEvents.tourStarted.pipe(takeUntil(this.onDestroy)).subscribe(tour => {
      this.addRunningTour(tour);
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

}
