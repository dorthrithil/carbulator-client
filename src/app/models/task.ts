import * as moment from 'moment';
import {User} from './user';
import {Community} from './community';

/**
 * Model of a task.
 */
export class Task {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  owner: User;
  community: Community;
  kmInterval: number;
  kmNextInstance: number;
  kmToNextInstance: number;
  timeInterval: number;
  timeNextInstance: moment.Moment;
  name: string;
  description: string;


  /**
   * Creates a task from a JSON representation.
   * @param src JSON representation of the task.
   * @return Created task.
   */
  public static fromJson(src: any): Task {
    const task = new Task();
    task.id = src.id;
    task.timeCreated = moment.utc(src.time_created);
    task.timeUpdated = moment.utc(src.time_updated);
    task.timeNextInstance = moment.utc(src.time_next_instance);
    task.timeInterval = src.time_interval;
    task.owner = User.fromJson(src.owner);
    task.community = Community.fromJson(src.community);
    task.name = src.name;
    task.description = src.description;
    task.kmInterval = src.km_interval;
    task.kmNextInstance = src.km_next_instance;
    task.kmToNextInstance = src.km_to_next_instance;
    return task;
  }


}
