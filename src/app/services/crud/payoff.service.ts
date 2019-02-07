import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Payoff} from '../../models/payoff';
import {Debt} from '../../models/debt';

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

  /**
   * Gets a payoffs from the server.
   * @param payoffId The id of the payoff to get.
   * @return Observable that resolves to a payoff.
   */
  public getPayoff(payoffId: number): Observable<Payoff> {
    return this.http.get(this.api.payoffs.getPayoff(payoffId)).pipe(
      map(payoff => Payoff.fromJson(payoff))
    );
  }

  /**
   * Marks a debt as settled on the server.
   * @param debt Debt to settle.
   */
  public settleDebt(debt: Debt): Observable<Debt> {
    return this.http.put(this.api.debts.settleDebt(debt.id), {}).pipe(
      map(debtJson => Debt.fromJson(debtJson))
    );
  }

  /**
   * Marks a debt as unsettled on the server.
   * @param debt Debt to unsettle.
   */
  public unsettleDebt(debt: Debt): Observable<Debt> {
    return this.http.put(this.api.debts.unsettleDebt(debt.id), {}).pipe(
      map(debtJson => Debt.fromJson(debtJson))
    );
  }

}
