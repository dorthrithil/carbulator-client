import {Tour} from '../../models/tour';

/**
 * Sorting functions for tours.
 * @param t1 First tour.
 * @param t2 Second tour.
 * @return 1 if t1 was after t2, -1 if t1 was before t2, 0 if they were at the same time.
 */
export function sortTours(t1: Tour, t2: Tour): number {
  if (t1.startTime.isAfter(t2.startTime)) {
    return 1;
  }
  if (t1.startTime.isBefore(t2.startTime)) {
    return -1;
  }
  return 0;
}
