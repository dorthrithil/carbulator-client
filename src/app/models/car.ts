import * as moment from 'moment';

/**
 * Model of a community.
 */
export class Car {

  id: number;
  name: string;
  make: string;
  model: string;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;

  /**
   * Creates a car from a JSON representation.
   * @param src JSON representation of the car.
   * @return Created car.
   */
  public static fromJson(src: any): Car {
    const car = new Car();
    car.id = src.id;
    car.name = src.name;
    car.make = src.make;
    car.model = src.model;
    car.timeCreated = moment.utc(src.time_created);
    car.timeUpdated = moment.utc(src.time_updated);
    return car;
  }

  /**
   * Returns a JSON ready representation of the given car.
   * @param  src Car to convert to JSON format.
   * @return Car in JSON stringifiable form.
   */
  public static toJson(src: Car): any {
    return {
      name: src.name,
      make: src.make,
      model: src.model
    };
  }

}
