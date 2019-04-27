import {Injectable} from '@angular/core';
import {ErrorMappingHttpService} from '../core/error-mapping-http.service';
import {ApiService} from '../core/api.service';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {CommunityStatistic} from '../../models/community-statistic';
import * as moment from 'moment';

/**
 * CRUD service for statistics. Provided in DashboardComponent.
 */
@Injectable()
export class StatisticsService {

  private currentPayoffIntervallCache: Observable<CommunityStatistic>;

  constructor(private http: ErrorMappingHttpService,
              private api: ApiService) {
  }

  /**
   * Fetch the community statistic from the server.
   * @param communityId The id of the community for which to get the statistic.
   * @param from Startdate from which to fetch the statistic.
   * @param to Enddate from which to fetch the statistic.
   * @return Observable that resolves to a community statistic.
   */
  public getCommunityStatistic(communityId: number, from: moment.Moment, to: moment.Moment): Observable<CommunityStatistic> {
    return this.http.get(this.api.community.getStatistic(communityId, from.format(), to.format())).pipe(
      map(statisticJson => CommunityStatistic.fromJson(statisticJson))
    );
  }

  /**
   * Fetch the community statistic for the current payoff interval from the server. If it is not yet cached, it will be cached.
   * @param communityId The id of the community for which to get the statistic.
   * @param refreshCache If true, the cache will be cleared before loading statistics.
   * @return Observable that resolves to a community statistic.
   */
  public getCommunityStatisticCurrentPayoffIntervall(communityId: number, refreshCache: boolean = false): Observable<CommunityStatistic> {
    if (!this.currentPayoffIntervallCache || refreshCache) {
      this.currentPayoffIntervallCache = this.requestCommunityStatisticCurrentPayoffIntervall(communityId).pipe(
        shareReplay(1)
      );
    }
    return this.currentPayoffIntervallCache;
  }

  /**
   * Fetch the community statistic for the current payoff interval from the server.
   * @param communityId The id of the community for which to get the statistic.
   * @return Observable that resolves to a community statistic.
   */
  private requestCommunityStatisticCurrentPayoffIntervall(communityId: number): Observable<CommunityStatistic> {
    return this.http.get(this.api.community.getStatisticCurrentPayoffIntervall(communityId)).pipe(
      map(statisticJson => CommunityStatistic.fromJson(statisticJson))
    );
  }

}
