import {Component, Input, OnInit} from '@angular/core';
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

}
