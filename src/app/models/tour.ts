import * as moment from 'moment';
import {Car} from './car';
import {User} from './user';
import {Community} from './community';

/**
 * Model of a tour.
 */
export class Tour {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  owner: User;
  community: Community;
  startKm: number;
  endKm: number;
  parkingPosition: string;
  comment: string;
  isForceFinished: boolean;
  forceFinishedBy: User;
  isOpen: boolean;
  totalKm: number;

  /**
   * Creates a tour from a JSON representation.
   * @param src JSON representation of the tour.
   * @return Created tour.
   */
  public static fromJson(src: any): Tour {
    const tour = new Tour();
    tour.id = src.id;
    tour.timeCreated = moment(src.time_created);
    tour.timeUpdated = moment(src.time_updated);
    tour.startTime = moment(src.start_time);
    tour.endTime = moment(src.end_time);
    tour.owner = User.fromJson(src.owner);
    tour.community = Community.fromJson(src.community);
    tour.startKm = src.start_km;
    tour.endKm = src.end_km;
    tour.parkingPosition = src.parking_position;
    tour.comment = src.comment;
    tour.isForceFinished = src.is_force_finished;
    tour.forceFinishedBy = tour.isForceFinished ? User.fromJson(src.force_finished_by) : null;
    tour.isOpen = src.is_open;
    tour.totalKm = tour.endKm !== null ? Number((tour.endKm - tour.startKm).toFixed(2)) : null;
    return tour;
  }

  /**
   * Creates a JSON ready representation of the given tour as it is expected from the server.
   * @param src Tour to get a representation for.
   * @return Tour representation.
   */
  public static toJson(src: Tour): any {
    return {
      start_time: src.startTime,
      start_km: src.startKm
    };
  }

}
