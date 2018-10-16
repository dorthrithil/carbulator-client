import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {TourService} from '../../../../services/crud/tour.service';
import {Refuel} from '../../../../models/refuel';
import {RefuelService} from '../../../../services/crud/refuel.service';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortTours} from '../../../../utility/sorting/sort-tours';
import {sortRefuels} from '../../../../utility/sorting/sort-refuels';

/**
 * A card that shows the last refuels.
 */
@Component({
  selector: 'cbl-community-refuel-card',
  templateUrl: './community-refuel-card.component.html',
  styleUrls: ['./community-refuel-card.component.scss']
})
export class CommunityRefuelCardComponent implements OnInit {

  /**
   * Id of the community to fetch the refuels for.
   */
  @Input() communityId: number;

  public refuels: Refuel[];

  constructor(private refuelService: RefuelService) {
  }

  /**
   * Loads all refuels for the community on component initialization.
   */
  ngOnInit() {
    this.refuelService.getCommunityRefuels(this.communityId).subscribe(refuels => {
      this.refuels = refuels;
      sortAndLimit(this.refuels, sortRefuels, 5, 'DESC');
    });
  }

  /**
   * Adds a refuel to the list of refuels.
   * @param refuel Refuel to add to the list.
   */
  public addRefuel(refuel: Refuel) {
    this.refuels.unshift(refuel);
    sortAndLimit(this.refuels, sortRefuels, 5, 'DESC');
  }

}
