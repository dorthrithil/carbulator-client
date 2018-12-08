import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClrForm, ClrLoadingState} from '@clr/angular';
import {passwordsValidator} from '../../../../utility/validators/passwords.validator';
import {AccountService} from '../../../../services/crud/account.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

/**
 * A component that shows a form for changing the accounts password.
 */
@Component({
  selector: 'cbl-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  public changePasswordForm: FormGroup;
  public loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
  public changePasswordPressed = false;

  constructor(private account: AccountService,
              private notifications: CblNotificationsService,
              private fb: FormBuilder) {
  }

  /**
   * Builds the form on component initialization.
   */
  ngOnInit() {
    this.buildForm();
  }

  /**
   * Builds the password change form.
   */
  private buildForm() {
    this.changePasswordForm = this.fb.group({
      'newPasswords': this.fb.group({
        'password': ['', [Validators.required, Validators.minLength(8)]],
        'passwordConfirm': ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validator: passwordsValidator()
      }),
      'oldPassword': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Changes the password.
   */
  public changePassword() {
    this.changePasswordPressed = true;
    if (this.changePasswordForm.valid) {
      this.loadingState = ClrLoadingState.LOADING;
      this.account.changePassword(
        this.changePasswordForm.get('oldPassword').value,
        this.changePasswordForm.get('newPasswords.password').value
      ).subscribe(() => {
        this.loadingState = ClrLoadingState.DEFAULT;
        this.notifications.success('Passwort geändert', 'Dein Passwort wurde erfolgreich geändert.');
      }, () => {
        this.loadingState = ClrLoadingState.DEFAULT;
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

  /**
   * Check if the passwords don't match.
   * @return Returns true if the passwords don't match.
   */
  public passwordsDontMatch(): boolean {
    if (this.changePasswordForm.get('newPasswords.password').pristine ||
      this.changePasswordForm.get('newPasswords.passwordConfirm').pristine) {
      return false;
    }
    return this.changePasswordForm.get('newPasswords').errors && this.changePasswordForm.get('newPasswords').errors['passwordsMatch'];
  }

}
