import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Refuel} from '../../../../models/refuel';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortRefuels} from '../../../../utility/sorting/sort-refuels';
import {CreateRefuelModalComponent} from '../create-refuel-modal/create-refuel-modal.component';
import {MobileDetectionService} from '../../../../services/core/mobile-detection.service';

/**
 * A component that shows a table of refuels.
 */
@Component({
  selector: 'cbl-refuels-datagrid',
  templateUrl: './refuels-datagrid.component.html',
  styleUrls: ['./refuels-datagrid.component.scss']
})
export class RefuelsDatagridComponent implements OnInit {

  /**
   * Observable that resolves to an array of refuels.
   */
  @Input() refuelResource: Observable<Refuel[]>;

  /**
   * ID of a community. If this field is provided, there will be the possibility to add refuels via the datagrid action bar.
   */
  @Input() communityId: number;

  /**
   * Reference to the create refuel modal.
   */
  @ViewChild('createRefuelModal') createRefuelModal: CreateRefuelModalComponent;

  public refuels: Refuel[];
  public isLoading = true;

  constructor(public mobileDetection: MobileDetectionService) {
  }

  /**
   * Loads all refuels for the community on component initialization.
   */
  ngOnInit() {
    this.refuelResource.subscribe(refuels => {
      this.refuels = refuels;
      this.isLoading = false;
      sortAndLimit(this.refuels, sortRefuels, 0, 'DESC');
    });
  }

  /**
   * Adds a refuel to the list of refuels.
   * @param refuel Refuel to add to the list.
   */
  public addRefuel(refuel: Refuel) {
    this.refuels.push(refuel);
    sortAndLimit(this.refuels, sortRefuels, 0, 'DESC');
  }

}
