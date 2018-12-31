import * as moment from 'moment';
import {User} from './user';
import {Task} from './task';

/**
 * Model of a task instance.
 */
export class TaskInstance {

  id: number;
  timeCreated: moment.Moment;
  timeUpdated: moment.Moment;
  finishedBy: User;
  kmCreatedAt: number;
  kmNextInstance: number;
  isOpen: boolean;
  timeFinished: moment.Moment;
  task: Task;

  /**
   * Creates a task instance from a JSON representation.
   * @param src JSON representation of the task instance.
   * @return Created task instance.
   */
  public static fromJson(src: any): TaskInstance {
    const taskInstance = new TaskInstance();
    taskInstance.id = src.id;
    taskInstance.timeCreated = moment.utc(src.time_created);
    taskInstance.timeUpdated = moment.utc(src.time_updated);
    taskInstance.finishedBy = src.finished_by ? User.fromJson(src.finished_by) : null;
    taskInstance.kmCreatedAt = src.km_created_at;
    taskInstance.kmNextInstance = src.km_next_instance;
    taskInstance.isOpen = src.is_open;
    taskInstance.timeFinished = src.time_finished ? moment.utc(src.time_finished) : null;
    taskInstance.task = Task.fromJson(src.task);
    return taskInstance;
  }


}
