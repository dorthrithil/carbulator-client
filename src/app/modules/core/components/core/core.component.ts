import {Component} from '@angular/core';
import {AuthService} from '../../../../services/core/auth.service';

@Component({
  selector: 'cbl-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {

  constructor(public auth: AuthService) {
  }

}
