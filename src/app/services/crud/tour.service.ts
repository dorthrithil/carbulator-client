import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tour} from '../../models/tour';

/**
 * CRUD service for tours.
 */
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetches all tours for a community from the server.
   * @param communityId The id of the community to fetch the tours for.
   * @return Observable that resolves to an array of tours.
   */
  public getCommunityTours(communityId: number): Observable<Tour[]> {
    return this.http.get(this.api.community.getTours(communityId)).pipe(
      map(tours => {
        return tours.map(tour => Tour.fromJson(tour));
      })
    );
  }

}
