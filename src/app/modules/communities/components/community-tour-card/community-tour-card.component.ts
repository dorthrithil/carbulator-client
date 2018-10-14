import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';

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
   * Id of the community to fetch the tour for.
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
    });
  }

  /**
   * Adds a tour to the list of tours.
   * @param tour Tour to add to the list.
   */
  public addTour(tour: Tour) {
    this.tours.unshift(tour);
  }

}
