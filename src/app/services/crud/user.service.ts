import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Community} from '../../models/community';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {map} from 'rxjs/operators';
import {ApiService} from '../core/api.service';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Searches for users by the given query string.
   * @param query Query string for the search.
   * @return Observable that resolves to an array of users.
   */
  public searchUsers(query: string): Observable<User[]> {
    return this.http.get(this.api.user.searchUsers(query)).pipe(
      map(users => {
        return users.map(user => User.fromJson(user));
      })
    );
  }

}
