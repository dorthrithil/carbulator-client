import * as moment from 'moment';
import {Car} from './car';
import {User} from './user';
import {Community} from './community';
import {s} from '@angular/core/src/render3';
import {Debt} from './debt';

/**
 * Model of a payoff.
 */
export class Payoff {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  debts: Debt[];
  isSettled: boolean;

  /**
   * Creates a payoff from a JSON representation.
   * @param src JSON representation of the payoff.
   * @return Created payoff.
   */
  public static fromJson(src: any): Payoff {
    const payoff = new Payoff();
    payoff.id = src.id;
    payoff.timeCreated = moment(src.time_created);
    payoff.timeUpdated = moment(src.time_updated);
    payoff.debts = src.debts.map(debt => Debt.fromJson(debt));
    payoff.isSettled = src.is_settled;
    return payoff;
  }

}
