import {Component, Input} from '@angular/core';
import {Tour} from '../../../../models/tour';

/**
 * A component that displays a tour in a box.
 */
@Component({
  selector: 'cbl-tour-box',
  templateUrl: './tour-box.component.html',
  styleUrls: ['./tour-box.component.scss']
})
export class TourBoxComponent {

  /**
   * The tour to show in the box.
   */
  @Input() tour: Tour;

}
