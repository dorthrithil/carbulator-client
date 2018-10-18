import {Injectable} from '@angular/core';
import {Tour} from '../../models/tour';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Payoff} from '../../models/payoff';

/**
 * CRUD service for payoffs.
 */
@Injectable({
  providedIn: 'root'
})
export class PayoffService {

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Creates a payoff on the server.
   * @param communityId The id of the community in which to create the new payoff.
   * @return Observable that resolves to a payoff.
   */
  public createPayoff(communityId: number): Observable<Payoff> {
    return this.http.post(this.api.community.createPayoff(communityId), {}).pipe(
      map(payoffJson => Payoff.fromJson(payoffJson))
    );
  }

  /**
   * Gets all payoffs of a community from the server.
   * @param communityId The id of the community in which get the payoffs.
   * @return Observable that resolves to an array of payoffs.
   */
  public getPayoffs(communityId: number): Observable<Payoff[]> {
    return this.http.get(this.api.community.getPayoffs(communityId)).pipe(
      map(payoffs => payoffs.map(payoff => Payoff.fromJson(payoff)))
    );
  }

}
