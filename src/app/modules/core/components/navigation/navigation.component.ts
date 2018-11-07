import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService,
              private cdr: ChangeDetectorRef,
              public navNotifications: NavNotificationsService) {
  }

  /**
   * Subscribes to notification count changes to correctly display the bell badge.
   */
  ngOnInit() {
    this.navNotifications.notificationsCountChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  /**
   * Logs out the user.
   */
  logout() {
    this.authService.logout();
  }

}
