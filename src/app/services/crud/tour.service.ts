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

  /**
   * Fetches the latest tour for a community from the server.
   * @param communityId The id of the community to fetch the tour for.
   * @return Observable that resolves to a tour.
   */
  public getLatestCommunityTour(communityId: number): Observable<Tour> {
    return this.http.get(this.api.community.getLatestCommunityTour(communityId)).pipe(
      map(tour => Tour.fromJson(tour))
    );
  }

  /**
   * Persists a tour on the server.
   * @param communityId The id of the community in which to start the tour.
   * @param tour Tour to persist.
   * @return Observable that resolves to a tour.
   */
  public createTour(communityId: number, tour: Tour): Observable<Tour> {
    return this.http.post(this.api.community.createTour(communityId), Tour.toJson(tour)).pipe(
      map(tourJson => Tour.fromJson(tourJson))
    );
  }

}
