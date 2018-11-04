import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';

/**
 * Component for the apps top navbar.
 */
@Component({
  selector: 'cbl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {

  constructor(private authService: AuthService,
              public navNotifications: NavNotificationsService) {
  }

  /**
   * Logs out the user.
   */
  logout() {
    this.authService.logout();
  }

}
