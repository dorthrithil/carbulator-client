import * as moment from 'moment';

/**
 * Types of notifications.
 */
export enum NotificationType {
  COMMUNITY_INVITATION = 'COMMUNITY_INVITATION'
}

/**
 * An app notification.
 */
export class Notification {

  isOpen = true;
  timeCreated: moment.Moment;
  subject: any;
  type: NotificationType;

}
