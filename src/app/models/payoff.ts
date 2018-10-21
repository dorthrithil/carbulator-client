import * as moment from 'moment';
import {Car} from './car';
import {User} from './user';
import {Community} from './community';
import {s} from '@angular/core/src/render3';
import {Debt} from './debt';
import {Tour} from './tour';
import {Refuel} from './refuel';

/**
 * Model of a payoff.
 */
export class Payoff {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  debts: Debt[];
  isSettled: boolean;
  tours: Tour[];
  refuels: Refuel[];

  /**
   * Creates a payoff from a JSON representation.
   * @param src JSON representation of the payoff.
   * @return Created payoff.
   */
  public static fromJson(src: any): Payoff {
    const payoff = new Payoff();
    payoff.id = src.id;
    payoff.timeCreated = moment.utc(src.time_created);
    payoff.timeUpdated = moment.utc(src.time_updated);
    payoff.debts = src.debts.map(debt => Debt.fromJson(debt));
    payoff.isSettled = src.is_settled;
    payoff.refuels = src.refuels ? src.refuels.map(refuel => Refuel.fromJson(refuel)) : null;
    payoff.tours = src.tours ? src.tours.map(tour => Tour.fromJson(tour)) : null;
    return payoff;
  }

}
