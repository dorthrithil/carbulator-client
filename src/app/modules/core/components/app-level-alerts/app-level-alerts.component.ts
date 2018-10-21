import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'cbl-app-level-alerts',
  templateUrl: './app-level-alerts.component.html',
  styleUrls: ['./app-level-alerts.component.scss']
})
export class AppLevelAlertsComponent implements OnInit {

  public showAutoLogoutWarning = false;
  public autoLogoutAlertType = 'warning';
  public showCookieAlert = true;

  constructor(public authService: AuthService,
              private notifications: NotificationsService) {
  }

  /**
   * Sets up watchers for the different alert types.
   */
  ngOnInit() {
    this.showCookieAlert = JSON.parse(localStorage.getItem('showCookieAlert'));
    if (this.showCookieAlert === null) {
      this.showCookieAlert = true;
    }
    this.authService.onRefreshTokenAboutToExpire.subscribe((msToExpiry: number) => {
      this.showAutoLogoutWarning = true;
      timer(msToExpiry).pipe(
        takeUntil(this.authService.onLogout)
      ).subscribe(() => {
        this.autoLogoutAlertType = 'danger';
      });
    });
    this.authService.onLogout.subscribe(() => {
      this.showAutoLogoutWarning = false;
      this.autoLogoutAlertType = 'warning';
    });
  }

  /**
   * Sets the cookie alert variable to false in the local storage.
   */
  public allowCookies() {
    localStorage.setItem('showCookieAlert', JSON.stringify(false));
    this.showCookieAlert = false;
    this.notifications.info('Cookies erlaubt', 'Du hast der Nutzung von Cookies zugestimmt.');
  }

}
