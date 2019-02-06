import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../models/notification';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {TourService} from '../../../../services/crud/tour.service';

/**
 * A component for showing a notification when a tour is running.
 */
@Component({
  selector: 'cbl-running-tour-notification',
  templateUrl: './running-tour-notification.component.html',
  styleUrls: ['./running-tour-notification.component.scss']
})
export class RunningTourNotificationComponent implements OnInit {

  /**
   * The running tour notification of this component.
   */
  @Input() runningTour: Notification;

  public cancelTourModalOpen = false;
  public deleteTourRequest: Observable<MessageResponse>;

  constructor(private navNotifications: NavNotificationsService,
              private tourService: TourService) {
  }

  /**
   * Sets up the delete tour request.
   */
  ngOnInit(): void {
    this.deleteTourRequest = this.tourService.deleteTour(this.runningTour.subject);
  }

  /**
   * Marks the notification as closed.
   */
  public onTourFinishedOrCanceled() {
    this.runningTour.isOpen = false;
    this.navNotifications.decrementNotificationsCount();
  }

  /**
   * Opens the cancel tour modal.
   */
  public openCancelTourModal() {
    this.cancelTourModalOpen = true;
  }

}
