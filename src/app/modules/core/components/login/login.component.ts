import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';

@Component({
  selector: 'cbl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.fakeLogIn();
  }

}
