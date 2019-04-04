import {Component, OnInit} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {StatisticsService} from '../../../../services/crud/statistics.service';
import {CalendarEventService} from '../../../../services/crud/calendar-event.service';
import {CalendarEvent} from '../../../../models/calendar-event';

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
  public eventsLoading = true;
  public events: CalendarEvent[];

  constructor(private communityService: CommunityService,
              private eventService: CalendarEventService,
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
      this.eventService.getNextEvents(this.community.id, 5).subscribe(events => {
        this.eventsLoading = false;
        this.events = events;
      });
    }, err => {
      if (err === 'NO_FAVOURITE_COMMUNITY_FOUND') {
        this.noFavouriteCommunity = true;
      }
    });
  }

  /**
   * Check if the given event is a multiday event.
   * @param event Event to check.
   * @return True if the event is amultiday event.
   */
  public isMultidayEvent(event: CalendarEvent): boolean {
    return event.endMoment && !event.endMoment.isSame(event.startMoment.endOf('day'), 'day');
  }

}
