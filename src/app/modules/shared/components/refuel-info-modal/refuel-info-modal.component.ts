import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Refuel} from '../../../../models/refuel';
import {RefuelService} from '../../../../services/crud/refuel.service';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * A modal that shows information about a refuel.
 */
@Component({
  selector: 'cbl-refuel-info-modal',
  templateUrl: './refuel-info-modal.component.html',
  styleUrls: ['./refuel-info-modal.component.scss']
})
export class RefuelInfoModalComponent {

  /**
   * The refuel to show in the modal.
   */
  @Input() refuel: Refuel;
  /**
   * True if the modal is open.
   */
  @Input() isOpen = false;
  /**
   * If true, the delete button is shown. If the modal is shown in a payoff view, the button will always be disabled. In this case
   * this option should be set to false.
   */
  @Input() showDeleteOption = true;

  /**
   * EventEmitter that emits the refuel when it was deleted.
   */
  @Output() refuelDeleted: EventEmitter<Refuel> = new EventEmitter();

  public deleteRefuelModalOpen = false;
  public deleteRefuelRequest: Observable<void>;

  constructor(private refuelService: RefuelService,
              private notifications: NotificationsService) {
  }

  /**
   * Closes the modal.
   */
  close() {
    this.isOpen = false;
  }

  /**
   * Opens the modal.
   */
  open() {
    this.isOpen = true;
  }

  /**
   * Opens the confirm delete refuel modal.
   */
  deleteRefuel() {
    this.close();
    this.deleteRefuelModalOpen = true;
    this.deleteRefuelRequest = this.refuelService.deleteRefuel(this.refuel).pipe(map(() => {
      this.notifications.success('Tankfüllung gelöscht', 'Die Tankfüllung wurde erfolgreich gelöscht.');
      this.refuelDeleted.emit(this.refuel);
      this.close();
    }));
  }

  /**
   * Reopens the info modal when the deletion process is canceled.
   */
  onDeleteCancel() {
    this.deleteRefuelModalOpen = false;
    this.open();
  }

}
