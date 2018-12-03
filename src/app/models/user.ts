import * as moment from 'moment';

/**
 * Model of a community.
 */
export class User {

  id: number;
  username: string;
  email: string;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;

  /**
   * Creates a user from a JSON representation.
   * @param src JSON representation of the user.
   * @return Created user.
   */
  public static fromJson(src: any): User {
    const user = new User();
    user.id = src.id;
    user.username = src.username;
    user.email = src.email;
    user.timeCreated = moment.utc(src.time_created);
    user.timeUpdated = moment.utc(src.time_updated);
    return user;
  }

}
