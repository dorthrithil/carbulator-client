import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeocodingResult} from '../../models/geocoding-result';

/**
 * CRUD service for geocoding queries.
 */
@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Performs a geooding request on the server and returns the results.
   * @return Observable that resolves to an array of geocoding results.
   */
  public geocode(query: string): Observable<GeocodingResult[]> {
    return this.http.get(this.api.geocoding.geocode(query)).pipe(
      map(geocodingResults => {
        return geocodingResults.map(geocodingResult => GeocodingResult.fromJson(geocodingResult));
      })
    );
  }

}
