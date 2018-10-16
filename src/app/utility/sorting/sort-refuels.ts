import {Refuel} from '../../models/refuel';

/**
 * Sorting functions for refuels.
 * @param r1 First refuel.
 * @param r2 Second refuel.
 * @return 1 if r1 was created after r2, -1 if r1 was created before r2, 0 if they were at the same time.
 */
export function sortRefuels(r1: Refuel, r2: Refuel): number {
  if (r1.timeCreated.isAfter(r2.timeCreated)) {
    return 1;
  }
  if (r1.timeCreated.isBefore(r2.timeCreated)) {
    return -1;
  }
  return 0;
}
