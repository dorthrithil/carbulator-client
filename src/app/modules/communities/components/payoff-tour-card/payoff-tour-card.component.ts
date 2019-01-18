import {Component, Input} from '@angular/core';
import {Payoff} from '../../../../models/payoff';

/**
 * A card that shows tours of a payoff.
 */
@Component({
  selector: 'cbl-payoff-tour-card',
  templateUrl: './payoff-tour-card.component.html',
  styleUrls: ['./payoff-tour-card.component.scss']
})
export class PayoffTourCardComponent {

  @Input() payoff: Payoff;

}
