import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Refuel} from '../../../../models/refuel';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortRefuels} from '../../../../utility/sorting/sort-refuels';
import {CreateRefuelModalComponent} from '../create-refuel-modal/create-refuel-modal.component';
import {MobileDetectionService} from '../../../../services/core/mobile-detection.service';
import {RefuelService} from '../../../../services/crud/refuel.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {map} from 'rxjs/operators';

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
  public deleteRefuelModalOpen = false;
  public deleteRefuelRequest: Observable<void>;

  constructor(public mobileDetection: MobileDetectionService,
              public notifications: CblNotificationsService,
              public refuelService: RefuelService) {
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

  /**
   * Deletes the given refuel and removes it from the list.
   * @param refuel Refuel to delete.
   */
  public deleteRefuel(refuel: Refuel) {
    this.deleteRefuelModalOpen = true;
    this.deleteRefuelRequest = this.refuelService.deleteRefuel(refuel).pipe(map(() => {
      this.notifications.success('Tankfüllung gelöscht', 'Die Tankfüllung wurde erfolgreich gelöscht.');
      this.refuels.splice(this.refuels.indexOf(refuel), 1);
    }));
  }

}
