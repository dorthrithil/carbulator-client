import {Component, OnInit} from '@angular/core';
import {Notification, NotificationType} from '../../../../models/notification';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';

@Component({
  selector: 'cbl-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  public notificationTypes = NotificationType;
  public notifications: Notification[];

  constructor(private navNotifications: NavNotificationsService) {
  }

  /**
   * Loads the invitations and subscribes to notification changes.
   */
  ngOnInit() {
    this.notifications = this.navNotifications.notifications;
    this.navNotifications.notificationsChange.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  /**
   * Check if there are no open notifications.
   * @return True if there are no open invitations, False otherwise.
   */
  public noOpenNotifications(): boolean {
    return this.notifications.filter(n => n.isOpen).length === 0;
  }

}
