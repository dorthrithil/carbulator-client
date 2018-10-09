import {Injectable} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {Observable} from 'rxjs';
import {Community} from '../../models/community';
import {map} from 'rxjs/operators';
import {Car} from '../../models/car';
import {CommunityInvitation} from '../../modules/communities/components/communities-wizard/communities-wizard.component';
import {MessageResponse} from './auth-crud.service';

/**
 * A CRUD service that performs community related requests.
 */
@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all communities for a user from the server.
   * @return Observable that resolves to an array of communities.
   */
  public getCommunities(): Observable<Community[]> {
    return this.http.get(this.api.community.getCommunities()).pipe(
      map(communities => {
        return communities.map(community => Community.fromJson(community));
      })
    );
  }

  /**
   * Fetches a community from the server.
   * @param id ID of the community.
   * @return Observable that resolves to a community.
   */
  public getCommunity(id: number): Observable<Community> {
    return this.http.get(this.api.community.getCommunity(id)).pipe(
      map(community => Community.fromJson(community))
    );
  }

  /**
   * Persists the given community on the server.
   * @param community Community to persist.
   * @return Observable that resolves to a Community.
   */
  public createCommunity(community: Community): Observable<Community> {
    return this.http.post(this.api.community.createCommunity(), Community.toJson(community)).pipe(
      map(communityJson => {
        return Community.fromJson(communityJson);
      })
    );
  }

  /**
   * Deletes the given community from the database.
   * @param community Community to delete.
   * @return Observable that resolves to a MessageResponse.
   */
  public deleteCommunity(community: Community): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(this.api.community.deleteCommunity(community.id));
  }

  /**
   * Renames the given community.
   * @param community Community to rename.
   * @param newName New name for the community.
   * @return Observable that resolves to a Community.
   */
  public renameCommunity(community: Community, newName: string): Observable<Community> {
    return this.http.put(this.api.community.renameCommunity(community.id), {name: newName}).pipe(
      map(communityJson => {
        return Community.fromJson(communityJson);
      })
    );
  }

  /**
   * Invites a user to a community.
   * @param invitation Community invitation object holding community id and username.
   * @return Observable that resolves to a MessageResponse.
   */
  public inviteUser(invitation: CommunityInvitation): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.api.communityInvitation.inviteUser(), invitation);
  }

}
