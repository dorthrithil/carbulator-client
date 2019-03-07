import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {Community} from '../../models/community';
import {map} from 'rxjs/operators';
import {Notification, NotificationType} from '../../models/notification';
import {MessageResponse} from './auth-crud.service';
import {Tour} from '../../models/tour';
import {TaskInstance} from '../../models/task-instance';
import {AccountSettings} from '../../models/account-settings';

/**
 * Service for performing CRUD actions on account resources.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all open invitations for a user from the server.
   * @return Observable that resolves to an array of notifications.
   */
  public getInvitationNotifications(): Observable<Notification[]> {
    return this.http.get(this.api.account.getOpenCommunityInvitations()).pipe(
      map(communities => {
        return communities.map(community => {
          const notification = new Notification();
          notification.subject = Community.fromJson(community.community);
          notification.timeCreated = notification.subject.timeCreated;
          notification.type = NotificationType.COMMUNITY_INVITATION;
          return notification;
        });
      })
    );
  }

  /**
   * Changes a users password.
   * @param oldPassword The old password.
   * @param newPassword The new password.
   */
  public changePassword(oldPassword: string, newPassword: string): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(this.api.account.changePassword(), {
      'old_password': oldPassword,
      'new_password': newPassword
    });
  }

  /**
   * Fetches all running tours of a user from the server.
   * @return Observable that resolves to an array of notifications.
   */
  public getRunningTourNotifications(): Observable<Notification[]> {
    return this.http.get(this.api.account.getRunningTours()).pipe(
      map(tours => {
        return tours.map(tour => {
          const notification = new Notification();
          notification.subject = Tour.fromJson(tour);
          notification.timeCreated = notification.subject.timeCreated;
          notification.type = NotificationType.RUNNING_TOUR;
          return notification;
        });
      })
    );
  }

  /**
   * Fetches all open task instance for a user from the server.
   * @return Observable that resolves to an array of notifications.
   */
  public getTaskInstanceNotifications(): Observable<Notification[]> {
    return this.http.get(this.api.account.getOpenTaskInstances()).pipe(
      map(taskInstances => {
        return taskInstances.map(taskInstance => {
          const notification = new Notification();
          notification.subject = TaskInstance.fromJson(taskInstance);
          notification.timeCreated = notification.subject.timeCreated;
          notification.type = NotificationType.TASK_INSTANCE;
          return notification;
        });
      })
    );
  }

  /**
   * Fetches the account settings from the server.
   * @return Observable that resolves to AccountSettings.
   */
  public getAccountSettings(): Observable<AccountSettings> {
    return this.http.get(this.api.account.getSettings()).pipe(
      map(accountSettingsJson => AccountSettings.fromJson(accountSettingsJson))
    );
  }

  /**
   * Updates account settings on the server.
   * @param settings Settings to be persisted.
   * @return Observable that resolves to the updated account settings.
   */
  public editAccountSettings(settings: AccountSettings): Observable<AccountSettings> {
    return this.http.put(this.api.account.editSettings(), AccountSettings.toJsonReadyFormat(settings)).pipe(
      map(accountSettingsJson => AccountSettings.fromJson(accountSettingsJson))
    );
  }

}
