import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {usernameValidator} from '../../../../utility/validators/username.validator';
import {passwordsValidator} from '../../../../utility/validators/passwords.validator';
import {b} from '@angular/core/src/render3';
import {ClrLoadingState} from '@clr/angular';

/**
 * Component that shows a registration screen.
 */
@Component({
  selector: 'cbl-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup;
  public registerPressed = false;
  public loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(private auth: AuthService, private fb: FormBuilder) {
  }

  /**
   * Builds the form on component initialization.
   */
  ngOnInit() {
    this.buildForm();
  }

  /**
   * Builds the registration form.
   */
  private buildForm() {
    this.registrationForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3), usernameValidator()]],
      'passwords': this.fb.group({
        'password': ['', [Validators.required, Validators.minLength(8)]],
        'passwordConfirm': ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validator: passwordsValidator()
      })
    });
  }

  /**
   * Registers a user on the server.
   */
  public register() {
    this.registerPressed = true;
    if (this.registrationForm.valid) {
      this.loadingState = ClrLoadingState.LOADING;
      this.auth.register(
        this.registrationForm.get('username').value,
        this.registrationForm.get('passwords.password').value
      ).subscribe(() => {
        this.loadingState = ClrLoadingState.DEFAULT;
      });
    }
  }

  /**
   * Check if the passwords don't match.
   * @return Returns true if the passwords don't match.
   */
  public passwordsDontMatch(): boolean {
    if (this.registrationForm.get('passwords.password').pristine || this.registrationForm.get('passwords.passwordConfirm').pristine) {
      return false;
    }
    return this.registrationForm.get('passwords').errors && this.registrationForm.get('passwords').errors['passwordsMatch'];
  }

}
