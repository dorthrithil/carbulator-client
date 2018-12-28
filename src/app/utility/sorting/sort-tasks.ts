import {Task} from '../../models/task';
import * as moment from 'moment';

/**
 * Sorting functions for tasks.
 * @param t1 First task.
 * @param t2 Second task.
 * @return 1 if t1 was created after t2, -1 if t1 was created before t2, 0 if they were created at the same time.
 */
export function sortTasks(t1: Task, t2: Task): number {
  const t1Score = getTaskSortScore(t1);
  const t2Score = getTaskSortScore(t2);
  if (t1Score < t2Score) {
    return 1;
  }
  if (t1Score > t2Score) {
    return -1;
  }
  return 0;
}

/**
 * Returns a number score for a task comparator. The lower the score, the higher the tasks rank should be.
 * The score is based on either remaining kilometers or remaining days until the next task instance.
 * @param task Task to get the score for.
 * @return Sorting score for the task.
 */
function getTaskSortScore(task: Task): number {
  if (task.timeInterval) {
    return task.timeNextInstance.diff(moment(), 'days');
  }
  if (task.kmToNextInstance) {
    return task.kmToNextInstance / 100;
  }
  return Number.MAX_SAFE_INTEGER;
}
