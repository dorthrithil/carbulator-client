import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskInstance} from '../../models/task-instance';

/**
 * CRUD service for task instances.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskInstanceService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all open task instances for a community from the server.
   * @param communityId The id of the community to fetch the task instances for.
   * @return Observable that resolves to an array of task instances.
   */
  public getOpenCommunityTaskInstances(communityId: number): Observable<TaskInstance[]> {
    return this.http.get(this.api.community.getOpenTaskInstances(communityId)).pipe(
      map(taskInstances => {
        return taskInstances.map(taskInstance => TaskInstance.fromJson(taskInstance));
      })
    );
  }

  /**
   * Marks a task instance as finished on the server.
   * @param taskInstance The task instance to mark as finished.
   * @return Observable that resolves to the finished task instances.
   */
  public finishTaskInstance(taskInstance: TaskInstance): Observable<TaskInstance> {
    return this.http.put(this.api.taskInstance.finish(taskInstance.id), {}).pipe(
      map(finishedTaskInstance => TaskInstance.fromJson(finishedTaskInstance))
    );
  }

}
