import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Tour} from '../../models/tour';
import {map} from 'rxjs/operators';
import {Refuel} from '../../models/refuel';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';

/**
 * CRUD service for refuels.
 */
@Injectable({
  providedIn: 'root'
})
export class RefuelService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) { }

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

}
