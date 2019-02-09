import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {TourService} from '../../../../services/crud/tour.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {AuthService} from '../../../../services/core/auth.service';

/**
 * A modal that displays tour details.
 */
@Component({
  selector: 'cbl-tour-info-modal',
  templateUrl: './tour-info-modal.component.html',
  styleUrls: ['./tour-info-modal.component.scss']
})
export class TourInfoModalComponent {

  /**
   * The tour to show in the modal.
   */
  @Input() tour: Tour;
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
   * EventEmitter that emits the tour if it gets deleted.
   */
  @Output() delete: EventEmitter<Tour> = new EventEmitter();

  constructor(private tourService: TourService,
              public auth: AuthService,
              private notifications: CblNotificationsService) {
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
   * Deletes the tour and closes the modal.
   */
  deleteTour() {
    this.tourService.deleteTour(this.tour).subscribe(() => {
      this.notifications.success('Fahrt gelöscht', 'Die Fahrt wurde erfolgreich gelöscht.');
      this.delete.emit(this.tour);
      this.close();
    });
  }

}
