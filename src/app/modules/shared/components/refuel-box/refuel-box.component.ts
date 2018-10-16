import {Component, Input, OnInit} from '@angular/core';
import {Refuel} from '../../../../models/refuel';

/**
 * A component that shows a refuel in a box.
 */
@Component({
  selector: 'cbl-refuel-box',
  templateUrl: './refuel-box.component.html',
  styleUrls: ['./refuel-box.component.scss']
})
export class RefuelBoxComponent {

  /**
   * The refuel to show in the box.
   */
  @Input() refuel: Refuel;

}
