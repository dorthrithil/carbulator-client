import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../config/app-settings';

/**
 * A component for displaying an about page.
 */
@Component({
  selector: 'cbl-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  public version = AppSettings.VERSION;

}
