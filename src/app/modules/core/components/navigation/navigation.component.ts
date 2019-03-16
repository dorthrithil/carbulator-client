import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * Component for the apps top navbar.
 */
@Component({
  selector: 'cbl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit, OnDestroy {

  private onDestroy: Subject<any> = new Subject();

  constructor(private authService: AuthService,
              private cdr: ChangeDetectorRef,
              public navNotifications: NavNotificationsService) {
  }

  /**
   * Subscribes to notification count changes to correctly display the bell badge.
   */
  ngOnInit() {
    this.navNotifications.notificationsCountChange.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  /**
   * Fires an onDestroy event on component destruction.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Logs out the user.
   */
  logout() {
    this.authService.logout();
  }

}
