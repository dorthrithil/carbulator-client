import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Community} from '../../models/community';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {map} from 'rxjs/operators';
import {ApiService} from '../core/api.service';
import {User} from '../../models/user';

/**
 * CRUD service for users.
 */
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

  /**
   * Get users that are invited to the given community.
   * @param community Community to retrieve invited users for.
   * @return Observable that resolves to an array of users.
   */
  public getInvitedUsers(community: Community): Observable<User[]> {
    return this.http.get(this.api.user.getInvitedUsers(community.id)).pipe(
      map(users => {
        return users.map(user => User.fromJson(user));
      })
    );
  }

  /**
   * Get users that are part of the given community.
   * @param communityId ID of the community to retrieve members for.
   * @return Observable that resolves to an array of users.
   */
  public getCommunityUsers(communityId: number): Observable<User[]> {
    return this.http.get(this.api.community.getCommunityUsers(communityId)).pipe(
      map(users => {
        return users.map(user => User.fromJson(user));
      })
    );
  }

  /**
   * Searches for users by the given query string. Also excludes users that are already invited in the given community.
   * @param query Query string for the search.
   * @param community From this community all already invited users are excluded.
   * @return Observable that resolves to an array of users.
   */
  public searchUninvitedUsers(query: string, community: Community): Observable<User[]> {
    return this.http.get(this.api.user.searchUninvitedUsers(query, community.id)).pipe(
      map(users => {
        return users.map(user => User.fromJson(user));
      })
    );
  }

}
