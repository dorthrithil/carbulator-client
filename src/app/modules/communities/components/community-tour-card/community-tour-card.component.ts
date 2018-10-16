import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {sortTours} from '../../../../utility/sorting/sort-tours';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';

/**
 * A card that displays tours of a community.
 */
@Component({
  selector: 'cbl-community-tour-card',
  templateUrl: './community-tour-card.component.html',
  styleUrls: ['./community-tour-card.component.scss']
})
export class CommunityTourCardComponent implements OnInit {

  /**
   * Id of the community to fetch the tours for.
   */
  @Input() communityId: number;

  /**
   * Emits newly started tours.
   */
  @Output() tourStarted: EventEmitter<Tour> = new EventEmitter();

  public tours: Tour[];

  constructor(private tourService: TourService) {
  }

  /**
   * Loads all tours for the community on component initialization.
   */
  ngOnInit() {
    this.tourService.getCommunityTours(this.communityId).subscribe(tours => {
      this.tours = tours;
      sortAndLimit(this.tours, sortTours, 5, 'DESC');
    });
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
