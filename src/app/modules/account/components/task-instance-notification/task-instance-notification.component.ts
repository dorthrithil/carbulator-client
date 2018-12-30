import {Component, Input} from '@angular/core';
import {Notification} from '../../../../models/notification';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {TaskInstanceService} from '../../../../services/crud/task-instance.service';

/**
 * A notification container for task instances. Offers a possibility to finish the task instance.
 */
@Component({
  selector: 'cbl-task-instance-notification',
  templateUrl: './task-instance-notification.component.html',
  styleUrls: ['./task-instance-notification.component.scss']
})
export class TaskInstanceNotificationComponent {

  @Input() taskInstanceNotification: Notification;

  public finishLoading = false;

  constructor(private taskInstanceService: TaskInstanceService,
              private navNotifications: NavNotificationsService,
              private notifications: CblNotificationsService) {
  }

  /**
   * Finish the task instance.
   */
  public finish() {
    this.finishLoading = true;
    this.taskInstanceService.finishTaskInstance(this.taskInstanceNotification.subject).subscribe(() => {
      this.finishLoading = false;
      this.notifications.success('Aufgabe erledigt', `Die Aufgabe "${this.taskInstanceNotification.subject.task.name}" wurde` +
        ` als erledigt markiert.`);
      this.taskInstanceNotification.isOpen = false;
      this.navNotifications.decrementNotificationsCount();
    });
  }

}
