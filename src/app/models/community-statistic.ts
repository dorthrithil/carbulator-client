import {Community} from './community';
import * as moment from 'moment';
import {User} from './user';

/**
 * Interface for an object containing a user and the km he drove in a timespan.
 */
interface KmPerUser {
  km: number;
  kmAccountedForPassengers: number;
  user: User;
}

/**
 * Model of a statistics collection for a community.
 */
export class CommunityStatistic {

  public community: Community;
  public start: moment.Moment;
  public end: moment.Moment;
  public kmPerUser: KmPerUser[];

  /**
   * Parses a community statistic in JSON format to a CommunityStatistic object.
   * @param src Source Json object.
   * @return Parsed CommunityStatistic object.
   */
  public static fromJson(src: any): CommunityStatistic {
    const statistic = new CommunityStatistic();
    statistic.community = Community.fromJson(src.community);
    statistic.start = moment(src.start);
    statistic.end = moment(src.end);
    statistic.kmPerUser = src.km_per_user.map(kmPerUserJson => {
      return {
        km: kmPerUserJson.km,
        kmAccountedForPassengers: kmPerUserJson.km_accounted_for_passengers,
        user: User.fromJson(kmPerUserJson.user)
      };
    });
    return statistic;
  }

}
