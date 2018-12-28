import {Component, Input} from '@angular/core';
import {Tour} from '../../../../models/tour';

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

}
