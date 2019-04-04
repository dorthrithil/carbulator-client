import {Component, Input, OnInit} from '@angular/core';
import {Series} from '../../../../models/series.interface';
import {CommunityStatistic} from '../../../../models/community-statistic';
import {StatisticsService} from '../../../../services/crud/statistics.service';

/**
 * A component that displays community cost statistics.
 */
@Component({
  selector: 'cbl-costs-since-last-payoff-bar-chart',
  templateUrl: './costs-since-last-payoff-bar-chart.component.html',
  styleUrls: ['./costs-since-last-payoff-bar-chart.component.scss']
})
export class CostsSinceLastPayoffBarChartComponent implements OnInit {

  /**
   * The ID of the community to load the statistics for.
   */
  @Input() communityId: number;

  public series: Series[];

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
