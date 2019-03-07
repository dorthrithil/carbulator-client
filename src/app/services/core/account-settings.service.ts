import {Injectable} from '@angular/core';
import {AccountSettings} from '../../models/account-settings';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountService} from '../crud/account.service';

/**
 * Service that provides a session instance of the account settings.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  private accountSettings: AccountSettings;

  constructor(private accountService: AccountService) {
  }

  /**
   * Returns an observable of account settings. Either from the cache or from the server.
   * @return Observable of AccountSettings.
   */
  public getSettings(): Observable<AccountSettings> {
    if (!this.accountSettings) {
      return this.accountService.getAccountSettings().pipe(map(settings => {
        this.accountSettings = settings;
        return settings;
      }));
    } else {
      return of(this.accountSettings);
    }
  }

  /**
   * Updates the cached account settings.
   * @param settings New settings.
   */
  public updateSettings(settings: AccountSettings) {
    this.accountSettings = settings;
  }

}
