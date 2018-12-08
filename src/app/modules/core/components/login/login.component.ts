import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClrForm, ClrLoadingState} from '@clr/angular';

/**
 * Component that shows a login screen.
 */
@Component({
  selector: 'cbl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  public loginForm: FormGroup;
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
   * Builds the login form.
   */
  private buildForm() {
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  /**
   * Logs in a user.
   */
  public login() {
    if (this.loginForm.valid) {
      this.loadingState = ClrLoadingState.LOADING;
      this.auth.login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      ).subscribe(() => {
        this.loadingState = ClrLoadingState.DEFAULT;
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

}
