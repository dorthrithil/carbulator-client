import * as moment from 'moment';
import {Car} from './car';
import {User} from './user';
import {Community} from './community';
import {s} from '@angular/core/src/render3';

/**
 * Model of a debt.
 */
export class Debt {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  debtee: User;
  recepient: User;
  isSettled: boolean;
  amount: number;

  /**
   * Creates a debt from a JSON representation.
   * @param src JSON representation of the debt.
   * @return Created debt.
   */
  public static fromJson(src: any): Debt {
    const debt = new Debt();
    debt.id = src.id;
    debt.timeCreated = moment(src.time_created);
    debt.timeUpdated = moment(src.time_updated);
    debt.debtee = User.fromJson(src.debtee);
    debt.recepient = User.fromJson(src.recepient);
    debt.isSettled = src.is_settled;
    debt.amount = src.amount;
    return debt;
  }

}
