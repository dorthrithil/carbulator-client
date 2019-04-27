import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {StatisticsService} from '../../../../services/crud/statistics.service';
import {CalendarEventService} from '../../../../services/crud/calendar-event.service';
import {CalendarEvent} from '../../../../models/calendar-event';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * Dashboard that enables quick actions in the favourite community.
 */
@Component({
  selector: 'cbl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [StatisticsService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public community: Community;
  public isLoading = true;
  public noFavouriteCommunity = false;
  public latestTour: Tour;
  public latestTourLoading = true;
  public eventsLoading = true;
  public events: CalendarEvent[];

  private onDestroy: Subject<any> = new Subject();

  constructor(private communityService: CommunityService,
              private eventService: CalendarEventService,
              private appEvents: AppEventsService,
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
        this.latestTourLoading = false;
      }, err => {
        if (err === 'NO_TOUR_EXISTING') {
          this.latestTourLoading = false;
        }
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
    this.subscribeToAppEvents();
  }

  /**
   * Fires a destruction event.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Subscribes to app events to update the view on finished tours.
   */
  subscribeToAppEvents() {
    this.appEvents.tourFinished.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.tourService.getLatestCommunityTour(this.community.id).subscribe(tour => {
        this.latestTour = tour;
        this.latestTourLoading = false;
      });
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
