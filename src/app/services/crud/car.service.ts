import {Injectable} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Car} from '../../models/car';

/**
 * CRUD service for creating cars on the server.
 */
@Injectable({
  providedIn: 'root'
})
export class CarService {


  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Persists the given car on the server.
   * @param car Car to persist.
   * @return Observable that resolves to a Car.
   */
  public createCar(car: Car): Observable<Car> {
    return this.http.post(this.api.car.createCar(), Car.toJson(car)).pipe(
      map(carJson => {
        return Car.fromJson(carJson);
      })
    );
  }

}
