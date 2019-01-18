import {Component, Input} from '@angular/core';
import {Payoff} from '../../../../models/payoff';

/**
 * A card that shows a list of debts.
 */
@Component({
  selector: 'cbl-payoff-debt-card',
  templateUrl: './payoff-debt-card.component.html',
  styleUrls: ['./payoff-debt-card.component.scss']
})
export class PayoffDebtCardComponent {

  @Input() payoff: Payoff;

}
