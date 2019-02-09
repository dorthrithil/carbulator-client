import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Refuel} from '../../models/refuel';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {MessageResponse} from './auth-crud.service';

/**
 * CRUD service for refuels.
 */
@Injectable({
  providedIn: 'root'
})
export class RefuelService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all refuels for a community from the server.
   * @param communityId The id of the community to fetch the refuels for.
   * @return Observable that resolves to an array of refuels.
   */
  public getCommunityRefuels(communityId: number): Observable<Refuel[]> {
    return this.http.get(this.api.community.getRefuels(communityId)).pipe(
      map(refuels => {
        return refuels.map(refuel => Refuel.fromJson(refuel));
      })
    );
  }

  /**
   * Persists a refuel on the server.
   * @param communityId The id of the community in which to add the refuel.
   * @param refuel Refuel to persist.
   * @return Observable that resolves to a refuel.
   */
  public createRefuel(communityId: number, refuel: Refuel): Observable<Refuel> {
    return this.http.post(this.api.community.createRefuel(communityId), Refuel.toJson(refuel)).pipe(
      map(refuelJson => Refuel.fromJson(refuelJson))
    );
  }

  /**
   * Deletes a refuel on the server.
   * @param refuel Refuel to delete.
   * @return Observable that resolves to a MessageResponse.
   */
  public deleteRefuel(refuel: Refuel): Observable<MessageResponse> {
    return this.http.delete(this.api.community.deleteRefuel(refuel.communityId, refuel.id));
  }

}
