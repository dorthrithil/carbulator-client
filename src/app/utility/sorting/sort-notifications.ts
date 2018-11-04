import {Notification} from '../../models/notification';

/**
 * Sorting functions for notifications.
 * @param n1 First notification.
 * @param n2 Second notification.
 * @return 1 if n1 was after n2, -1 if n1 was before n2, 0 if they were at the same time.
 */
export function sortNotifications(n1: Notification, n2: Notification): number {
  if (n1.timeCreated.isAfter(n2.timeCreated)) {
    return 1;
  }
  if (n1.timeCreated.isBefore(n2.timeCreated)) {
    return -1;
  }
  return 0;
}
