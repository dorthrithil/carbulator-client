import {Payoff} from '../../models/payoff';

/**
 * Sorting functions for payoffs.
 * @param p1 First payoff.
 * @param p2 Second payoff.
 * @return 1 if p1 was after p2, -1 if p1 was before p2, 0 if they were at the same time.
 */
export function sortPayoffs(p1: Payoff, p2: Payoff): number {
  if (p1.timeCreated.isAfter(p2.timeCreated)) {
    return 1;
  }
  if (p1.timeCreated.isBefore(p2.timeCreated)) {
    return -1;
  }
  return 0;
}
