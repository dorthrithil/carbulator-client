import {User} from '../../models/user';

/**
 * Sorting functions for users.
 * @param u1 First user.
 * @param u2 Second user.
 * @return 1 if u1 comes after u2, -1 if u1 comes before u2, 0 if they are ranked equally
 */
export function sortUsers(u1: User, u2: User): number {
  if (u1.username > u2.username) {
    return 1;
  }
  if (u1.username < u2.username) {
    return -1;
  }
  return 0;
}
