import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../models/notification';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';

/**
 * A component for showing a notification when a tour is running.
 */
@Component({
  selector: 'cbl-running-tour-notification',
  templateUrl: './running-tour-notification.component.html',
  styleUrls: ['./running-tour-notification.component.scss']
})
export class RunningTourNotificationComponent {

  /**
   * The running tour notification of this component.
   */
  @Input() runningTour: Notification;

  constructor(private navNotifications: NavNotificationsService) {
  }

  /**
   * Marks the notification as closed.
   */
  public onTourFinished() {
    this.runningTour.isOpen = false;
    this.navNotifications.decrementNotificationsCount();
  }

}
