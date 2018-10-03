import * as moment from 'moment';

/**
 * Model of a community.
 */
export class Community {

  id: number;
  name: string;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;

  /**
   * Creates a community from a JSON representation.
   * @param src JSON representation of the community.
   * @return Created community.
   */
  public static fromJson(src: any): Community {
    const community = new Community();
    community.id = src.id;
    community.name = src.name;
    community.timeCreated = moment(src.time_created);
    community.timeUpdated = moment(src.time_updated);
    return community;
  }

  /**
   * Creates a representation of a community that can be send to the server for persisting.
   * @param src Community to get the representation for.
   * @return Community representation.
   */
  public static toJson(src: Community): any {
    return {
      name: src.name
    };
  }

}
