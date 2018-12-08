import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClrLoadingState} from '@clr/angular';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {passwordsValidator} from '../../../../utility/validators/passwords.validator';
import {AuthService} from '../../../../services/core/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

/**
 * A component for resetting the password.
 */
@Component({
  selector: 'cbl-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: FormGroup;
  public loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
  private resetPasswordHash: string;
  public resetPasswordPressed = false;
  public routeParamSubscription: Subscription;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private notifications: CblNotificationsService,
              private fb: FormBuilder) {
  }

  /**
   * Builds the form on component initialization.
   */
  ngOnInit() {
    this.buildForm();
    this.routeParamSubscription = this.route.params.subscribe(params => {
      this.resetPasswordHash = params['hash'];
    });
  }

  /**
   * Unsubscribes from subscriptions on component destruction.
   */
  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

  /**
   * Builds the reset password form.
   */
  private buildForm() {
    this.resetPasswordForm = this.fb.group({
      'newPasswords': this.fb.group({
        'password': ['', [Validators.required, Validators.minLength(8)]],
        'passwordConfirm': ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validator: passwordsValidator()
      })
    });
  }

  /**
   * Reset the password
   */
  public resetPassword() {
    this.resetPasswordPressed = true;
    if (this.resetPasswordForm.valid) {
      this.loadingState = ClrLoadingState.LOADING;
      this.auth.resetPassword(
        this.resetPasswordForm.get('newPasswords.password').value,
        this.resetPasswordHash
      ).subscribe(() => {
        this.loadingState = ClrLoadingState.DEFAULT;
      }, () => {
        this.loadingState = ClrLoadingState.DEFAULT;
      });
    }
  }

  /**
   * Check if the passwords don't match.
   * @return Returns true if the passwords don't match.
   */
  public passwordsDontMatch(): boolean {
    if (this.resetPasswordForm.get('newPasswords.password').pristine ||
      this.resetPasswordForm.get('newPasswords.passwordConfirm').pristine) {
      return false;
    }
    return this.resetPasswordForm.get('newPasswords').errors && this.resetPasswordForm.get('newPasswords').errors['passwordsMatch'];
  }

}
