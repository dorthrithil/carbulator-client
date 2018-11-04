import {Injectable} from '@angular/core';
import {AccountService} from '../crud/account.service';
import {Community} from '../../models/community';
import {Notification} from '../../models/notification';
import {interval, Observable, Subject, Subscription, timer} from 'rxjs';
import {sortNotifications} from '../../utility/sorting/sort-notifications';
import {AuthService} from './auth.service';

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
  private timerSubscription: Subscription;

  constructor(private accountService: AccountService, private auth: AuthService) {
    this.auth.onLoginStateChanges.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.timerSubscription = timer(0, 20000).subscribe(() => {
            this.loadNotifications();
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
   * Loads all notifications.
   */
  private loadNotifications() {
    this._notifications = [];
    this.accountService.getInvitations().subscribe(invitations => {
      this._notifications.push(...invitations);
      this._count += invitations.length;
      this.notificationsChange.next(this.notifications);
      this._notifications.sort(sortNotifications);
    });
  }

}
