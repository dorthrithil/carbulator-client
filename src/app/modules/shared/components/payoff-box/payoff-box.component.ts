import {Component, Input, OnInit} from '@angular/core';
import {Payoff} from '../../../../models/payoff';

/**
 * A component that shows a payoff in a box.
 */
@Component({
  selector: 'cbl-payoff-box',
  templateUrl: './payoff-box.component.html',
  styleUrls: ['./payoff-box.component.scss']
})
export class PayoffBoxComponent {

  /**
   * The payoff to show in the box.
   */
  @Input() payoff: Payoff;

  /**
   * Returns the number of open depts in the payoff.
   */
  public getNumberOfOpenDebts(): number {
    return this.payoff.debts.filter(debt => !debt.isSettled).length;
  }

}
