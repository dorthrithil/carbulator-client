import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StatisticsService} from '../../../../services/crud/statistics.service';
import {CommunityStatistic} from '../../../../models/community-statistic';
import {Series} from '../../../../models/series.interface';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * A component that displays community km statistics.
 */
@Component({
  selector: 'cbl-km-since-last-payoff-bar-chart',
  templateUrl: './km-since-last-payoff-bar-chart.component.html',
  styleUrls: ['./km-since-last-payoff-bar-chart.component.scss']
})
export class KmSinceLastPayoffBarChartComponent implements OnInit, OnDestroy {

  /**
   * The ID of the community to load the statistics for.
   */
  @Input() communityId: number;

  public series: Series[];
  public accountForPassengers = true;

  private statistic: CommunityStatistic;
  private onDestroy: Subject<any> = new Subject();

  constructor(private statisticsService: StatisticsService,
              private appEvents: AppEventsService) {
  }

  /**
   * Loads the statistic on component initialization.
   */
  ngOnInit() {
    this.loadStatistics();
    this.appEvents.tourFinished.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.loadStatistics(true);
    });
  }

  /**
   * Loads the statistics.
   * @param refreshCache If true, the cache will be cleared before loading statistics.
   */
  private loadStatistics(refreshCache: boolean = false) {
    this.statisticsService.getCommunityStatisticCurrentPayoffIntervall(this.communityId, true).subscribe(stats => {
      this.statistic = stats;
      this.setSeries();
    });
  }

  /**
   * Fires a destruction event.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Sets the current series based on the accountForPassengers flag.
   */
  public setSeries() {
    const value = this.accountForPassengers ? 'kmAccountedForPassengers' : 'km';
    this.series = this.statistic.kmPerUser.map(kmPerUser => {
      return {
        name: kmPerUser.user.username,
        value: Math.round(kmPerUser[value] * 100) / 100
      };
    });
  }

  /**
   * Formats an yAxis tick by adding the unit to it.
   * @param tick Tick to format.
   * @return Formatted tick.
   */
  public formatYAxisTick(tick: string) {
    return `${tick} km`;
  }

}
