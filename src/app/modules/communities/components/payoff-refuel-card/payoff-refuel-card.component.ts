import {Component, Input} from '@angular/core';
import {Payoff} from '../../../../models/payoff';

/**
 * A card that shows refuels of a payoff.
 */
@Component({
  selector: 'cbl-payoff-refuel-card',
  templateUrl: './payoff-refuel-card.component.html',
  styleUrls: ['./payoff-refuel-card.component.scss']
})
export class PayoffRefuelCardComponent {

  @Input() payoff: Payoff;

}
