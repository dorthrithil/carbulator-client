import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';


// TODO minutes to expiry updated sich nicht

@Component({
  selector: 'cbl-app-level-alerts',
  templateUrl: './app-level-alerts.component.html',
  styleUrls: ['./app-level-alerts.component.scss']
})
export class AppLevelAlertsComponent implements OnInit {

  public showAutoLogoutWarning = false;
  public autoLogoutAlertType = 'warning';
  public now = moment();

  constructor(public authService: AuthService) {
  }

  /**
   * Sets up watchers for the different alert types.
   */
  ngOnInit() {
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

}
