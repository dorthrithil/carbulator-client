import {Component, OnInit} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {StatisticsService} from '../../../../services/crud/statistics.service';

/**
 * Dashboard that enables quick actions in the favourite community.
 */
@Component({
  selector: 'cbl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StatisticsService]
})
export class DashboardComponent implements OnInit {

  public community: Community;
  public isLoading = true;
  public noFavouriteCommunity = false;
  public latestTour: Tour;

  constructor(private communityService: CommunityService,
              private tourService: TourService) {
  }

  /**
   * Loads the favourite community on component initialization.
   */
  ngOnInit() {
    this.communityService.getFavouriteCommunity().subscribe(community => {
      this.community = community;
      this.isLoading = false;
      this.noFavouriteCommunity = false;
      this.tourService.getLatestCommunityTour(this.community.id).subscribe(tour => {
        this.latestTour = tour;
      });
    }, err => {
      if (err === 'NO_FAVOURITE_COMMUNITY_FOUND') {
        this.noFavouriteCommunity = true;
      }
    });
  }

}
