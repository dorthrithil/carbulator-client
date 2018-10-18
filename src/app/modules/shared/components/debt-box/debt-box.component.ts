import {Component, Input, OnInit} from '@angular/core';
import {Refuel} from '../../../../models/refuel';
import {Debt} from '../../../../models/debt';

/**
 * A card that displays a debt.
 */
@Component({
  selector: 'cbl-debt-box',
  templateUrl: './debt-box.component.html',
  styleUrls: ['./debt-box.component.scss']
})
export class DebtBoxComponent {

  /**
   * The debt to show in the box.
   */
  @Input() debt: Debt;

}
