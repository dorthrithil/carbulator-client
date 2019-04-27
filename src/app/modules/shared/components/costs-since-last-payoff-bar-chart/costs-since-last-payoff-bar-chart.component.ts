import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Series} from '../../../../models/series.interface';
import {CommunityStatistic} from '../../../../models/community-statistic';
import {StatisticsService} from '../../../../services/crud/statistics.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AppEventsService} from '../../../../services/core/app-events.service';

/**
 * A component that displays community cost statistics.
 */
@Component({
  selector: 'cbl-costs-since-last-payoff-bar-chart',
  templateUrl: './costs-since-last-payoff-bar-chart.component.html',
  styleUrls: ['./costs-since-last-payoff-bar-chart.component.scss']
})
export class CostsSinceLastPayoffBarChartComponent implements OnInit, OnDestroy {

  /**
   * The ID of the community to load the statistics for.
   */
  @Input() communityId: number;

  public series: Series[];

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
    this.appEvents.refuelEntered.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.loadStatistics(true);
    });
  }


  /**
   * Fires a destruction event.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Loads the statistics.
   * @param refreshCache If true, the cache will be cleared before loading statistics.
   */
  private loadStatistics(refreshCache: boolean = false) {
    this.statisticsService.getCommunityStatisticCurrentPayoffIntervall(this.communityId, refreshCache).subscribe(stats => {
      this.statistic = stats;
      this.setSeries();
    });
  }

  /**
   * Sets the current series based on the accountForPassengers flag.
   */
  public setSeries() {
    this.series = this.statistic.costsPerUser.map(costPerUser => {
      return {
        name: costPerUser.user.username,
        value: Math.round(costPerUser['costs'] * 100) / 100
      };
    });
  }

  /**
   * Formats an yAxis tick by adding the unit to it.
   * @param tick Tick to format.
   * @return Formatted tick.
   */
  public formatYAxisTick(tick: string) {
    return `${tick} €`;
  }

}
