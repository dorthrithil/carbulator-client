import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {sortTours} from '../../../../utility/sorting/sort-tours';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * A card that displays tours of a community.
 */
@Component({
  selector: 'cbl-community-tour-card',
  templateUrl: './community-tour-card.component.html',
  styleUrls: ['./community-tour-card.component.scss']
})
export class CommunityTourCardComponent implements OnInit, OnDestroy {

  /**
   * Id of the community to fetch the tours for.
   */
  @Input() communityId: number;

  public tours: Tour[];

  private onDestroy: Subject<any> = new Subject();

  constructor(private tourService: TourService,
              private appEvents: AppEventsService) {
  }

  /**
   * Loads all tours for the community on component initialization.
   */
  ngOnInit() {
    this.tourService.getCommunityTours(this.communityId).subscribe(tours => {
      this.tours = tours;
      sortAndLimit(this.tours, sortTours, 5, 'DESC');
    });
    this.appEvents.tourFinished.pipe(takeUntil(this.onDestroy)).subscribe(tour => {
      this.addTour(tour);
    });
  }

  /**
   * Emits the on destroy event on component destruction.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Adds a tour to the list of tours.
   * @param tour Tour to add to the list.
   */
  public addTour(tour: Tour) {
    this.tours.push(tour);
    sortAndLimit(this.tours, sortTours, 5, 'DESC');
  }

}
