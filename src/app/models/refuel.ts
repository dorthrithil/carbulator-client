import * as moment from 'moment';
import {User} from './user';

/**
 * Model of a refuel.
 */
export class Refuel {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  owner: User;
  isOpen: boolean;
  costs: number;
  liters: number;
  gasStationName: string;

  /**
   * Creates a refuel from a JSON representation.
   * @param src JSON representation of the refuel.
   * @return Created refuel.
   */
  public static fromJson(src: any): Refuel {
    const refuel = new Refuel();
    refuel.id = src.id;
    refuel.timeCreated = moment.utc(src.time_created);
    refuel.timeUpdated = moment.utc(src.time_updated);
    refuel.owner = User.fromJson(src.owner);
    refuel.isOpen = src.is_open;
    refuel.costs = src.costs;
    refuel.liters = src.liters;
    refuel.gasStationName = src.gas_station_name;
    return refuel;
  }

  /**
   * Creates a JSON ready representation of the given refuel as it is expected from the server.
   * @param src Refuel to get a representation for.
   * @return Refuel representation.
   */
  public static toJson(src: Refuel): any {
    return {
      costs: src.costs,
      liters: src.liters,
      gas_station_name: src.gasStationName
    };
  }

}
