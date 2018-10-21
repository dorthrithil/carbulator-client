import * as moment from 'moment';
import {Car} from './car';
import {User} from './user';

/**
 * Model of a community.
 */
export class Community {

  id: number;
  name: string;
  car: Car;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  isEditable: boolean;
  isDeletable: boolean;
  users: User[];

  /**
   * Creates a community from a JSON representation.
   * @param src JSON representation of the community.
   * @return Created community.
   */
  public static fromJson(src: any): Community {
    const community = new Community();
    community.id = src.id;
    community.name = src.name;
    community.isEditable = src.is_editable;
    community.isDeletable = src.is_deletable;
    community.timeCreated = moment.utc(src.time_created);
    community.timeUpdated = moment.utc(src.time_updated);
    community.car = src.car ? Car.fromJson(src.car) : null;
    community.users = src.users ? src.users.map(user => User.fromJson(user)) : null;
    return community;
  }

  /**
   * Creates a representation of a community that can be send to the server for persisting.
   * @param src Community to get the representation for.
   * @return Community representation.
   */
  public static toJson(src: Community): any {
    return {
      name: src.name,
      car: src.car.id
    };
  }

}
