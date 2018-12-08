import {Injectable} from '@angular/core';
import {AccountService} from '../crud/account.service';
import {Notification} from '../../models/notification';
import {forkJoin, Subject, Subscription, timer} from 'rxjs';
import {sortNotifications} from '../../utility/sorting/sort-notifications';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

/**
 * Service for loading different notifications.
 */
@Injectable({
  providedIn: 'root'
})
export class NavNotificationsService {

  private _notifications: Notification[] = [];
  private _count = 0;
  public notificationsChange: Subject<Notification[]> = new Subject();
  public notificationsCountChange: Subject<number> = new Subject();
  private timerSubscription: Subscription;

  constructor(private accountService: AccountService,
              private auth: AuthService,
              private router: Router) {
    this.auth.onLoginStateChanges.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.timerSubscription = timer(0, 20000).subscribe(() => {
            // Don't reload if on notifications page to prevent rerendering
          if (this.router.url !== '/account/notifications') {
              this.loadNotifications();
            }
          }
        );
      } else {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
        this._notifications = [];
      }
    });
  }

  /**
   * Returns the current open community invitations.
   */
  get notifications(): Notification[] {
    return this._notifications;
  }

  /**
   * Returns the count of open notifications.
   */
  get count(): number {
    return this._count;
  }

  /**
   * Decrements the notification count.
   */
  public decrementNotificationsCount() {
    this._count -= 1;
    this.notificationsCountChange.next(this._count);
  }

  /**
   * Loads all notifications.
   */
  public loadNotifications() {
    this._notifications = [];
    this._count = 0;
    forkJoin([
      this.accountService.getInvitationNotifications(),
      this.accountService.getRunningTourNotifications()
    ]).subscribe(([invitations, runningTours]) => {
      this._notifications.push(...invitations);
      this._notifications.push(...runningTours);
      this._count += invitations.length;
      this._count += runningTours.length;
      this.notificationsCountChange.next(this._count);
      this.notificationsChange.next(this.notifications);
      this._notifications.sort(sortNotifications);
    });
  }
}
