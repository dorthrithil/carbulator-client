import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';

@Component({
  selector: 'cbl-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  /**
   * Configuration object for the angular2-notifications.
   */
  public notificationOptions = {
    timeOut: 5000,
  };

  constructor(public auth: AuthService) {
  }

  /**
   * Tries an auto login on app initialization.
   */
  ngOnInit() {
    this.auth.tryAutoLogin();
  }

}
