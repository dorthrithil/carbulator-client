import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import * as MobileDetect from 'mobile-detect';

/**
 * Wrapper service for the angular2-notifications.
 * Modifications are:
 *   - Prevent success and info notifications on small screens
 */
@Injectable({
  providedIn: 'root'
})
export class CblNotificationsService {

  constructor(private notifications: NotificationsService) {
  }

  /**
   * Pushes a success notification if the screen is big enough.
   * @param title Notification title.
   * @param content Notification content.
   */
  public success(title: any, content: any) {
    if (this.isMobile()) {
      this.notifications.success(title, content);
    }
  }

  /**
   * Pushes an error notification.
   * @param title Notification title.
   * @param content Notification content.
   */
  public error(title: any, content: any) {
    this.notifications.error(title, content);
  }

  /**
   * Pushes an info notification if the screen is big enough.
   * @param title Notification title.
   * @param content Notification content.
   */
  public info(title: any, content: any) {
    if (this.isMobile()) {
      this.notifications.info(title, content);
    }
  }

  /**
   * Checks if the screen height is probably on a mobile device.
   */
  private isMobile(): boolean {
    const md = new MobileDetect(window.navigator.userAgent);
    return md.isPhoneSized();
  }

}
