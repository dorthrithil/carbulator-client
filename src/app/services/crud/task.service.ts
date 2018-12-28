import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Task} from '../../models/task';

/**
 * CRUD service for tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all tasks for a community from the server.
   * @param communityId The id of the community to fetch the tasks for.
   * @return Observable that resolves to an array of tasks.
   */
  public getCommunityTasks(communityId: number): Observable<Task[]> {
    return this.http.get(this.api.community.getTasks(communityId)).pipe(
      map(tasks => {
        return tasks.map(task => Task.fromJson(task));
      })
    );
  }

}
