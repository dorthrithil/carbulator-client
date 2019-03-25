import {Component, OnInit, ViewChild} from '@angular/core';
import {ClrForm} from '@clr/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../../../services/crud/account.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {debounceTime} from 'rxjs/operators';
import {AccountSettingsService} from '../../../../services/core/account-settings.service';
import {AccountSettings} from '../../../../models/account-settings';

/**
 * Component that shows editable account settings.
 */
@Component({
  selector: 'cbl-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  /**
   * Reference to the clarity form instance.
   */
  @ViewChild(ClrForm) clrForm;

  public accountSettingsForm: FormGroup = new FormGroup({});
  public accountSettings: AccountSettings;

  constructor(private accountSettingsService: AccountSettingsService,
              private notifications: CblNotificationsService,
              private accountService: AccountService,
              private fb: FormBuilder) {
  }


  /**
   * Builds the form on component initialization.
   */
  ngOnInit() {
    this.accountService.getAccountSettings().subscribe(settings => {
      this.accountSettings = settings;
      this.buildForm();
    });
  }

  /**
   * Builds the password change form.
   */
  private buildForm() {
    this.accountSettingsForm = this.fb.group({
      'autoLoadParkingPlaceGPSLocation': [this.accountSettings.autoLoadParkingPlaceGPSLocation],
      'parkingPlaceRequired': [this.accountSettings.parkingPlaceRequired]
    });
    this.accountSettingsForm.valueChanges.pipe(
      debounceTime(750)
    ).subscribe(() => {
      this.saveAccountSettings();
    });
  }

  /**
   * Saves the account settings.
   */
  private saveAccountSettings() {
    this.accountSettingsForm.disable({emitEvent: false});
    this.accountSettings.autoLoadParkingPlaceGPSLocation = this.accountSettingsForm.get('autoLoadParkingPlaceGPSLocation').value;
    this.accountSettings.parkingPlaceRequired = this.accountSettingsForm.get('parkingPlaceRequired').value;
    this.accountService.editAccountSettings(this.accountSettings).subscribe(settings => {
      this.accountSettingsService.updateSettings(settings);
      this.notifications.success('Einstellungen gespeichert', 'Die Account Einstellungen wurden erfolgreich gespeichert.');
      this.accountSettingsForm.enable({emitEvent: false});
    });
  }

}
