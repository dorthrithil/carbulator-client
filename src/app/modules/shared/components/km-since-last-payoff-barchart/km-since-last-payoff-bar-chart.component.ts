import {Component, Input, OnInit} from '@angular/core';
import {StatisticsService} from '../../../../services/crud/statistics.service';
import {CommunityStatistic} from '../../../../models/community-statistic';
import {Series} from '../../../../models/series.interface';

/**
 * A component that displays community statistics.
 */
@Component({
  selector: 'cbl-km-since-last-payoff-barchart',
  templateUrl: './km-since-last-payoff-bar-chart.component.html',
  styleUrls: ['./km-since-last-payoff-bar-chart.component.scss']
})
export class KmSinceLastPayoffBarChartComponent implements OnInit {

  /**
   * The ID of the community to load the statistics for.
   */
  @Input() communityId: number;

  public series: Series[];
  public accountForPassengers = true;

  private statistic: CommunityStatistic;

  constructor(private statisticsService: StatisticsService) {
  }

  /**
   * Loads the statistic on component initialization.
   */
  ngOnInit() {
    this.statisticsService.getCommunityStatisticCurrentPayoffIntervall(this.communityId).subscribe(stats => {
      this.statistic = stats;
      this.setSeries();
    });
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
   * Formats an xAxis tick by adding the unit to it.
   * @param tick Tick to format.
   * @return Formatted tick.
   */
  public formatXAxisTick(tick: string) {
    return `${tick} km`;
  }

}
