import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClrForm, ClrLoadingState} from '@clr/angular';
import {AuthCrudService} from '../../../../services/crud/auth-crud.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

/**
 * A component that shows a form for requesting a reset password link per mail.
 */
@Component({
  selector: 'cbl-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  public forgotPasswordForm: FormGroup;
  public loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private authCrud: AuthCrudService,
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
   * Builds the reset password form.
   */
  private buildForm() {
    this.forgotPasswordForm = this.fb.group({
      'identification': ['', [Validators.required]]
    });
  }

  /**
   * Requests a reset password mail.
   */
  public requestResetPasswordMail() {
    if (this.forgotPasswordForm.valid) {
      this.loadingState = ClrLoadingState.LOADING;
      this.authCrud.forgotPassword(
        this.forgotPasswordForm.get('identification').value,
      ).subscribe(() => {
        this.notifications.success('Passwort Zurücksetzung beantragt', 'Bitte überprüfe dein Postfach, du solltest in kurzer' +
          ' Zeit eine Mail erhalten.');
        this.loadingState = ClrLoadingState.DEFAULT;
      }, () => {
        this.loadingState = ClrLoadingState.DEFAULT;
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

}
