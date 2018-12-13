import {Component} from '@angular/core';
import {Tour} from '../../../../models/tour';

/**
 * A modal that shows the parking position of a tour.
 */
@Component({
  selector: 'cbl-parking-position-modal',
  templateUrl: './parking-position-modal.component.html',
  styleUrls: ['./parking-position-modal.component.scss']
})
export class ParkingPositionModalComponent {

  public isOpen = false;
  public isLoading = false;
  public tour: Tour;

  /**
   * Opens the modal.
   * @param tour The tour to show the parking position for.
   */
  public open(tour: Tour) {
    this.tour = tour;
    this.isOpen = true;

  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.tour = null;
    this.isLoading = false;
  }

}
